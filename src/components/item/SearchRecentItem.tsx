import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import DeleteIcon from '../../assets/svg/delete.svg';
import {formatDate} from '../../utils';

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
      style={tw`w-full flex-row justify-between p-2 items-center`}
      onPress={onPress}>
      <Text style={tw`text-white`}>{recentText}</Text>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-[${designatedColor.GRAY2}]`}>
          {formatDate(date)}
        </Text>

        <TouchableOpacity style={tw`my-1 p-2`} onPress={onDeletePress}>
          <DeleteIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export {SearchRecentItem};
