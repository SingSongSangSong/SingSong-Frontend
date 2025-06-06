import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';
import {designatedColor} from '../../constants';

type TagExploreItemProps = {
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

const TagExploreItem = ({tag, index, onPress, Icon}: TagExploreItemProps) => {
  // const deviceWidth = Dimensions.get('window').width;
  // const viewWidth = deviceWidth * 0.25; // 전체 너비의 80%로 제한
  const maxLength = 8; // 한 줄에 표시할 최대 글자 수

  return (
    // <View style={[tw`justify-center items-center my-1`]}>
    <TouchableOpacity
      onPress={onPress}
      style={tw`flex-1 flex-row justify-center items-center bg-[${designatedColor.GRAY5}] mx-2 my-1 rounded-lg py-2 px-4`}
      activeOpacity={0.8}>
      <Icon width={48} height={48} onPress={onPress} />
      <CustomText
        style={tw`flex-1 text-white text-[14px] text-center font-bold`}
        numberOfLines={2} // 최대 두 줄로 표시되도록 설정
        ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
      >
        {splitTextToTwoLines(tag, maxLength)}
      </CustomText>
    </TouchableOpacity>
    // </View>
  );
};

export {TagExploreItem};
