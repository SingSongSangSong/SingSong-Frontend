import {useEffect, useRef, useState} from 'react';
import postRcdRecommendationLlm from '../api/recommendation/postRcdRecommendationLlm';
import {HomeStackParamList, SearchStackParamList} from '../types';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {homeStackNavigations, searchStackNavigations} from '../constants';
import {logTrack} from '../utils';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {Keyboard, TextInput} from 'react-native';

type UseAiLlmProps = {
  navigation:
    | StackNavigationProp<
        HomeStackParamList,
        typeof homeStackNavigations.AI_LLM
      >
    | StackNavigationProp<
        SearchStackParamList,
        typeof searchStackNavigations.SEARCH_AI_LLM
      >;
  routeName: string;
};

const useAiLlm = ({navigation, routeName}: UseAiLlmProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [searchResult, setSearchResult] = useState<Song[]>();
  const [randomKeywords, setRandomKeywords] = useState<string[]>([]);
  const [sampleText, setSampleText] = useState<string>('');
  const [selectedGif, setSelectedGif] = useState<number>(0);
  const inputRef = useRef<TextInput>(null);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleOnPressSearch = async (sentence: string) => {
    if (sentence.trim() === '') {
      Toast.show({
        type: 'selectedToast',
        text1: '내용을 입력해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    } else {
      setIsLoading(true);
      logTrack('ai_llm_search_button_click');
      await mutateAsync(sentence);
    }

    // setSearchResult(tempData.data.songs);
    // setIsLoading(false);
  };

  const {mutateAsync} = useMutation({
    mutationFn: async (sentence: string) => {
      return postRcdRecommendationLlm(sentence);
    },
    onError: (error: Error) => {
      setIsLoading(false);
      Toast.show({
        type: 'selectedToast',
        // text1: '에러가 발생했습니다.',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: tempData => {
      setIsLoading(false);
      if ('navigate' in navigation) {
        if (routeName === searchStackNavigations.SEARCH_AI_LLM) {
          (
            navigation as StackScreenProps<SearchStackParamList>['navigation']
          ).navigate(searchStackNavigations.SEARCH_AI_LLM_RESULT, {
            resultSong: tempData.data.songs || [],
            character: selectedGif === 0 ? 'singsong' : 'sangsong',
          });
        } else if (routeName === homeStackNavigations.AI_LLM) {
          (
            navigation as StackScreenProps<HomeStackParamList>['navigation']
          ).navigate(homeStackNavigations.AI_LLM_RESULT, {
            resultSong: tempData.data.songs || [],
            character: selectedGif === 0 ? 'singsong' : 'sangsong',
          });
        }
      }
    },
  });

  const handleOnPressRecentKeyword = (recentKeyword: string) => {
    if (!isKeyboardVisible) {
      setSampleText(recentKeyword);
      inputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  return {
    isLoading,
    handleOnPressSearch,
    randomKeywords,
    setRandomKeywords,
    sampleText,
    setSampleText,
    selectedGif,
    setSelectedGif,
    handleOnPressRecentKeyword,
    inputRef,
  };
};

export default useAiLlm;
