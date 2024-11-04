import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  InputAccessoryView,
  Keyboard,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  designatedColor,
  homeStackNavigations,
  keywordList,
  searchStackNavigations,
} from '../../constants';
import tw from 'twrnc';
import CustomText from '../../components/text/CustomText';
import {HomeStackParamList, SearchStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
// import SingsongsangsongIcon from '../../assets/svg/singsongsangsong.svg';
import {
  RcdKeywordModule,
  RecentKeywordModule,
  SearchKeyboard,
} from '../../components';
import useAiLlm from '../../hooks/useAiLlm';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getRandomKeywords, logPageView} from '../../utils';
// import {ScrollView} from 'react-native-gesture-handler';
// import InfoIcon from '../../assets/svg/Info.svg';
import {useFocusEffect} from '@react-navigation/native';
import AiSangsongIcon from '../../assets/svg/aiSangsong.svg';
import ArrowRightIcon from '../../assets/svg/arrowRightGray.svg';

type AiLlmScreenProps =
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.AI_LLM>
  | StackScreenProps<
      SearchStackParamList,
      typeof searchStackNavigations.SEARCH_AI_LLM
    >;

function AiLlmScreen(props: AiLlmScreenProps) {
  const aiLlmHandler = useAiLlm({
    navigation: props.navigation,
    routeName: props.route.name,
  });
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

  const {width, height} = useWindowDimensions();
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
      <View style={[tw`flex-1 justify-start`]}>
        <TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
          <ScrollView
            contentContainerStyle={[
              tw`flex-grow justify-start pb-20`,
              {
                paddingTop: height * 0.1,
                paddingBottom: bottomHeight,
              },
            ]}>
            <View style={tw`w-full pl-2 pt-4 pb-10`}>
              <AiSangsongIcon />
              <CustomText style={tw`text-white text-[15px] mt-2`}>
                안녕하세요! 저에게 부르고 싶은 노래를 물어보세요!
              </CustomText>
            </View>
            <RcdKeywordModule
              onPressRcdKeyword={aiLlmHandler.handleOnPressRcdKeyword}
            />
            <RecentKeywordModule
              onPressRecentKeyword={aiLlmHandler.handleOnPressRecentKeyword}
            />
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>

      {/* 이 아래는 키보드를 dismiss하지 않음 */}
      <View
        key={key}
        style={tw`w-full absolute bottom-0 bg-[${designatedColor.BACKGROUND_BLACK}]`}
        onLayout={handleLayoutBottom}>
        {!aiLlmHandler.isLoading && (
          <InputAccessoryView
            // nativeID="uniqueInputAccessoryViewID"
            backgroundColor={designatedColor.BACKGROUND_BLACK}
            style={tw`py-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
            {/* <> */}
            <TouchableOpacity
              style={tw`flex-row justify-between items-center px-6 pt-2 border-t-[0.5px] border-[${designatedColor.GRAY5}]`}
              onPress={aiLlmHandler.handleOnPressInfo}
              activeOpacity={1.0}>
              <CustomText style={tw`text-[${designatedColor.GRAY2}]`}>
                더 정확한 추천을 받고 싶다면?
              </CustomText>
              <ArrowRightIcon width={24} height={24} />
            </TouchableOpacity>

            <SearchKeyboard
              text="문장으로 검색하고, 맞춤 노래를 추천 받으세요."
              onSearchPress={aiLlmHandler.handleOnPressSearch}
              sampleText={aiLlmHandler.sampleText} // 선택한 텍스트 전달
              inputRef={aiLlmHandler.inputRef}
            />
            {/* </> */}
          </InputAccessoryView>
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
