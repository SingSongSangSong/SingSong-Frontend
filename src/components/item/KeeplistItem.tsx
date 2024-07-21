import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

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
            <Text style={tw`font-bold text-sm text-black mr-4`}>
              {songNumber}
            </Text>
            <View>
              <Text style={tw`text-black font-bold`}>{songName}</Text>
              <Text style={tw`text-black`}>{singerName}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {KeeplistItem};
