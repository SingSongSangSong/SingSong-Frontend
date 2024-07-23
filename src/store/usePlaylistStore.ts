import {create} from 'zustand';
import {PlaylistInfo, Song} from '../types';

interface PlaylistState {
  playlists: {[playlistName: string]: Song[]};
  setPlaylist: (playlistName: string, songs: Song[]) => void;
  addSongToPlaylist: (playlistName: string, song: Song) => void;
  removeSongFromPlaylist: (playlistName: string, songId: number) => void;
  getPlaylistInfo: () => PlaylistInfo[];
}

const usePlaylistStore = create<PlaylistState>((set, get) => {
  const initState = {
    playlists: {},
  };

  return {
    ...initState,

    setPlaylist: (playlistName: string, songs: Song[]) =>
      set(state => ({
        playlists: {
          ...state.playlists,
          [playlistName]: songs,
        },
      })),

    addSongToPlaylist: (playlistName: string, song: Song) =>
      set(state => {
        const playlist = state.playlists[playlistName] || [];
        // Check if the song already exists in the playlist
        const songExists = playlist.some(s => s.songNumber === song.songNumber);
        if (!songExists) {
          return {
            playlists: {
              ...state.playlists,
              [playlistName]: [...playlist, song],
            },
          };
        }
        return state; // No change if the song already exists
      }),

    removeSongFromPlaylist: (playlistName: string, songId: number) =>
      set(state => {
        const playlist = state.playlists[playlistName];
        if (!playlist) {
          return state;
        }
        return {
          playlists: {
            ...state.playlists,
            [playlistName]: playlist.filter(song => song.songNumber !== songId),
          },
        };
      }),

    getPlaylistInfo: () => {
      const state = get(); // Zustand의 get 함수를 사용하여 현재 상태를 가져옴
      return Object.keys(state.playlists).map(playlistName => ({
        playlistName,
        songCount: state.playlists[playlistName].length,
      }));
    },
  };
});

export default usePlaylistStore;
