import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, useWindowDimensions, View} from 'react-native';
import {designatedColor, homeStackNavigations} from '../../constants';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import useAiLlmResult from '../../hooks/useAiLlmResult';
import {OutlineButton, SongsList} from '../../components';
import CustomText from '../../components/text/CustomText';
import ArrowBottomIcon from '../../assets/svg/arrowBottom.svg';
import SingsongIcon from '../../assets/svg/singsong.svg';
import SangsongIcon from '../../assets/svg/sangsong.svg';
import {logPageView} from '../../utils';

type AiLlmResultScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_LLM_RESULT
>;

function AiLlmResultScreen(props: AiLlmResultScreenProps) {
  const aiLlmResultHandler = useAiLlmResult({
    navigation: props.navigation,
    resultSong: props.route.params.resultSong,
    character: props.route.params.character,
  });
  const {width} = useWindowDimensions();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10, // 화살표를 위로 10px 이동
          duration: 1000, // 이동 시간
          easing: Easing.linear, // 일정한 속도로 이동
          useNativeDriver: true, // 네이티브 드라이버 사용
        }),
        Animated.timing(translateY, {
          toValue: 0, // 원래 위치로 돌아옴
          duration: 1000, // 이동 시간
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    );

    floatingAnimation.start(); // 애니메이션 시작

    return () => floatingAnimation.stop(); // 컴포넌트 언마운트 시 애니메이션 정지
  }, [translateY]);

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  // ListHeaderComponent를 useMemo로 캐싱
  const renderHeader = useMemo(
    () => (
      <View style={tw`justify-center items-center py-6`}>
        {aiLlmResultHandler.characterIcon === 'singsong' ? (
          <View style={tw`flex-row items-center`}>
            <SingsongIcon width={width * 0.2} height={186} />
            <CustomText
              style={tw`text-[${designatedColor.WHITE}] text-lg font-bold ml-4`}>
              싱송's PICK은?
            </CustomText>
          </View>
        ) : (
          <View style={tw`flex-row items-center`}>
            <CustomText
              style={tw`text-[${designatedColor.WHITE}] text-lg font-bold mr-4`}>
              생송's PICK은?
            </CustomText>
            <SangsongIcon width={width * 0.2} height={186} />
          </View>
        )}
        <Animated.View style={[{transform: [{translateY}]}]}>
          <ArrowBottomIcon />
        </Animated.View>
      </View>
    ),
    [translateY, aiLlmResultHandler.characterIcon],
  );

  // FlatList의 FooterComponent
  const renderFooter = () => (
    <View style={tw`py-8`}>
      <CustomText style={tw`text-white text-base text-center font-bold`}>
        앗! 추천 노래는 여기까지에요
      </CustomText>
      <CustomText style={tw`text-white text-base text-center py-2 font-bold`}>
        다시 추천을 받는 화면으로 이동할까요?
      </CustomText>
      <View style={tw`flex-row justify-center items-center py-4`}>
        <OutlineButton
          title="네, 다시 추천 받을래요"
          color={designatedColor.VIOLET2}
          onPress={() => {
            props.navigation.navigate(homeStackNavigations.AI_LLM);
          }}
        />
        <OutlineButton
          title="아니요, 홈으로 이동할래요"
          color={designatedColor.GRAY1}
          onPress={() => {
            props.navigation.navigate(homeStackNavigations.RCD_HOME);
          }}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] items-center`,
      ]}>
      {/* <View style={tw`justify-center items-center py-12`}>
        <CustomText style={tw`text-lg text-white font-bold`}>
          싱송이와 생송이가 추천하는 노래에요
        </CustomText>
        <Animated.View style={[{transform: [{translateY}]}, tw`pt-8`]}>
          <ArrowBottomIcon />
        </Animated.View>
      </View> */}
      <SongsList
        songlistData={aiLlmResultHandler.searchResult || []}
        isShowKeepIcon={false}
        onSongPress={aiLlmResultHandler.handleOnSongPress}
        onKeepAddPress={aiLlmResultHandler.handleOnKeepAddPress}
        onKeepRemovePress={aiLlmResultHandler.handleOnKeepRemovePress}
        listHeader={renderHeader}
        listFooter={renderFooter}
        isShowInfo={false}
      />
    </View>
  );
}

export default AiLlmResultScreen;
