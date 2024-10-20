import {useState} from 'react';
import postRcdRecommendationLlm from '../api/recommendation/postRcdRecommendationLlm';
import {HomeStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {homeStackNavigations} from '../constants';
import {logTrack} from '../utils';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

type UseAiLlmProps = {
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.AI_LLM
  >;
};

const useAiLlm = ({navigation}: UseAiLlmProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [searchResult, setSearchResult] = useState<Song[]>();
  const [randomKeywords, setRandomKeywords] = useState<string[]>([]);
  const [sampleText, setSampleText] = useState<string>('');
  const [selectedGif, setSelectedGif] = useState<number>(0);

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
      navigation.navigate(homeStackNavigations.AI_LLM_RESULT, {
        resultSong: tempData.data.songs || [],
        character: selectedGif === 0 ? 'singsong' : 'sangsong',
      });
    },
  });

  return {
    isLoading,
    handleOnPressSearch,
    randomKeywords,
    setRandomKeywords,
    sampleText,
    setSampleText,
    selectedGif,
    setSelectedGif,
  };
};

export default useAiLlm;
