import {useEffect, useState} from 'react';
import getSongs from '../api/songs/getSongs';
import {SongInfo} from '../types';
import {designatedColor} from '../constants';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import useKeepListStore from '../store/useKeepStore';

const useSongDetail = (songNumber: number) => {
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null);
  const {setKeepList} = useKeepListStore();
  const [keepColor, setKeepColor] = useState<string>('');

  useEffect(() => {
    if (!songInfo) {
      setInitSongDetail();
    }
  }, []);

  const setInitSongDetail = async () => {
    const tempSongInfo = await getSongs(String(songNumber));
    setSongInfo(tempSongInfo.data);
    if (tempSongInfo.data.isKeep) {
      setKeepColor(designatedColor.KEEP_FILLED);
    } else {
      setKeepColor(designatedColor.KEEP_EMPTY);
    }
  };

  const handleOnPressKeep = async () => {
    if (keepColor == designatedColor.KEEP_EMPTY) {
      setKeepColor(designatedColor.KEEP_FILLED);
      const tempKeepList = await postKeep([songNumber]);
      setKeepList(tempKeepList.data);
    } else {
      setKeepColor(designatedColor.KEEP_EMPTY);
      const tempKeepList = await deleteKeep([songNumber]);
      setKeepList(tempKeepList.data);
    }
  };

  return {
    keepColor,
    songInfo,
    handleOnPressKeep,
  };
};

export default useSongDetail;
