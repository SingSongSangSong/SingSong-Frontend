import React from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import CustomText from '../text/CustomText';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import ArrowRightGrayIcon from '../../assets/svg/arrowRightGray.svg';
import TextIcon from '../../assets/svg/text.svg';
import SingsongIcon from '../../assets/svg/singsong.svg';
import SangsongIcon from '../../assets/svg/sangsong.svg';

interface LlmModuleProps {
  onPressSearch: () => void;
}

const LlmModule = ({onPressSearch}: LlmModuleProps) => {
  const {width} = useWindowDimensions();
  return (
    <>
      <View
        style={tw`flex-1 justify-center items-center pt-6 border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
        <CustomText style={tw`text-white text-[4] my-1 font-bold`}>
          노래방에서 부를 노래를 고민하고 있나요?
        </CustomText>
        <View style={tw`flex-row items-center`}>
          <SingsongIcon width={width * 0.2} height={186} />
          <TextIcon width={width * 0.5} height={186} />
          <SangsongIcon width={width * 0.2} height={186} />
        </View>
        {/* <CustomText style={tw`text-white text-[4] my-1`}>
          노래를 찾지 못하셨나요?
        </CustomText> */}
        <TouchableOpacity
          onPress={onPressSearch}
          style={tw`flex-1 mt-4`}
          activeOpacity={0.9}>
          <View
            style={tw`flex-row justify-between items-center bg-[${designatedColor.GRAY5}] py-1 rounded-full border-[0.5px] border-[${designatedColor.PINK2}] my-4 w-[90%] px-3`}>
            {/* 여기서 w-full로 전체 너비를 설정하고, mx로 수평 마진을 추가 */}
            <CustomText style={tw`text-[${designatedColor.GRAY3}]`}>
              문장으로 검색하고, 맞춤 노래를 추천 받으세요.
            </CustomText>
            <ArrowRightGrayIcon />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <CustomText>다른 사용자들이 검색한 키워드</CustomText>
        {/* 잠시만 기다려주세요 배경 다 검정색으로 */}
      </View>
    </>
  );
};

export {LlmModule};
