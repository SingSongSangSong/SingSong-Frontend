import {useEffect, useState} from 'react';
import useSonglistStore from '../store/useSonglistStore';
import {Song} from '../types';

const useSonglist = (playlistId: string) => {
  const {songlist} = useSonglistStore();
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const songData =
      songlist && songlist[playlistId] ? songlist[playlistId] : {};
    const allSongs: Song[] = songData ? Object.values(songData) : [];
    setSongs(allSongs);
  }, [playlistId, songlist]);

  return {songs};
};

export default useSonglist;
