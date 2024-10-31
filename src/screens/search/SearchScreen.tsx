import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {SearchStackParamList} from '../../types';
import {designatedColor, searchStackNavigations} from '../../constants';
import {
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {logPageView} from '../../utils';
import CustomText from '../../components/text/CustomText';
import SearchIcon from '../../assets/svg/search.svg';
import {Icon} from 'react-native-elements';
import AiSangsongIcon from '../../assets/svg/aiSangsong.svg';
import ArrowRightIcon from '../../assets/svg/arrowRightGray.svg';
import {ExploreTagList} from '../../components';

type SearchScreenProps = StackScreenProps<
  SearchStackParamList,
  typeof searchStackNavigations.SEARCH
>;

function SearchScreen(props: SearchScreenProps) {
  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const handleOnTagButton = (tag: string) => {
    props.navigation.navigate(searchStackNavigations.SEARCH_RCD_DETAIL, {tag});
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <ScrollView contentContainerStyle={tw`pb-4`}>
        <View
          style={tw`flex-row items-center bg-[${designatedColor.BACKGROUND_BLACK}] p-3`}>
          <TouchableOpacity
            style={tw`flex-1 flex-row items-center bg-[${designatedColor.GRAY4}] rounded-lg px-3 h-10`}
            onPress={() =>
              props.navigation.navigate(searchStackNavigations.SEARCH_FOCUSED)
            }
            activeOpacity={1.0}>
            {Platform.OS === 'ios' ? (
              <SearchIcon width={20} height={20} style={tw`mr-3`} />
            ) : (
              <Icon name="search" size={20} color="#BEBEBE" style={tw`mr-3`} />
            )}
            <CustomText style={tw`flex-1 text-[${designatedColor.BEIGE}]`}>
              검색어를 입력해보세요.
            </CustomText>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full justify-start pl-6 py-2`}>
          <CustomText
            style={tw`text-[${designatedColor.WHITE}] font-bold text-[14px] py-2`}>
            검색 TIP
          </CustomText>
          <CustomText style={tw`text-[${designatedColor.VIOLET3}] pt-1`}>
            노래 제목 검색 - 예시) Supernova
          </CustomText>
          <CustomText style={tw`text-[${designatedColor.VIOLET3}] pt-1`}>
            가수 이름 검색 - 예시) 에스파
          </CustomText>
          <CustomText style={tw`text-[${designatedColor.VIOLET3}] pt-1`}>
            노래방 번호 검색 - 예시) 86820
          </CustomText>
        </View>
        <TouchableOpacity
          style={tw`flex-row m-2 bg-[${designatedColor.GRAY5}] rounded-xl py-2`}
          activeOpacity={1.0}
          onPress={() => {
            props.navigation.navigate(searchStackNavigations.SEARCH_AI_LLM);
          }}>
          <AiSangsongIcon width={50} height={50} style={tw`m-3`} />
          <View style={tw`flex-1 justify-center`}>
            <CustomText
              style={tw`text-[${designatedColor.TEXT_WHITE}] text-[16px]`}>
              부르고 싶은 노래를 AI에게 물어봐
            </CustomText>
            <View style={tw`flex-row items-center justify-between py-2 px-2`}>
              <CustomText
                style={tw`text-[${designatedColor.GRAY2}] text-[14px]`}>
                AI 검색으로 이동하기
              </CustomText>
              <ArrowRightIcon width={20} height={20} />
            </View>
          </View>
        </TouchableOpacity>
        <ExploreTagList handleOnTagButton={handleOnTagButton} />
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SearchScreen;
