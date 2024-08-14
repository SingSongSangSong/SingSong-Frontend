import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

interface TagDetailListItemProps {
  tag: string;
  Icon: any;
  onPress: () => void;
}

const TagDetailListItem = ({tag, Icon, onPress}: TagDetailListItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={tw`flex-row my-2 mx-2 items-center`}>
        {/* 아이콘을 감싸는 하얀색 동그라미 배경 */}
        <View
          style={tw`w-13 h-13 bg-white rounded-full justify-center items-center`}>
          <Icon width={60} height={60} />
        </View>
        <Text style={tw`text-white ml-4`}>{tag}</Text>
      </View>
    </TouchableOpacity>
  );
};

export {TagDetailListItem};
