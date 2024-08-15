import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import tw from 'twrnc';
import {TouchableOpacity} from 'react-native-gesture-handler';

type TagIconButtonProps = {
  tag: string;
  index: number;
  onPress: () => void;
  Icon: any;
};

const TagIconButton = ({tag, index, onPress, Icon}: TagIconButtonProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const viewWidth = deviceWidth * 0.25; // 전체 너비의 80%로 제한

  return (
    <View style={[tw`justify-center items-center my-1`, {width: viewWidth}]}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`justify-center items-center`}
        activeOpacity={0.8}>
        <Icon width={24} height={24} onPress={onPress} />
        <Text
          style={tw`text-white text-[10px] mx-4 text-center mt-2`}
          numberOfLines={2} // 최대 두 줄로 표시되도록 설정
          ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
        >
          {tag}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {TagIconButton};
