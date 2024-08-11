import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

interface SonglistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onPress: () => void;
}

const SonglistItem = ({
  songNumber,
  songName,
  singerName,
  onPress,
}: SonglistItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={tw`flex-row items-center border-b border-[${designatedColor.GRAY4}] p-3 mx-2`}>
        <Text
          style={tw`text-white text-sm mr-2 text-[${designatedColor.GREEN}] items-center justify-center font-bold w-[12]`}>
          {songNumber}
        </Text>
        <View style={tw`h-full ml-4 flex-1`}>
          <View style={tw`flex-row`}>
            <Text
              style={tw`text-white text-sm truncate`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songName}
            </Text>
          </View>

          <Text
            style={tw`text-white text-sm mt-1 text-[${designatedColor.DARK_GRAY}] truncate`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {singerName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {SonglistItem};
