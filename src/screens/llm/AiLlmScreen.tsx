import React, {useState, useEffect} from 'react';
import {
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  designatedColor,
  homeStackNavigations,
  keywordList,
} from '../../constants';
import tw from 'twrnc';
import CustomText from '../../components/text/CustomText';
import {HomeStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import SingsongsangsongIcon from '../../assets/svg/singsongsangsong.svg';
import {SearchKeyboard} from '../../components';
import useAiLlm from '../../hooks/useAiLlm';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getRandomKeywords} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';

type AiLlmScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_LLM
>;

function AiLlmScreen(props: AiLlmScreenProps) {
  const aiLlmHandler = useAiLlm({navigation: props.navigation});
  const insets = useSafeAreaInsets();
  const [randomKeywords, setRandomKeywords] = useState<string[]>([]);
  const [sampleText, setSampleText] = useState<string>('');

  // 처음 한 번만 랜덤 키워드를 생성
  useEffect(() => {
    setRandomKeywords(getRandomKeywords(keywordList, 5));
  }, []);

  // 여기는 키보드를 dismiss할 수 있는 특정 영역 (상단 배경)
  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  const {width} = useWindowDimensions();

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] items-center`,
        Platform.OS === 'ios' && {paddingBottom: insets.bottom},
      ]}>
      {/* 터치 시 키보드가 닫히는 상단 영역 */}
      <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
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

      {/* 이 아래는 키보드를 dismiss하지 않음 */}
      <View style={tw`w-full absolute bottom-0`}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex-row px-4 pt-2`}
          keyboardShouldPersistTaps="always" // ScrollView 터치 시 키보드를 유지
        >
          {randomKeywords.map((keyword, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw`bg-[${designatedColor.GRAY5}] rounded-lg px-4 py-3 mr-3 items-center justify-center`,
                {
                  width: width * 0.4,
                },
              ]}
              onPress={() => setSampleText(keyword)}
              activeOpacity={0.8}>
              <CustomText style={tw`text-[${designatedColor.GRAY_E5}] text-xs`}>
                {keyword}
              </CustomText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SearchKeyboard 컴포넌트 */}
        <SearchKeyboard
          text="문장으로 검색하고, 맞춤 노래를 추천 받으세요."
          onSearchPress={aiLlmHandler.handleOnPressSearch}
          sampleText={sampleText} // 선택한 텍스트 전달
        />
      </View>

      {aiLlmHandler.isLoading && (
        <View
          // bg-opacity-50
          style={tw`bg-[${designatedColor.BLACK}] w-full h-full justify-center items-center bg-opacity-50`}>
          <View style={tw`flex-1 justify-center items-center`}>
            <Image
              source={require('../../assets/gif/animation.gif')}
              style={{width: 134, height: 148}}
            />
            <CustomText style={tw`text-white text-lg mt-4 pb-10`}>
              검색 중입니다...
            </CustomText>
          </View>
        </View>
      )}
    </View>
  );
}

export default AiLlmScreen;
