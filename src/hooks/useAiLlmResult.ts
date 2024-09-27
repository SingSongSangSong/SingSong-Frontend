import {useEffect, useState} from 'react';
import {HomeStackParamList, Song} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {homeStackNavigations} from '../constants';
import * as amplitude from '@amplitude/analytics-react-native';
import {logButtonClick} from '../utils';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import useKeepListStore from '../store/useKeepStore';
import Toast from 'react-native-toast-message';

type UseAiLlmResultProps = {
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.AI_LLM_RESULT
  >;
  resultSong: Song[];
};

const useAiLlmResult = ({navigation, resultSong}: UseAiLlmResultProps) => {
  const [searchResult, setSearchResult] = useState<Song[]>();
  const setKeepList = useKeepListStore(state => state.setKeepList);

  useEffect(() => {
    setSearchResult(resultSong);
  }, []);

  const handleOnSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
  ) => {
    amplitude.track('llm_song_button_click');
    logButtonClick('llm_song_button_click');
    navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album: album || '',
        melonLink,
        isMr,
      },
    });
  };

  const handleOnKeepAddPress = async (songId: number) => {
    amplitude.track('recommendation_keep_button_click');
    logButtonClick('recommendation_keep_button_click');
    const tempKeepList = await postKeep([songId]);
    setKeepList(tempKeepList.data);
    Toast.show({
      type: 'selectedToast',
      text1: 'KEEP에 추가되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const handleOnKeepRemovePress = async (songId: number) => {
    // await deleteKeep([songId]);
    const tempKeepList = await deleteKeep([songId]);
    setKeepList(tempKeepList.data);
    Toast.show({
      type: 'selectedToast',
      text1: 'KEEP에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  return {
    searchResult,
    handleOnSongPress,
    handleOnKeepAddPress,
    handleOnKeepRemovePress,
  };
};

export default useAiLlmResult;
