import {useState} from 'react';
import postRcdRecommendationLlm from '../api/recommendation/postRcdRecommendationLlm';
import {HomeStackParamList} from '../types';
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
  const [randomKeywords, setRandomKeywords] = useState<string[]>([]);
  const [sampleText, setSampleText] = useState<string>('');
  const [selectedGif, setSelectedGif] = useState<number>(0);

  const handleOnPressSearch = async (sentence: string) => {
    setIsLoading(true);
    const tempData = await postRcdRecommendationLlm(sentence);
    // setSearchResult(tempData.data.songs);
    setIsLoading(false);
    navigation.navigate(homeStackNavigations.AI_LLM_RESULT, {
      resultSong: tempData.data.songs || [],
      character: selectedGif === 0 ? 'singsong' : 'sangsong',
    });
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
  };
};

export default useAiLlm;
