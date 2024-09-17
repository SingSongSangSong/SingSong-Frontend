import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {OutlineButton} from '../button/OutlineButton';
import CustomText from '../text/CustomText';

interface BlacklistItemProps {
  nickname: string;
  blockDate: string;
  onDeletePress: () => void;
}

const BlacklistItem = ({
  nickname,
  blockDate,
  onDeletePress,
}: BlacklistItemProps) => {
  return (
    <View
      style={tw`flex-row justify-between p-2 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
      <View>
        <CustomText style={tw`text-white my-2`}>{nickname}</CustomText>
        <CustomText style={tw`text-white`}>{blockDate}</CustomText>
      </View>
      <View style={tw`my-4`}>
        <OutlineButton
          title="차단 해제"
          onPress={onDeletePress}
          color={designatedColor.DARK_GRAY}
        />
      </View>
    </View>
  );
};

export {BlacklistItem};
