import React from 'react';
import {
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {designatedColor, homeStackNavigations} from '../../constants';
import tw from 'twrnc';
import CustomText from '../../components/text/CustomText';
import {HomeStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import SingsongsangsongIcon from '../../assets/svg/singsongsangsong.svg';
import {SearchKeyboard} from '../../components';
import useAiLlm from '../../hooks/useAiLlm';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type AiLlmScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_LLM
>;

function AiLlmScreen(props: AiLlmScreenProps) {
  const aiLlmHandler = useAiLlm({navigation: props.navigation});

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] items-center`,
        Platform.OS == 'ios' && {
          paddingBottom: insets.bottom,
        },
      ]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={tw`flex-1 w-full justify-start items-center`}>
          <View style={tw`mt-[30%] items-center`}>
            <CustomText style={tw`text-white text-lg font-bold`}>
              싱송이와 생송이에게 물어보세요
            </CustomText>
            <View style={tw`items-center my-4`}>
              <SingsongsangsongIcon />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* SearchKeyboard를 화면 하단에 고정 */}
      <TouchableWithoutFeedback>
        <View style={tw`w-full absolute bottom-0`}>
          <SearchKeyboard
            text="문장으로 검색하고, 맞춤 노래를 추천 받으세요."
            onSearchPress={aiLlmHandler.handleOnPressSearch}
          />
        </View>
      </TouchableWithoutFeedback>

      {aiLlmHandler.isLoading && (
        <View style={tw`w-full h-full justify-center items-center`}>
          <Image
            // source={require('../../assets/gif/loadingAnimation.gif')}
            source={require('../../assets/gif/sample.gif')}
            style={{width: 134, height: 148}}
          />
        </View>
      )}
    </View>
  );
}

export default AiLlmScreen;
