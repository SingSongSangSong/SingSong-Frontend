import {create} from 'zustand';

interface playlistState {
  playlist: {[key: string]: {playlistName: string; playlistLen: string}} | {};
  setPlaylist: (
    playlistId: string,
    playlistName: string,
    playlistLen: string,
  ) => void;
}

const usePlaylistStore = create<playlistState>(set => {
  const initState = {
    playlist: {},
  };

  return {
    ...initState,
    setPlaylist: (
      playlistId: string,
      playlistName: string,
      playlistLen: string,
    ) =>
      set(state => {
        const updatedPlaylist = {...state.playlist};
        updatedPlaylist[playlistId] = {playlistName, playlistLen};
        return {...state, playlist: updatedPlaylist};
      }),
  };
});

export default usePlaylistStore;
