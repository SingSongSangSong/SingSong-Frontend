import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  designatedColor,
  homeStackNavigations,
  mainTitleList,
  searchStackNavigations,
} from '../../constants';
import tw from 'twrnc';
import {HomeStackParamList, SearchStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import useAiLlmResult from '../../hooks/useAiLlmResult';
import {OutlineButton, SongsList} from '../../components';
import CustomText from '../../components/text/CustomText';
import ArrowBottomIcon from '../../assets/svg/arrowBottom.svg';
import SingsongIcon from '../../assets/svg/singsong.svg';
import SangsongIcon from '../../assets/svg/sangsong.svg';
import {logPageView} from '../../utils';
import ArrowRightIcon from '../../assets/svg/arrowRightGray.svg';

type AiLlmResultScreenProps =
  | StackScreenProps<
      HomeStackParamList,
      typeof homeStackNavigations.AI_LLM_RESULT
    >
  | StackScreenProps<
      SearchStackParamList,
      typeof searchStackNavigations.SEARCH_AI_LLM_RESULT
    >;

function AiLlmResultScreen(props: AiLlmResultScreenProps) {
  const aiLlmResultHandler = useAiLlmResult({
    navigation: props.navigation,
    resultSong: props.route.params.resultSong,
    character: props.route.params.character,
    routeName: props.route.name,
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

  const handleOnNavigateYes = () => {
    if ('navigate' in props.navigation) {
      if (props.route.name === searchStackNavigations.SEARCH_AI_LLM_RESULT) {
        (
          props.navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).navigate(searchStackNavigations.SEARCH_AI_LLM);
      } else if (props.route.name === homeStackNavigations.AI_LLM_RESULT) {
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.AI_LLM);
      }
    }
  };

  const handleOnNavigateNo = () => {
    if ('navigate' in props.navigation) {
      if (props.route.name === searchStackNavigations.SEARCH_AI_LLM_RESULT) {
        (
          props.navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).navigate(searchStackNavigations.SEARCH);
      } else if (props.route.name === homeStackNavigations.AI_LLM_RESULT) {
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.RCD_HOME);
      }
    }
  };

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
          onPress={handleOnNavigateYes}
        />
        <OutlineButton
          title="아니요, 홈으로 이동할래요"
          color={designatedColor.GRAY1}
          onPress={handleOnNavigateNo}
        />
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <View style={tw`flex-1 justify-center py-8`}>
      <CustomText
        style={tw`text-[${designatedColor.VIOLET3}] text-lg font-bold text-center`}>
        추천 노래가 없어요
      </CustomText>

      <View style={tw`w-full py-6 px-4`}>
        <CustomText
          style={tw`text-[${designatedColor.VIOLET2}] text-[16px] py-2`}>
          다음 키워드를 참고해보세요
        </CustomText>
        {mainTitleList.map((title, index) => (
          <CustomText
            key={index}
            style={tw`text-[${designatedColor.GRAY1}] py-1 px-2 text-[15px]`}>
            {index + 1}. {title}
          </CustomText>
        ))}
        <TouchableOpacity
          style={tw`w-full flex-row justify-between items-center mt-4 pt-2 border-t-[0.5px] border-[${designatedColor.GRAY5}]`}
          onPress={aiLlmResultHandler.handleOnPressInfo}
          activeOpacity={1.0}>
          <CustomText style={tw`text-[${designatedColor.GRAY2}]`}>
            더 정확한 추천을 받고 싶다면?
          </CustomText>
          <ArrowRightIcon width={24} height={24} />
        </TouchableOpacity>
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
      {aiLlmResultHandler.searchResult?.length === 0 ? (
        <FlatList
          data={aiLlmResultHandler.searchResult}
          // renderItem={renderItem}
          // keyExtractor={item => item.id.toString()}
          ListHeaderComponent={renderHeader} // 기존 헤더
          ListFooterComponent={renderFooter} // 기존 푸터
          ListEmptyComponent={renderEmptyComponent} // 데이터가 없을 때 가운데에 표시
        />
      ) : (
        <SongsList
          songlistData={aiLlmResultHandler.searchResult || []}
          isShowKeepIcon={true}
          onSongPress={aiLlmResultHandler.handleOnSongPress}
          onKeepAddPress={aiLlmResultHandler.handleOnKeepAddPress}
          onKeepRemovePress={aiLlmResultHandler.handleOnKeepRemovePress}
          listHeader={renderHeader}
          listFooter={renderFooter}
          isShowInfo={true}
        />
      )}
    </View>
  );
}

export default AiLlmResultScreen;
