import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {OutlineButton} from '../button/OutlineButton';

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
      style={tw`flex-row justify-between p-2 border-b border-[${designatedColor.GRAY4}]`}>
      <View>
        <Text style={tw`text-white my-2`}>{nickname}</Text>
        <Text style={tw`text-white`}>{blockDate}</Text>
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
