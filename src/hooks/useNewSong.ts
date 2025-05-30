import {useState} from 'react';
import Toast from 'react-native-toast-message';
import {logButtonClick, logRefresh} from '../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import useKeepListStore from '../store/useKeepStore';
import {NewSong} from '../types';

import useKeepV2Store from '../store/useKeepV2Store';
import {getSongsNew} from '../api/song-api';
import {deleteKeep, getKeepV2, postKeep} from '../api/keep-api';

// type UseAiSongProps = {
//   navigation: StackNavigationProp<
//     HomeStackParamList,
//     typeof homeStackNavigations.AI_RECOMMENDATION
//   >;
// };
// {navigation}: UseAiSongProps
const useNewSong = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [newSongsLst, setNewSongsLst] = useState<NewSong[]>(); //songlist를 렌더링하기 위함
  const [isLoading, setIsLoading] = useState(false);
  // const setKeepList = useKeepListStore(state => state.setKeepList);
  //   const [pageId, setPageId] = useState<number>(1);
  const [lastCursor, setLastCursor] = useState<number>(-1);

  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setGlobalLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);

  //위로 당겨서 새로고침시 실행되는 함수
  const onRefresh = async () => {
    setRefreshing(true);
    await handleOnRefreshNewSongs();
    logRefresh('up_new_songs');
    setRefreshing(false);
  };

  //위로 당길 시 노래 리스트 새로고침하는 함수
  const handleOnRefreshNewSongs = async () => {
    try {
      if (newSongsLst && newSongsLst.length >= 20 && newSongsLst.length < 200) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        // console.log('on refresh!!!!!!!!!!!!!!!!!!!');
        // const songData = await postRcdRefresh(initTag);
        const songData = await getSongsNew(-1, 20);
        // console.log('newSongData:', songData.data.songs);
        setNewSongsLst(songData.data.songs);
        setLastCursor(songData.data.lastCursor);
        // setRefreshSongs(initTag, songData.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  //초기 노래 리스트 세팅하는 함수
  const setInitSongs = async () => {
    const initSongs = await getSongsNew(lastCursor, 20);
    setNewSongsLst(initSongs.data.songs);
    setLastCursor(initSongs.data.lastCursor);
  };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleRefreshSongs = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (newSongsLst && newSongsLst.length >= 20 && newSongsLst.length < 200) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        logRefresh('down_new_songs');
        // console.log('pageId:', pageId);
        getSongsNew(lastCursor, 20)
          .then(response => {
            const songData = response.data.songs;
            // console.log('newsongData:', response.data.songs);
            // const newSongLst = updateRefreshSongs(initTag, songData);
            setNewSongsLst(prev => [...(prev || []), ...songData]);
            setLastCursor(response.data.lastCursor);
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
    amplitude.track('new_song_keep_button_click');
    logButtonClick('new_song_keep_button_click');
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
    newSongsLst,
    setNewSongsLst,
    handleRefreshSongs,
    // handleOnPressSong,
    refreshing,
    onRefresh,
    setInitSongs,
    _onKeepAddPress,
    _onKeepRemovePress,
  };
};

export default useNewSong;
