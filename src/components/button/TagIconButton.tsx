import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

type TagIconButtonProps = {
  tag: string;
  index: number;
  onPress: () => void;
  Icon: any;
};

// 적절한 위치에서 텍스트를 두 줄로 나눔
const splitTextToTwoLines = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }

  const firstPart = text.slice(0, maxLength).trim();
  const secondPart = text.slice(maxLength).trim();
  return `${firstPart}\n${secondPart}`;
};

const TagIconButton = ({tag, index, onPress, Icon}: TagIconButtonProps) => {
  // const deviceWidth = Dimensions.get('window').width;
  // const viewWidth = deviceWidth * 0.25; // 전체 너비의 80%로 제한
  const maxLength = 5; // 한 줄에 표시할 최대 글자 수

  return (
    <View style={[tw`justify-center items-center my-1`, {width: 90}]}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`justify-center items-center`}
        activeOpacity={0.8}>
        <Icon width={48} height={48} onPress={onPress} />
        <CustomText
          style={tw`text-white text-[10px] mx-4 text-center mt-2 font-bold`}
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
