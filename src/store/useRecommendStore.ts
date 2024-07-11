import {create} from 'zustand';
import {Song} from '../types/songs';

interface recommendState {
  selectedSong: Song | null;
  setSelectedSong: (song: Song) => void;
  reset: () => void;
  selectedTag: string[] | [];
  setSelectedTag: (tag: string[]) => void;
  storedSong: {[key: number]: Song} | null;
  setStoredSong: (songId: number, song: Song, isStored: boolean) => void;
}

const useRecommendStore = create<recommendState>(set => {
  const defaultState = {
    selectedSong: null,
    selectedTag: [],
  };
  const initState = {
    selectedSong: null,
    selectedTag: [],
    storedSong: {},
  };

  return {
    ...initState,
    setSelectedSong: (song: Song) => {
      set(state => ({...state, selectedSong: song}));
    },
    setSelectedTag: (tag: string[]) => {
      set(state => ({...state, selectedTag: tag}));
    },
    setStoredSong: (songId: number, song: Song, isStored: boolean) =>
      set(state => {
        const updatedSongs = {...state.storedSong};
        if (isStored) {
          console.log(songId);
          updatedSongs[songId] = song;
        } else {
          delete updatedSongs[songId];
        }
        return {...state, storedSong: updatedSongs};
      }),

    reset: () => set(defaultState),
  };
});

export default useRecommendStore;
