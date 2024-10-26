import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CustomText from '../text/CustomText';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import ArrowRightGrayIcon from '../../assets/svg/arrowRightGray.svg';
import {KeywordModule} from './KeywordModule';

interface LlmModuleProps {
  onPressSearch: () => void;
  refreshing: boolean;
}

const LlmModule = ({onPressSearch, refreshing}: LlmModuleProps) => {
  return (
    <>
      <View
        style={tw`flex-1 justify-center items-center pt-6 border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
        <View style={tw`w-full justify-start pl-6`}>
          <CustomText
            style={tw`text-[${designatedColor.VIOLET3}] text-lg mr-2`}>
            AI에게 물어봐
          </CustomText>
          <CustomText
            style={tw`text-[${designatedColor.GRAY1}] text-[11px] pt-1`}>
            나에게 딱 맞는 맞춤 노래를 추천받아 보세요!
          </CustomText>
        </View>

        <KeywordModule refreshing={refreshing} />

        {/* <View style={tw`flex-row items-center`}>
          <SingsongIcon width={width * 0.2} height={186} />
          <TextIcon width={width * 0.5} height={186} />
          <SangsongIcon width={width * 0.2} height={186} />
        </View> */}
        {/* <CustomText style={tw`text-white text-[4] my-1`}>
          노래를 찾지 못하셨나요?
        </CustomText> */}
        <TouchableOpacity
          onPress={onPressSearch}
          style={tw`flex-1`}
          activeOpacity={0.9}>
          <View
            style={tw`flex-row justify-between items-center bg-[${designatedColor.GRAY5}] py-1 rounded-full border-[0.5px] border-[${designatedColor.VIOLET}] my-2 w-[90%] px-3`}>
            {/* 여기서 w-full로 전체 너비를 설정하고, mx로 수평 마진을 추가 */}
            <CustomText style={tw`text-[${designatedColor.GRAY3}]`}>
              문장으로 검색하고, 맞춤 노래를 추천 받으세요.
            </CustomText>
            <ArrowRightGrayIcon />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export {LlmModule};
