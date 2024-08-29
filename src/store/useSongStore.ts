import {create} from 'zustand';
import {RcdExploreSong, RcdHomeSong, Song} from '../types';

interface SongState {
  selectedTag: string;
  tags: string[];
  previewSongs: {[tag: string]: RcdHomeSong[]};
  refreshSongs: {[tag: string]: Song[]};
  exploreSongs: RcdExploreSong[];
  time: string;
  gender: string;
  setTime: (time: string) => void;
  setGender: (gender: string) => void;
  setSelectedTag: (tag: string) => void;
  setTags: (tags: string[]) => void;
  setPreviewSongs: (tag: string, songs: RcdHomeSong[]) => void;
  setRefreshSongs: (tag: string, songs: Song[]) => void;
  setExploreSongs: (songs: RcdExploreSong[]) => void;

  updateRefreshSongs: (tag: string, songs: Song[]) => Song[];
  loadingVisible: boolean;
}

const useSongStore = create<SongState>((set, get) => {
  const initState = {
    selectedTag: '',
    tags: [],
    previewSongs: {},
    refreshSongs: {},
    exploreSongs: [],
    charts: {},
    time: '',
    gender: '',
    // indexLst: {},
    loadingVisible: true,
  };

  return {
    ...initState,

    setSelectedTag: (tag: string) =>
      set(() => ({
        selectedTag: tag,
      })),

    setTags: (tags: string[]) =>
      set(() => {
        // indexLst 객체를 초기화
        console.log('setTags', tags);
        const newIndexLst: {[tag: string]: number} = {};
        tags.forEach(tag => {
          newIndexLst[tag] = 0;
        });

        return {
          tags: tags,
          indexLst: newIndexLst,
        };
      }),

    setPreviewSongs: (tag: string, songs: RcdHomeSong[]) =>
      set(state => {
        const existingSongs = state.previewSongs[tag] || [];
        const updatedSongs = [...existingSongs, ...songs];
        return {
          loadingVisible: false,
          previewSongs: {
            ...state.previewSongs,
            [tag]: updatedSongs,
          },
        };
      }),

    setRefreshSongs: (tag: string, songs: Song[]) => {
      set(state => ({
        refreshSongs: {
          ...state.refreshSongs,
          [tag]: songs,
        },
      }));
    },

    setExploreSongs: (songs: RcdExploreSong[]) => {
      set(() => ({
        exploreSongs: songs,
      }));
    },

    updateRefreshSongs: (tag: string, newSongs: Song[]) => {
      // 현재 상태의 기존 노래 목록을 가져옴
      const existingSongs = get().refreshSongs[tag] || [];

      // 새로운 노래들을 기존 목록에 추가
      const updatedSongs = [...existingSongs, ...newSongs];

      // 상태 업데이트
      set(state => ({
        refreshSongs: {
          ...state.refreshSongs,
          [tag]: updatedSongs,
        },
      }));
      return updatedSongs;
    },

    setTime: (time: string) => {
      set(() => ({
        time: time,
      }));
    },

    setGender: (gender: string) => {
      set(() => ({
        gender: gender,
      }));
      console.log('gender in song store', gender);
    },
  };
});

export default useSongStore;
