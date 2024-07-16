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
  storedSong: {[key: number]: Song} | null;
  setStoredSong: (songId: number, song: Song, isStored: boolean) => void;
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
