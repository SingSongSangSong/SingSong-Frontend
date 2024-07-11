import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

interface CustomSonglistProps {
  songName: string;
  singerName: number;
  onPress: () => void;
}

const CusomSonglist: React.FC<CustomSonglistProps> = ({
  songName,
  singerName,
  onPress,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View
          style={tw`flex-row justify-between items-center bg-gray-800 m-2 border rounded-lg p-3`}>
          <View>
            <Text style={tw`text-white`}>{songName}</Text>
            <Text style={tw`text-white`}>{singerName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CusomSonglist;
