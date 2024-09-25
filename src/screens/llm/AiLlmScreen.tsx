import React from 'react';
import {Image, View} from 'react-native';
import {designatedColor, homeStackNavigations} from '../../constants';
import tw from 'twrnc';
import CustomText from '../../components/text/CustomText';
import {HomeStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import SingsongsangsongIcon from '../../assets/svg/singsongsangsong.svg';
// import SearchIcon from '../../assets/svg/search.svg';
import {SearchKeyboard} from '../../components';
import useAiLlm from '../../hooks/useAiLlm';
// import FastImage from 'react-native-fast-image';

type AiLlmScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_LLM
>;

function AiLlmScreen(props: AiLlmScreenProps) {
  const aiLlmHandler = useAiLlm({navigation: props.navigation});

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] items-center`,
      ]}>
      <View style={tw`flex-1 justify-start items-center`}>
        <View style={tw`mt-[30%] items-center`}>
          <CustomText style={tw`text-white text-lg font-bold`}>
            싱송이와 생송이에게 물어보세요
          </CustomText>
          <View style={tw`items-center my-4`}>
            <SingsongsangsongIcon />
          </View>
        </View>
      </View>

      {/* SearchKeyboard를 화면 하단에 고정 */}
      <View style={tw`w-full absolute bottom-0`}>
        <SearchKeyboard
          text="문장으로 검색하고, 맞춤 노래를 추천 받으세요."
          onSearchPress={aiLlmHandler.handleOnPressSearch}
        />
      </View>
      {aiLlmHandler.isLoading && (
        <View style={tw`flex-1`}>
          <Image
            source={require('../../assets/gif/loadingAnimation.gif')}
            // style={{width: 200, height: 200}}
          />
          {/* <FastImage
            style={{width: 200, height: 200}}
            source={{
              uri: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
        </View>
      )}
    </View>
  );
}

export default AiLlmScreen;
