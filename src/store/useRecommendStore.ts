import {create} from 'zustand';
import {Song} from '../types/songs';

interface recommendState {
  selectedSong: Song | null;
  setSelectedSong: (song: Song) => void;
  reset: () => void;
  selectedSongTag: string[] | [];
  setSelectedSongTag: (tag: string[]) => void;
  selectedAdditionTag: string[] | [];
  setSelectedAdditionTag: (tag: string[]) => void;
}

const useRecommendStore = create<recommendState>(set => {
  const defaultState = {
    selectedSong: null,
    selectedSongTag: [],
    selectedAdditionTag: [],
  };
  const initState = {
    selectedSong: null,
    selectedSongTag: [],
    selectedAdditionTag: [],
    storedSong: {},
  };

  return {
    ...initState,
    setSelectedSong: (song: Song) => {
      set(state => ({...state, selectedSong: song}));
    },
    setSelectedSongTag: (tag: string[]) => {
      set(state => ({...state, selectedSongTag: tag}));
    },
    setSelectedAdditionTag: (tag: string[]) => {
      set(state => ({...state, selectedAdditionTag: tag}));
    },

    reset: () => set(defaultState),
  };
});

export default useRecommendStore;
