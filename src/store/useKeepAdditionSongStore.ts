import {create} from 'zustand';
import {Song} from '../types';

interface KeepAdditionSongState {
  keepAdditionSong: Song[];
  setKeepAdditionSong: (songs: Song[]) => void;
  addKeepAdditionSong: (song: Song) => void;
  removeKeepAdditionSong: (songId: number) => void;
  removeAllKeepAdditionSong: () => void;
  getKeepAdditionSongIds: () => number[];
}

const useKeepAdditionSongStore = create<KeepAdditionSongState>((set, get) => ({
  keepAdditionSong: [],

  setKeepAdditionSong: (songs: Song[]) => {
    set(() => ({
      keepAdditionSong: songs,
    }));
    // Optionally save to storage here
  },

  addKeepAdditionSong: (song: Song) => {
    const currentSongs = get().keepAdditionSong;
    if (!currentSongs.some(s => s.songId === song.songId)) {
      set({keepAdditionSong: [...currentSongs, song]});
    }
  },

  removeKeepAdditionSong: (songId: number) => {
    const updatedSongs = get().keepAdditionSong.filter(
      song => song.songId !== songId,
    );
    set({keepAdditionSong: updatedSongs});
  },

  removeAllKeepAdditionSong: () => {
    set({keepAdditionSong: []});
  },

  getKeepAdditionSongIds: () => get().keepAdditionSong.map(song => song.songId),
}));

export default useKeepAdditionSongStore;
