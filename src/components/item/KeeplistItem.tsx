import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

interface KeeplistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onPress: () => void;
}

const KeeplistItem: React.FC<KeeplistItemProps> = ({
  songNumber,
  songName,
  singerName,
  onPress,
}) => {
  return (
    <View style={tw`w-full`}>
      <TouchableOpacity onPress={onPress} style={tw`w-full`}>
        <View
          style={tw`flex-row justify-between items-center bg-gray-400 m-1 rounded-lg p-1`}>
          <View style={tw`flex-row h-full items-center justify-center`}>
            <CustomText style={tw`font-bold text-sm text-black mr-4`}>
              {songNumber}
            </CustomText>
            <View>
              <CustomText style={tw`text-black font-bold`}>
                {songName}
              </CustomText>
              <CustomText style={tw`text-black`}>{singerName}</CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {KeeplistItem};
