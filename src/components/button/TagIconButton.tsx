import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';
import {designatedColor} from '../../constants';

type TagIconButtonProps = {
  tag: string;
  index: number;
  onPress: () => void;
  Icon: any;
};

// 텍스트를 적절한 위치에서 두 줄로 나누는 함수
const splitTextToTwoLines = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  const firstPart = text.slice(0, maxLength).trim();
  const secondPart = text.slice(maxLength).trim();
  return `${firstPart}\n${secondPart}`;
};

const TagIconButton = ({tag, index, onPress, Icon}: TagIconButtonProps) => {
  const maxLength = 7; // 한 줄에 표시할 최대 글자 수

  return (
    <View style={[tw`justify-center items-center my-1`, {width: 90}]}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-full justify-center items-center`}
        activeOpacity={0.8}>
        {/* NEW 뱃지 */}
        {index >= 0 && index < 4 && (
          <View
            style={[
              tw`rounded-sm py-0.2`,
              {
                position: 'absolute',
                top: -1, // 아이콘의 상단에 붙도록 설정
                left: 6, // 아이콘의 왼쪽에 붙도록 설정
                zIndex: 2, // 아이콘보다 위에 표시되도록 설정
              },
            ]}>
            <CustomText
              style={tw`text-[${designatedColor.MINT}] text-[10px] font-bold`}>
              NEW
            </CustomText>
          </View>
        )}

        {/* 아이콘 */}
        <Icon width={48} height={48} onPress={onPress} />

        {/* 텍스트 */}
        <CustomText
          style={tw`w-full text-white text-[11px] mx-2 text-center mt-0.4`}
          numberOfLines={2} // 최대 두 줄로 표시되도록 설정
          ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
        >
          {splitTextToTwoLines(tag, maxLength)}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export {TagIconButton};
