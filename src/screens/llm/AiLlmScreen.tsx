import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  InputAccessoryView,
  Keyboard,
  LayoutChangeEvent,
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
import {getRandomKeywords, logPageView} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import InfoIcon from '../../assets/svg/Info.svg';
import {useFocusEffect} from '@react-navigation/native';

type AiLlmScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_LLM
>;

function AiLlmScreen(props: AiLlmScreenProps) {
  const aiLlmHandler = useAiLlm({navigation: props.navigation});
  const insets = useSafeAreaInsets();

  // 처음 한 번만 랜덤 키워드를 생성
  useEffect(() => {
    aiLlmHandler.setRandomKeywords(getRandomKeywords(keywordList, 5));
    const randomIndex = Math.floor(Math.random() * 2); // 0 또는 1
    // console.log('randomIndex:', randomIndex);
    aiLlmHandler.setSelectedGif(randomIndex);
    logPageView(props.route.name);
  }, []);

  // 여기는 키보드를 dismiss할 수 있는 특정 영역 (상단 배경)
  const dismissKeyboardHandler = () => {
    Keyboard.dismiss();
  };

  const {width} = useWindowDimensions();
  const [bottomHeight, setBottomHeight] = useState<number>(0); // 하단 컴포넌트 높이 상태 저장

  // 하단 영역의 높이를 계산하여 상태에 저장
  const handleLayoutBottom = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setBottomHeight(height); // 동적으로 계산한 높이 저장
  };

  const [key, setKey] = useState(0); // 컴포넌트를 리렌더링하기 위한 key

  useFocusEffect(
    useCallback(() => {
      // 화면이 포커스될 때마다 key 값을 증가시켜 컴포넌트 리렌더링 유도
      setKey(prevKey => prevKey + 1);
      aiLlmHandler.setSampleText(''); // 샘플 텍스트 초기화
    }, []),
  );

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] items-center`,
        Platform.OS === 'ios' && {paddingBottom: insets.bottom},
      ]}>
      {/* 터치 시 키보드가 닫히는 상단 영역 */}
      <View
        style={[
          tw`flex-1 justify-center items-center`,
          {
            paddingBottom: bottomHeight,
          },
        ]}>
        <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
          {/* <View style={tw`justify-center items-center bg-pink-200`}> */}
          <View style={tw`justify-center items-center`}>
            <View style={tw`items-center`}>
              <CustomText style={tw`text-white text-lg font-bold`}>
                싱송이와 생송이에게
              </CustomText>
              <CustomText style={tw`text-white text-lg font-bold`}>
                부르고 싶은 노래를 물어보세요
              </CustomText>
              <View style={tw`items-center my-4`}>
                <SingsongsangsongIcon />
              </View>
            </View>
            <View
              style={tw`bg-[${designatedColor.HOT_TRENDING_COLOR}] mx-4 p-4 rounded-lg mt-2`}>
              <View style={tw`flex-row items-center mb-2`}>
                <InfoIcon />
                <CustomText style={tw`text-white text-[12px] font-bold ml-1`}>
                  더 정확한 추천을 받으려면 아래 키워드를 사용해보세요
                </CustomText>
              </View>
              <CustomText
                style={tw`text-[${designatedColor.GRAY_E5}] text-[11px] mb-1`}>
                1. 부르고 싶은 노래와 비슷한 노래의 가수와 노래 제목을
                언급해보세요.
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET2}] text-[11px] mb-1`}>
                예시) "빅뱅의 '뱅뱅뱅' 같은 노래 추천해줘"
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.GRAY_E5}] text-[11px] mb-1`}>
                2. 분위기나 상황을 묘사해보세요. 이를 통해 맞춤형 추천을 받을 수
                있어요.
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET2}] text-[11px] mb-1`}>
                예시) "편안한 느낌의 노래 추천해줘"
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.GRAY_E5}] text-[11px]`}>
                3. 특별히 부르고 싶은 특정 연도가 있다면, 그 연도를
                언급해보세요.
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET2}] text-[11px] mb-1`}>
                예시) "2010년대 초반의 노래 추천해줘"
              </CustomText>
            </View>
          </View>
          {/* </View> */}
        </TouchableWithoutFeedback>
      </View>

      {/* 이 아래는 키보드를 dismiss하지 않음 */}
      <View
        key={key}
        style={tw`w-full absolute bottom-0 bg-[${designatedColor.BACKGROUND_BLACK}]`}
        onLayout={handleLayoutBottom}>
        {!aiLlmHandler.isLoading && (
          // <InputAccessoryView
          //   // nativeID="uniqueInputAccessoryViewID"
          //   backgroundColor={designatedColor.BACKGROUND_BLACK}
          //   style={tw`py-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`flex-row px-4 pt-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}
              keyboardShouldPersistTaps="always" // ScrollView 터치 시 키보드를 유지
            >
              {aiLlmHandler.randomKeywords.map((keyword, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    tw`bg-[${designatedColor.GRAY5}] rounded-lg px-4 py-3 mr-3 items-center justify-center`,
                    {
                      width: width * 0.4,
                    },
                  ]}
                  onPress={() => aiLlmHandler.setSampleText(keyword)}
                  activeOpacity={0.8}>
                  <CustomText
                    style={tw`text-[${designatedColor.GRAY_E5}] text-[10px]`}>
                    {keyword}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <SearchKeyboard
              text="문장으로 검색하고, 맞춤 노래를 추천 받으세요."
              onSearchPress={aiLlmHandler.handleOnPressSearch}
              sampleText={aiLlmHandler.sampleText} // 선택한 텍스트 전달
            />
          </>
          // </InputAccessoryView>
        )}
      </View>

      {aiLlmHandler.isLoading && (
        <View
          style={[
            tw`absolute top-0 left-0 w-full h-full bg-[${designatedColor.BLACK}] justify-center items-center bg-opacity-70`,
            // {zIndex: 9999},
          ]}>
          <View style={tw`flex-1 justify-center items-center`}>
            {aiLlmHandler.selectedGif === 0 ? ( //싱송
              <Image
                source={require('../../assets/gif/animation1.gif')}
                style={{width: 134, height: 148}}
              />
            ) : (
              //생송
              <Image
                source={require('../../assets/gif/animation2.gif')}
                style={{width: 100, height: 148}}
              />
            )}
            <CustomText
              style={tw`text-[${designatedColor.VIOLET}] text-lg mt-4 pb-10`}>
              검색 중입니다...
            </CustomText>
          </View>
        </View>
      )}
    </View>
  );
}

export default AiLlmScreen;
