import {create} from 'zustand';
import {Song} from '../types';

interface DataState {
  tags: string[];
  tagWithSongs: {[tag: string]: Song[]};
  recommendSongResults: Song[];
  indexLst: {[tag: string]: number}; //각 태그 리스트에 대한 노래 인덱스
  setTags: (tags: string[]) => void;
  setTagWithSongs: (tag: string, songs: Song[]) => void;
  setRecommendSongResults: (songs: Song[]) => void;
  getSliceSongs: (tag: string) => {songs: Song[]; isRefreshed: boolean}; //인덱스별로 노래 슬라이싱해서 보내기
  updateRefreshData: (tag: string, songs: Song[]) => void;
  setIndexLst: (tag: string, index: number) => void;
  resetIndexLst: (tag: string) => void;
}

const useDataStore = create<DataState>((set, get) => {
  const initState = {
    tags: [],
    tagWithSongs: {},
    indexLst: {},
    recommendSongResults: [],
  };

  return {
    ...initState,

    setTags: (tags: string[]) =>
      set(() => {
        // indexLst 객체를 초기화
        const newIndexLst: {[tag: string]: number} = {};
        tags.forEach(tag => {
          newIndexLst[tag] = 0;
        });

        return {
          tags: tags,
          indexLst: newIndexLst,
        };
      }),

    setTagWithSongs: (tag: string, songs: Song[]) =>
      set(state => {
        const existingSongs = state.tagWithSongs[tag] || [];
        const updatedSongs = [...existingSongs, ...songs];
        return {
          tagWithSongs: {
            ...state.tagWithSongs,
            [tag]: updatedSongs,
          },
        };
      }),

    getSliceSongs: (tag: string) => {
      const state = get();
      const songs = state.tagWithSongs[tag] || [];
      const currentIndex = state.indexLst[tag] || 0;

      // 노래 개수가 10개보다 작으면 있는 노래를 있는 그대로 반환
      if (songs.length <= 10) {
        return {songs: songs, isRefreshed: true};
      }

      // 인덱스가 songlist 길이보다 크면 처음으로 돌아감
      const actualIndex = currentIndex >= songs.length ? 0 : currentIndex;

      // 슬라이스된 곡 목록 반환
      let slicedSongs = songs.slice(actualIndex, actualIndex + 10);

      // 남은 곡이 슬라이스 크기보다 적을 경우 처음부터 추가 곡을 가져옴
      if (slicedSongs.length < 10) {
        const remainingCount = 10 - slicedSongs.length;
        slicedSongs = slicedSongs.concat(songs.slice(0, remainingCount));
      }

      // 새로운 인덱스 설정 (순환하여 인덱스를 계산)
      const newIndex = (actualIndex + 10) % songs.length;
      state.setIndexLst(tag, newIndex);

      // 현재 인덱스와 남은 곡 수를 비교하여 shouldFetchMore 결정
      const isRefreshed = songs.length - newIndex < 20;

      return {
        songs: slicedSongs,
        isRefreshed: isRefreshed,
      };
    },

    setIndexLst: (tag: string, index: number) =>
      set(state => ({
        indexLst: {
          ...state.indexLst,
          [tag]: index,
        },
      })),

    resetIndexLst: (tag: string) =>
      set(state => ({
        indexLst: {
          ...state.indexLst,
          [tag]: 0,
        },
      })),

    setRecommendSongResults: (songs: Song[]) =>
      set(() => ({
        recommendSongResults: songs,
      })),

    updateRefreshData: (tag: string, newSongs: Song[]) => {
      // 현재 상태의 기존 노래 목록을 가져옴
      const existingSongs = get().tagWithSongs[tag] || [];

      // 새로운 노래들을 기존 목록에 추가
      const updatedSongs = [...existingSongs, ...newSongs];

      // 상태 업데이트
      set(state => ({
        tagWithSongs: {
          ...state.tagWithSongs,
          [tag]: updatedSongs,
        },
      }));
    },
  };
});

export default useDataStore;
