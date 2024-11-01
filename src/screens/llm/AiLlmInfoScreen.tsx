import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList, SearchStackParamList} from '../../types';
import {
  designatedColor,
  exampleTitleList,
  homeStackNavigations,
  mainTitleList,
  searchStackNavigations,
  subTitleList,
} from '../../constants';
import {SafeAreaView, ScrollView, View} from 'react-native';
import CustomText from '../../components/text/CustomText';
import tw from 'twrnc';
import AiSangsongIcon from '../../assets/svg/aiSangsong.svg';

type AiLlmInfoScreenProps =
  | StackScreenProps<
      HomeStackParamList,
      typeof homeStackNavigations.AI_LLM_INFO
    >
  | StackScreenProps<
      SearchStackParamList,
      typeof searchStackNavigations.SEARCH_AI_LLM_INFO
    >;

function AiLlmResultScreen(props: AiLlmInfoScreenProps) {
  return (
    <SafeAreaView
      style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] justify-start px-3`}>
      <CustomText
        style={tw`text-[${designatedColor.TEXT_WHITE}] font-bold text-[22px] py-4`}>
        더 정확한 추천을 받고 싶다면?
      </CustomText>
      <CustomText
        style={tw`text-[${designatedColor.VIOLET3}] font-bold text-[20px] pb-4`}>
        아래의 키워드를 사용해보세요.
      </CustomText>
      <ScrollView style={tw`py-4`}>
        {mainTitleList.map((mainTitle, index) => (
          <View key={index} style={tw`my-4 mx-3`}>
            <CustomText
              style={tw`text-[${designatedColor.TEXT_WHITE}] text-[18px]`}>
              {index + 1} {mainTitle}
            </CustomText>
            <CustomText
              style={tw`text-[${designatedColor.GRAY1}] text-[15px] my-2`}>
              {subTitleList[index]}
            </CustomText>
            <View style={tw`flex-row items-center pl-4 py-2`}>
              <AiSangsongIcon width={40} height={40} />
              <CustomText
                style={tw`flex-1 text-[${designatedColor.VIOLET3}] text-[15px] pl-3`}>
                {exampleTitleList[index]}
              </CustomText>
            </View>
          </View>
        ))}
        <View style={tw`h-[24]`} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default AiLlmResultScreen;
