import {useEffect, useState} from 'react';
import getSongs from '../api/songs/getSongs';
import {RcdRefreshSong, SongInfo, SongInfoReview} from '../types';
import {designatedColor} from '../constants';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import useKeepListStore from '../store/useKeepStore';
import getSongsReviews from '../api/songs/getSongsReviews';
import putSongReviews from '../api/songs/putSongsReviews';
import deleteSongsReviews from '../api/songs/deleteSongsReviews';
import getSongsRelated from '../api/songs/getSongsRelated';

const useSongDetail = (songNumber: number) => {
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null);
  const [songReviews, setSongReviews] = useState<SongInfoReview[] | null>(null);
  const [songRelated, setSongRelated] = useState<RcdRefreshSong[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const {setKeepList} = useKeepListStore();
  const [keepColor, setKeepColor] = useState<string>('');

  useEffect(() => {
    if (!songInfo) {
      setInitSongDetail();
    }
  }, []);

  const setInitSongDetail = async () => {
    const tempSongInfo = await getSongs(String(songNumber));
    const tempSongsReviews = await getSongsReviews(String(songNumber));
    const tempSongRelated = await getSongsRelated(
      String(songNumber),
      page,
      size,
    );
    setSongInfo(tempSongInfo.data);
    setSongReviews(tempSongsReviews.data);
    setSongRelated(tempSongRelated.data.songs);
    setPage(tempSongRelated.data.nextPage);

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
  const handleOnAddPressReviewlist = async (songReviewOptionId: number) => {
    console.log(songReviewOptionId);
    await putSongReviews(String(songNumber), songReviewOptionId);
  };

  const handleOnRemovePressReviewlist = async (songReviewOptionId: number) => {
    console.log(songReviewOptionId);
    await deleteSongsReviews(String(songNumber));
  };

  return {
    page,
    size,
    keepColor,
    songInfo,
    songReviews,
    songRelated,
    handleOnPressKeep,
    handleOnAddPressReviewlist,
    handleOnRemovePressReviewlist,
  };
};

export default useSongDetail;
