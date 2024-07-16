import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

interface SonglistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onPress: () => void;
  showKeepIcon: boolean;
  onToggleStored: () => void;
  keepColor: (typeof designatedColor)[keyof typeof designatedColor];
}

const SonglistItem: React.FC<SonglistItemProps> = ({
  songNumber,
  songName,
  singerName,
  onPress,
  showKeepIcon,
  onToggleStored,
  keepColor = designatedColor.KEEP_EMPTY,
}) => {
  return (
    <View style={tw`w-full`}>
      <TouchableOpacity onPress={onPress} style={tw`w-full`}>
        <View
          style={tw`flex-row justify-between items-center bg-gray-400 m-3 rounded-lg p-3`}>
          <View style={tw`flex-row h-full items-center justify-center`}>
            <Text style={tw`font-bold text-sm text-black mr-4`}>
              {songNumber}
            </Text>
            <View>
              <Text style={tw`text-black font-bold`}>{songName}</Text>
              <Text style={tw`text-black`}>{singerName}</Text>
            </View>
          </View>
          {showKeepIcon && (
            <TouchableOpacity onPress={onToggleStored}>
              <Icon name="star" size={24} color={keepColor} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export {SonglistItem};
