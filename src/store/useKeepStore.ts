import {create} from 'zustand';
import {Song} from '../types';
// import AsyncStorage from '@react-native-async-storage/async-storage';

interface KeepListState {
  keepList: Song[]; //나중에 keep에 저장되어 있는지 true/false로 바꾸기
  setKeepList: (songs: Song[]) => void;
  // addSongToKeep: (song: Song) => void;
  // removeSongFromKeep: (songId: number) => void;
}

const useKeepListStore = create<KeepListState>(set => {
  const initState = {
    keepList: [],
  };

  return {
    ...initState,

    setKeepList: (songs: Song[]) => {
      set(() => ({
        keepList: songs,
      }));
      // saveToStorage(songs);
    },

    // addSongToKeep: (song: Song) => {
    //   const keepList = get().keepList;
    //   if (!keepList.some(s => s.songNumber === song.songNumber)) {
    //     const newKeepList = [...keepList, song];
    //     set({keepList: newKeepList});
    //     saveToStorage(newKeepList);
    //   }
    // },

    // removeSongFromKeep: (songId: number) => {
    //   const keepList = get().keepList.filter(
    //     song => song.songNumber !== songId,
    //   );
    //   set({keepList});
    //   saveToStorage(keepList);
    // },
  };
});

// const STORAGE_KEY = 'keepListStorage';

// const saveToStorage = async (keepList: Song[]) => {
//   try {
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(keepList));
//   } catch (error) {
//     console.error('Failed to save to storage', error);
//   }
// };

// const loadFromStorage = async () => {
//   try {
//     const savedKeepList = await AsyncStorage.getItem(STORAGE_KEY);
//     if (savedKeepList) {
//       useKeepListStore.getState().setKeepList(JSON.parse(savedKeepList));
//     }
//   } catch (error) {
//     console.error('Failed to load from storage', error);
//   }
// };

// Load the state from storage when the app starts
// loadFromStorage();

export default useKeepListStore;
