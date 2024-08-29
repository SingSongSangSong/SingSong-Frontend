import {useState} from 'react';
import postRcdRefresh from '../api/recommendation/postRcdRefresh';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import {HomeStackParamList, Song} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {homeStackNavigations} from '../constants';
import Toast from 'react-native-toast-message';
import {logButtonClick, logRefresh} from '../utils';

type UseSongProps = {
  initTag: string;
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.RCD_DETAIL
  >;
};

const useSong = ({initTag, navigation}: UseSongProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [songLst, setSongLst] = useState<Song[]>(); //songlist를 렌더링하기 위함
  const [isLoading, setIsLoading] = useState(false);

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
        console.log('on refresh!!!!!!!!!!!!!!!!!!!');
        const songData = await postRcdRefresh(initTag);
        setSongLst(songData.data);
        // setRefreshSongs(initTag, songData.data);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  //초기 노래 리스트 세팅하는 함수
  const setInitSongs = async () => {
    const initSongs = await postRcdRefresh(initTag);
    setSongLst(initSongs.data);
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
        postRcdRefresh(initTag)
          .then(response => {
            const songData = response.data;
            // const newSongLst = updateRefreshSongs(initTag, songData);
            setSongLst(prev => [...(prev || []), ...songData]);
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
    logButtonClick('recommendation_keep_button_click');
    await postKeep([songId]);
    Toast.show({
      type: 'selectedToast',
      text1: 'Memo에 추가되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const _onKeepRemovePress = async (songId: number) => {
    logButtonClick('recommendation_keep_button_click');
    await deleteKeep([songId]);
    Toast.show({
      type: 'selectedToast',
      text1: 'Memo에서 삭제되었습니다.',
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

export default useSong;
