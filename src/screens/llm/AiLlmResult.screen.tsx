import React from 'react';
import {View} from 'react-native';
import {designatedColor, homeStackNavigations} from '../../constants';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
// import SearchIcon from '../../assets/svg/search.svg';
import useAiLlmResult from '../../hooks/useAiLlmResult';
import {SongsList} from '../../components';

type AiLlmResultScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_LLM_RESULT
>;

function AiLlmResultScreen(props: AiLlmResultScreenProps) {
  const aiLlmResultHandler = useAiLlmResult({
    navigation: props.navigation,
    resultSong: props.route.params.resultSong,
  });

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] items-center`,
      ]}>
      {/* <View style={tw`flex-1 justify-start items-center`}>
        <View style={tw`mt-[30%] items-center`}>
          <CustomText style={tw`text-white text-lg font-bold`}>
            싱송이와 생송이에게 물어보세요
          </CustomText>
          <View style={tw`items-center my-4`}>
            <SingsongsangsongIcon />
          </View>
        </View>
      </View> */}
      <SongsList
        songlistData={aiLlmResultHandler.searchResult || []}
        isShowKeepIcon={false}
        onSongPress={aiLlmResultHandler.handleOnSongPress}
        //   onKeepAddPress={}
        // onKeepRemovePress={}
      />
    </View>
  );
}

export default AiLlmResultScreen;
