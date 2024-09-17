import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

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
        <View style={tw`items-center justify-center w-[12]`}>
          <CustomText
            style={tw`text-white text-sm text-[${designatedColor.GREEN}] font-bold `}>
            {songNumber}
          </CustomText>
        </View>

        <View style={tw`h-full ml-4 flex-1`}>
          <View style={tw`flex-row`}>
            <CustomText
              style={tw`text-white text-sm`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songName}
            </CustomText>
          </View>

          <CustomText
            style={tw`text-white text-sm mt-1 text-[${designatedColor.DARK_GRAY}]`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {singerName}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {SonglistItem};
