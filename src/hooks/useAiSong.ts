import {useState} from 'react';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import {Song} from '../types';
// import {StackNavigationProp} from '@react-navigation/stack';
// import {homeStackNavigations} from '../constants';
import Toast from 'react-native-toast-message';
import {logButtonClick, logRefresh} from '../utils';
import * as amplitude from '@amplitude/analytics-react-native';
// import useKeepListStore from '../store/useKeepStore';
import getRcdRecommendation from '../api/recommendation/getRcdRecommendation';
import getKeepV2 from '../api/keep/getKeepV2';
import useKeepV2Store from '../store/useKeepV2Store';

// type UseAiSongProps = {
//   navigation: StackNavigationProp<
//     HomeStackParamList,
//     typeof homeStackNavigations.AI_RECOMMENDATION
//   >;
// };
// {navigation}: UseAiSongProps
const useAiSong = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [songLst, setSongLst] = useState<Song[]>(); //songlist를 렌더링하기 위함
  const [isLoading, setIsLoading] = useState(false);
  // const setKeepList = useKeepListStore(state => state.setKeepList);
  const [pageId, setPageId] = useState<number>(1);

  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);

  //위로 당겨서 새로고침시 실행되는 함수
  const onRefresh = async () => {
    setRefreshing(true);
    await handleOnAiRefreshSongs();
    logRefresh('ai_recommendation_up_songs');
    setRefreshing(false);
  };

  //위로 당길 시 노래 리스트 새로고침하는 함수
  const handleOnAiRefreshSongs = async () => {
    try {
      if (songLst && songLst.length >= 20 && songLst.length < 500) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        // console.log('on refresh!!!!!!!!!!!!!!!!!!!');
        // const songData = await postRcdRefresh(initTag);
        const songData = await getRcdRecommendation(pageId);
        // console.log('songData:', songData.data.songs);
        setSongLst(songData.data.songs);
        setPageId(pageId + 1);
        // setRefreshSongs(initTag, songData.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  //초기 노래 리스트 세팅하는 함수
  const setInitSongs = async () => {
    const initSongs = await getRcdRecommendation(pageId);
    setSongLst(initSongs.data.songs);
    setPageId(pageId + 1);
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
        logRefresh('ai_recommendation_down_songs');
        // console.log('pageId:', pageId);
        getRcdRecommendation(pageId)
          .then(response => {
            const songData = response.data.songs;
            // console.log('songData:', response.data.songs);
            // const newSongLst = updateRefreshSongs(initTag, songData);
            setSongLst(prev => [...(prev || []), ...songData]);
            setPageId(pageId + 1);
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
    amplitude.track('ai_recommendation_keep_button_click');
    logButtonClick('ai_recommendation_keep_button_click');
    // const tempKeepList = await postKeep([songId]);
    // setKeepList(tempKeepList.data);

    postKeep([songId])
      .then(() => getKeepV2(selectedFilter, -1, 20)) // postKeep 후 getKeep 호출
      .then(tempData => {
        setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
        setLastCursor(tempData.data.lastCursor);
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
        setLastCursor(tempData.data.lastCursor);
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
    setInitSongs,
    _onKeepAddPress,
    _onKeepRemovePress,
  };
};

export default useAiSong;
