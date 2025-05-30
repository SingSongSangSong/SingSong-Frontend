import {useEffect, useState} from 'react';
import {HomeStackParamList, SearchStackParamList, Song} from '../types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {homeStackNavigations, searchStackNavigations} from '../constants';
import * as amplitude from '@amplitude/analytics-react-native';
import {logButtonClick} from '../utils';
import Toast from 'react-native-toast-message';
import useKeepV2Store from '../store/useKeepV2Store';
import {deleteKeep, getKeepV2, postKeep} from '../api/keep-api';

type UseAiLlmResultProps = {
  navigation:
    | StackNavigationProp<
        HomeStackParamList,
        typeof homeStackNavigations.AI_LLM_RESULT
      >
    | StackNavigationProp<
        SearchStackParamList,
        typeof searchStackNavigations.SEARCH_AI_LLM_RESULT
      >;
  resultSong: Song[];
  character: string;
  routeName: string;
};

const useAiLlmResult = ({
  navigation,
  resultSong,
  character,
  routeName,
}: UseAiLlmResultProps) => {
  const [searchResult, setSearchResult] = useState<Song[]>();
  // const setKeepList = useKeepListStore(state => state.setKeepList);
  const [characterIcon, setCharacterIcon] = useState<string>();

  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);

  useEffect(() => {
    setSearchResult(resultSong);
    setCharacterIcon(character);
    // console.log('character:', character);
  }, []);

  const handleOnSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
    lyricsVideoId: string,
  ) => {
    amplitude.track('llm_song_button_click');
    logButtonClick('llm_song_button_click');
    if ('navigate' in navigation) {
      if (routeName === searchStackNavigations.SEARCH_AI_LLM_RESULT) {
        (
          navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).push(searchStackNavigations.SEARCH_SONG_DETAIL, {
          songId: songId,
          songNumber: songNumber,
          songName: songName,
          singerName: singerName,
          album: album || '',
          melonLink: melonLink,
          isMr: isMr,
          isLive: isLive,
          lyricsVideoId: lyricsVideoId || '',
        });
      } else if (routeName === homeStackNavigations.AI_LLM_RESULT) {
        (navigation as StackScreenProps<HomeStackParamList>['navigation']).push(
          homeStackNavigations.SONG_DETAIL,
          {
            songId: songId,
            songNumber: songNumber,
            songName: songName,
            singerName: singerName,
            album: album || '',
            melonLink: melonLink,
            isMr: isMr,
            isLive: isLive,
            lyricsVideoId: lyricsVideoId || '',
          },
        );
      }
    }
    // navigation.navigate({
    //   key: 'MyUniqueKeyForSongDetail',
    //   name: homeStackNavigations.SONG_DETAIL,
    //   params: {
    //     songId,
    //     songNumber,
    //     songName,
    //     singerName,
    //     album: album || '',
    //     melonLink,
    //     isMr,
    //     isLive,
    //   },
    // });
  };

  const handleOnKeepAddPress = async (songId: number) => {
    amplitude.track('llm_keep_button_click');
    logButtonClick('llm_keep_button_click');
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

  const handleOnKeepRemovePress = async (songId: number) => {
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

  const handleOnPressInfo = () => {
    if ('navigate' in navigation) {
      if (routeName === searchStackNavigations.SEARCH_AI_LLM_RESULT) {
        (
          navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).navigate(searchStackNavigations.SEARCH_AI_LLM_INFO);
      } else if (routeName === homeStackNavigations.AI_LLM_RESULT) {
        (
          navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.AI_LLM_INFO);
      }
    }
  };

  return {
    characterIcon,
    searchResult,
    handleOnSongPress,
    handleOnKeepAddPress,
    handleOnKeepRemovePress,
    handleOnPressInfo,
  };
};

export default useAiLlmResult;
