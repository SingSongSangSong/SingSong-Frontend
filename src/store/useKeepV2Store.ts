import {create} from 'zustand';
import {KeepSongV2} from '../types';

interface KeepV2State {
  isInitialized: boolean;
  keepList: KeepSongV2[]; //나중에 keep에 저장되어 있는지 true/false로 바꾸기
  setKeepList: (songs: KeepSongV2[]) => void;
  addKeepList: (songs: KeepSongV2[]) => void;
  setIsInitialized: (isInitialized: boolean) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  lastCursor: number;
  setLastCursor: (lastCursor: number) => void;
  isEnded: boolean;
  setIsEnded: (isEnded: boolean) => void;
  resetKeepList: () => void; // 초기화 함수 추가
}

const useKeepV2Store = create<KeepV2State>(set => {
  const initState = {
    keepList: [],
    isInitialized: false,
    selectedFilter: 'recent',
    lastCursor: -1,
    isEnded: false,
  };

  return {
    ...initState,

    setKeepList: (songs: KeepSongV2[]) => {
      set(() => ({
        keepList: songs,
      }));
    },

    addKeepList: (songs: KeepSongV2[]) => {
      set(state => ({
        keepList: [...state.keepList, ...songs],
      }));
    },

    setIsInitialized: (isInitialized: boolean) => {
      set(() => ({
        isInitialized,
      }));
    },

    setSelectedFilter: (filter: string) => {
      set(() => ({
        selectedFilter: filter,
      }));
    },

    setLastCursor: (lastCursor: number) => {
      set(() => ({
        lastCursor,
      }));
    },

    setIsEnded: (isEnded: boolean) => {
      set(() => ({
        isEnded,
      }));
    },

    resetKeepList: () => {
      set(() => ({
        keepList: [],
        isInitialized: true,
        selectedFilter: 'recent',
        lastCursor: -1,
        isEnded: false,
      })); // 상태를 initState로 재설정
    },
  };
});

export default useKeepV2Store;
