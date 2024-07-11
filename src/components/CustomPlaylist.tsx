import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PlayIcon from '../../public/play.svg';
interface CustomPlaylistProps {
  playlistName: string;
  playlistLen: string;
  onPress: () => void;
}

const CustomPlaylist = ({
  playlistName,
  playlistLen,
  onPress,
}: CustomPlaylistProps) => {
  return (
    <View>
      <TouchableOpacity
        style={tw`w-full h-[20] bg-gray-900 flex-row items-center border border-white justify-between`}>
        <View style={tw`flex-row`}>
          <View style={tw`h-[20] w-[20] bg-[#C7E3BE]`} />
          <View style={tw`h-full ml-3`}>
            <Text style={tw`text-white text-sm mt-2`}>{playlistName}</Text>
            <Text style={tw`text-white text-sm mt-2`}>총 {playlistLen}곡</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress}>
          <PlayIcon width={24} height={24} style={tw`mr-5`} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default CustomPlaylist;
