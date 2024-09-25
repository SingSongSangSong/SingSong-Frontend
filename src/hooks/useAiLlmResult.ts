import {useEffect, useState} from 'react';
import {HomeStackParamList, Song} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {homeStackNavigations} from '../constants';
import * as amplitude from '@amplitude/analytics-react-native';
import {logButtonClick} from '../utils';

type UseAiLlmResultProps = {
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.AI_LLM_RESULT
  >;
  resultSong: Song[];
};

const useAiLlmResult = ({navigation, resultSong}: UseAiLlmResultProps) => {
  const [searchResult, setSearchResult] = useState<Song[]>();

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

  return {
    searchResult,
    handleOnSongPress,
  };
};

export default useAiLlmResult;
