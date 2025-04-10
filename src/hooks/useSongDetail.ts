import {useEffect, useState} from 'react';
import {Song, SongInfo, SongInfoReview, SongParams} from '../types';
import {designatedColor} from '../constants';
import useKeepListStore from '../store/useKeepStore';
import {logButtonClick} from '../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {
  deleteSongsReviews,
  getSongs,
  getSongsRelated,
  getSongsReviews,
  putSongReviews,
} from '../api/song-api';
import {deleteKeep, postKeep} from '../api/keep-api';

const useSongDetail = ({
  songId,
  songNumber,
  songName,
  singerName,
  album,
}: SongParams) => {
  const [defaultSongInfo, setDefaultSongInfo] = useState<SongParams>({
    songId,
    songNumber,
    songName,
    singerName,
    album,
  });
  // const [octave, setOctave] = useState<string>('');
  // const [description, setDescription] = useState<string>('');
  // const [isKeep, setIsKeep] = useState<boolean>();

  const [songInfo, setSongInfo] = useState<SongInfo>();
  const [songReviews, setSongReviews] = useState<SongInfoReview[] | null>(null);
  const [songRelated, setSongRelated] = useState<Song[]>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  // const {setKeepList} = useKeepListStore();
  const setKeepList = useKeepListStore(state => state.setKeepList);
  const [keepColor, setKeepColor] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [isDislikePressed, setIsDislikePressed] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (!songInfo) {
      setInitSongDetail();
    }
  }, []);

  // 특정 songReviewOptionId의 count 증가
  const increaseCount = (optionId: number) => {
    setSongReviews(
      prevState =>
        prevState?.map(review =>
          review.songReviewOptionId === optionId
            ? {...review, count: review.count + 1}
            : review,
        ) || null,
    );
  };

  // 특정 songReviewOptionId의 count 감소
  const decreaseCount = (optionId: number) => {
    setSongReviews(
      prevState =>
        prevState?.map(review =>
          review.songReviewOptionId === optionId && review.count > 0
            ? {...review, count: review.count - 1}
            : review,
        ) || null,
    );
  };

  // selected가 true인 optionId 찾기
  // const getSelectedOptionIds = () => {
  //   return (
  //     songReviews
  //       ?.filter(review => review.selected)
  //       .map(review => review.songReviewOptionId) || []
  //   );
  // };

  const setInitSongDetail = () => {
    getSongs(String(songId)).then(tempSongInfo => {
      if (tempSongInfo.data.isKeep) {
        setKeepColor(designatedColor.KEEP_FILLED);
      } else {
        setKeepColor(designatedColor.KEEP_EMPTY);
      }
      setSongInfo(tempSongInfo.data);
      setIsInit(true);
    });

    getSongsReviews(String(songId)).then(tempSongsReviews => {
      setSongReviews(tempSongsReviews.data);

      const selectedReview =
        tempSongsReviews.data
          ?.filter(review => review.selected)
          .map(review => review.songReviewOptionId) || [];
      if (selectedReview.includes(1)) {
        setIsLikePressed(true);
        // console.log('isLikePressed:', isLikePressed);
      } else if (selectedReview.includes(2)) {
        setIsDislikePressed(true);
        // console.log('isDislikePressed:', isDislikePressed);
      }
      // console.log(selectedReview);s
    });

    getSongsRelated(String(songId), page, size).then(tempSongRelated => {
      setSongRelated(tempSongRelated.data.songs);
      setPage(tempSongRelated.data.nextPage);
    });
  };

  const handleOnPressKeep = async () => {
    if (keepColor == designatedColor.KEEP_EMPTY) {
      amplitude.track('song_keep_button_click');
      logButtonClick('song_keep_button_click');
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
    if (songReviewOptionId == 1) {
      //1을 선택했을 경우
      if (isLikePressed) {
        //선택이 되어있다면
        setIsLikePressed(false);
        await deleteSongsReviews(String(songId));
        decreaseCount(1); //삭제만
        return;
      } else if (!isLikePressed) {
        //1이 선택이 되어있지 않은 상태에서 1을 선택한다면
        if (isDislikePressed) {
          //2가 선택되어있는 경우
          setIsDislikePressed(false);
          setIsLikePressed(true);
          await putSongReviews(String(songId), songReviewOptionId);
          decreaseCount(2);
          increaseCount(1);
          return;
        } else {
          //2가 선택되어있지 않은 경우에서 1을 선택하는 경우
          setIsLikePressed(true);
          await putSongReviews(String(songId), songReviewOptionId);
          increaseCount(1);
          return;
        }
      }
    } else if (songReviewOptionId == 2) {
      if (isDislikePressed) {
        //2가 이미 선택되어있는 경우
        setIsDislikePressed(false);
        await deleteSongsReviews(String(songId));
        decreaseCount(2);
        return;
      } else if (!isDislikePressed) {
        //2가 선택되어있지 않은 경우에서 2를 선택한 경우
        if (isLikePressed) {
          //1이 근데 선택되어있는 경우
          setIsLikePressed(false);
          setIsDislikePressed(true);
          await putSongReviews(String(songId), songReviewOptionId);
          decreaseCount(1);
          increaseCount(2);
          return;
        } else {
          //1이 선택되어있지 않은 경우
          setIsDislikePressed(true);
          await putSongReviews(String(songId), songReviewOptionId);
          increaseCount(2);
          return;
        }
      }
    }
  };

  // const handleOnRemovePressReviewlist = async (songReviewOptionId: number) => {
  //   console.log('handleOnRemovePressReviewQQ');
  //   setIsLikePressed(false);
  //   setIsDislikePressed(true);
  //   await deleteSongsReviews(String(songId));
  // };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleRefreshRelatedSongs = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (songRelated) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        // console.log('refresh!!!!!!!!!!!!!!!!!!!');s
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
    isInit,
    isLoading,
    isLikePressed,
    isDislikePressed,
    page,
    size,
    keepColor,
    songInfo,
    defaultSongInfo,
    songReviews,
    songRelated,
    handleOnPressKeep,
    handleOnAddPressReviewlist,
    // handleOnRemovePressReviewlist,
    handleRefreshRelatedSongs,
  };
};

export default useSongDetail;
