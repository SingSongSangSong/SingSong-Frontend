import {useState} from 'react';
import postRcdRecommendationLlm from '../api/recommendation/postRcdRecommendationLlm';
import {HomeStackParamList, Song} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {homeStackNavigations} from '../constants';

type UseAiLlmProps = {
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.AI_LLM
  >;
};

const useAiLlm = ({navigation}: UseAiLlmProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [searchResult, setSearchResult] = useState<Song[]>();
  const handleOnPressSearch = async (sentence: string) => {
    setIsLoading(true);
    const tempData = await postRcdRecommendationLlm(sentence);
    // setSearchResult(tempData.data.songs);
    setIsLoading(false);
    navigation.navigate(homeStackNavigations.AI_LLM_RESULT, {
      resultSong: tempData.data.songs || [],
    });
  };

  return {
    isLoading,
    handleOnPressSearch,
  };
};

export default useAiLlm;
