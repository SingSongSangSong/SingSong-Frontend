import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import DeleteIcon from '../../assets/svg/delete.svg';

interface SearchRecentItemProps {
  date: string;
  recentText: string;
  onPress: () => void;
  onDeletePress: () => void;
}

const SearchRecentItem = ({
  date,
  recentText,
  onPress,
  onDeletePress,
}: SearchRecentItemProps) => {
  return (
    <TouchableOpacity
      style={tw`flex-row justify-between p-2 border-b border-[${designatedColor.GRAY4}]`}
      onPress={onPress}>
      <View>
        <Text style={tw`text-white my-2`}>{recentText}</Text>
        <Text style={tw`text-white`}>{date}</Text>
      </View>
      <TouchableOpacity style={tw`my-4 p-2`} onPress={onDeletePress}>
        <DeleteIcon width={16} height={16} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export {SearchRecentItem};
