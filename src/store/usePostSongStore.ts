import {create} from 'zustand';
import {Song} from '../types';

interface PostSongState {
  postSong: Song[];
  setPostSong: (songs: Song[]) => void;
  addPostSong: (song: Song) => void;
  removePostSong: (songId: number) => void;
  removeAllPostSong: () => void;
  getPostSongId: () => number[];
}

const usePostSongStore = create<PostSongState>((set, get) => ({
  postSong: [],

  setPostSong: (songs: Song[]) => {
    set(() => ({
      postSong: songs,
    }));
    // Optionally save to storage here
  },

  addPostSong: (song: Song) => {
    const getPostSong = get().postSong;
    if (!getPostSong.some(s => s.songId === song.songId)) {
      const newPostSong = [...getPostSong, song];
      set({postSong: newPostSong});
    }
  },

  removePostSong: (songId: number) => {
    const getPostSong = get().postSong.filter(song => song.songId !== songId);
    set({postSong: getPostSong});
  },

  removeAllPostSong: () => {
    set({postSong: []});
  },
  getPostSongId: () => get().postSong.map(song => song.songId),
}));

export default usePostSongStore;
