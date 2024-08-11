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

const useSongDetail = (songNumber: number, songId: number) => {
  const [songInfo, setSongInfo] = useState<SongInfo | null>(null);
  const [songReviews, setSongReviews] = useState<SongInfoReview[] | null>(null);
  const [songRelated, setSongRelated] = useState<RcdRefreshSong[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const {setKeepList} = useKeepListStore();
  const [keepColor, setKeepColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!songInfo) {
      setInitSongDetail();
    }
  }, []);

  const setInitSongDetail = async () => {
    const tempSongInfo = await getSongs(String(songId));
    if (tempSongInfo.data.isKeep) {
      setKeepColor(designatedColor.KEEP_FILLED);
    } else {
      setKeepColor(designatedColor.KEEP_EMPTY);
    }
    setSongInfo(tempSongInfo.data);
    const tempSongsReviews = await getSongsReviews(String(songId));
    setSongReviews(tempSongsReviews.data);
    const tempSongRelated = await getSongsRelated(String(songId), page, size);
    setSongRelated(tempSongRelated.data.songs);
    setPage(tempSongRelated.data.nextPage);
  };

  const handleOnPressKeep = async () => {
    if (keepColor == designatedColor.KEEP_EMPTY) {
      setKeepColor(designatedColor.KEEP_FILLED);
      const tempKeepList = await postKeep([songId]);
      setKeepList(tempKeepList.data);
    } else {
      setKeepColor(designatedColor.KEEP_EMPTY);
      const tempKeepList = await deleteKeep([songId]);
      setKeepList(tempKeepList.data);
    }
  };
  const handleOnAddPressReviewlist = async (songReviewOptionId: number) => {
    console.log(songReviewOptionId);
    await putSongReviews(String(songId), songReviewOptionId);
  };

  const handleOnRemovePressReviewlist = async (songReviewOptionId: number) => {
    console.log(songReviewOptionId);
    await deleteSongsReviews(String(songId));
  };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleRefreshRelatedSongs = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (songRelated && songRelated.length >= 20) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        console.log('refresh!!!!!!!!!!!!!!!!!!!');
        getSongsRelated(String(songId), page, size)
          .then(response => {
            const newSongRelated = response.data.songs;
            setPage(response.data.nextPage);
            setSongRelated(prev => [...(prev || []), ...newSongRelated]); //새로운 노래 리스트로 업데이트
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error refreshing data:', error);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching new related songs:', error);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    page,
    size,
    keepColor,
    songInfo,
    songReviews,
    songRelated,
    handleOnPressKeep,
    handleOnAddPressReviewlist,
    handleOnRemovePressReviewlist,
    handleRefreshRelatedSongs,
  };
};

export default useSongDetail;
