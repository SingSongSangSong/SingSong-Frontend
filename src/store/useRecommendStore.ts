import {create} from 'zustand';
import {Song} from '../types/songs';

interface recommendState {
  selectedSong: Song | null;
  setSelectedSong: (song: Song) => void;
  reset: () => void;
}

const useRecommendStore = create<recommendState>(set => {
  const defaultState = {
    selectedSong: null,
  };

  return {
    ...defaultState,
    setSelectedSong: (song: Song) => {
      set(state => ({...state, selectedSong: song}));
    },
    reset: () => set(defaultState),
  };
});

export default useRecommendStore;
