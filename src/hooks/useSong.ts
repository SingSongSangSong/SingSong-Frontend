import {useEffect, useState} from 'react';
// import postRcdRefresh from '../api/recommendation/postRcdRefresh';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import {Song} from '../types';
import Toast from 'react-native-toast-message';
import {logButtonClick, logRefresh} from '../utils';
import * as amplitude from '@amplitude/analytics-react-native';
// import useKeepListStore from '../store/useKeepStore';
import postRcdRefreshV2 from '../api/recommendation/postRcdRefreshV2';
import getKeepV2 from '../api/keep/getKeepV2';
import useKeepV2Store from '../store/useKeepV2Store';
import {useQuery} from '@tanstack/react-query';

type UseSongProps = {
  initTag: string;
};

const useSong = ({initTag}: UseSongProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [songLst, setSongLst] = useState<Song[]>(); //songlist를 렌더링하기 위함
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  // const setKeepList = useKeepListStore(state => state.setKeepList);

  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setGlobalLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);

  const {data: tempAiSongs} = useQuery({
    queryKey: [`tag_${initTag}`],
    queryFn: () => postRcdRefreshV2(1, initTag),
    staleTime: 3600000,
    select: data => data.data,
  });

  useEffect(() => {
    if (tempAiSongs) {
      console.log('init!!!!!!!!!!!');
      setSongLst(tempAiSongs.songs);
      setPage(tempAiSongs.nextPage);
    }
  }, [tempAiSongs]);

  // //초기 노래 리스트 세팅하는 함수
  // const setInitSongs = async () => {
  //   const initSongs = await postRcdRefreshV2(1, initTag);
  //   setSongLst(initSongs.data.songs);
  //   setPage(initSongs.data.nextPage);
  // };

  //위로 당겨서 새로고침시 실행되는 함수
  const onRefresh = async () => {
    setRefreshing(true);
    await handleOnRefreshSongs();
    logRefresh('recommendation_up_songs');
    setRefreshing(false);
  };

  //위로 당길 시 노래 리스트 새로고침하는 함수
  const handleOnRefreshSongs = async () => {
    try {
      if (songLst && songLst.length >= 20 && songLst.length < 500) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        // console.log('on refresh!!!!!!!!!!!!!!!!!!!');
        const songData = await postRcdRefreshV2(1, initTag);
        setSongLst(songData.data.songs);
        setPage(songData.data.nextPage);
        // setRefreshSongs(initTag, songData.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleRefreshSongs = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (songLst && songLst.length >= 20 && songLst.length < 500) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        logRefresh('recommendation_down_songs');
        postRcdRefreshV2(page, initTag)
          .then(response => {
            const songData = response.data;
            // const newSongLst = updateRefreshSongs(initTag, songData);
            setSongLst(prev => [...(prev || []), ...songData.songs]);
            setPage(songData.nextPage);
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
      console.error('Error fetching songs:', error);
      setIsLoading(false);
    }
  };

  const _onKeepAddPress = async (songId: number) => {
    amplitude.track('recommendation_keep_button_click');
    logButtonClick('recommendation_keep_button_click');
    // const tempKeepList = await postKeep([songId]);
    // setKeepList(tempKeepList.data);
    postKeep([songId])
      .then(() => getKeepV2(selectedFilter, -1, 20)) // postKeep 후 getKeep 호출
      .then(tempData => {
        setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
        setGlobalLastCursor(tempData.data.lastCursor);
        setIsEnded(false);
      })
      .catch(error => {
        console.error('Error updating keep list:', error);
      });
    Toast.show({
      type: 'selectedToast',
      text1: '보관함에 추가되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const _onKeepRemovePress = async (songId: number) => {
    // await deleteKeep([songId]);
    // const tempKeepList = await deleteKeep([songId]);
    // setKeepList(tempKeepList.data);
    deleteKeep([songId])
      .then(() => getKeepV2(selectedFilter, -1, 20)) // deleteKeep 후 getKeep 호출
      .then(tempData => {
        setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
        setGlobalLastCursor(tempData.data.lastCursor);
        setIsEnded(false);
      })
      .catch(error => {
        console.error('Error updating keep list:', error);
      });

    Toast.show({
      type: 'selectedToast',
      text1: '보관함에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  return {
    isLoading,
    songLst,
    setSongLst,
    handleRefreshSongs,
    // handleOnPressSong,
    refreshing,
    onRefresh,
    // setInitSongs,
    _onKeepAddPress,
    _onKeepRemovePress,
  };
};

export default useSong;
