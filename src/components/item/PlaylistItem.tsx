import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from 'twrnc';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';

interface PlaylistItemProps {
  playlistName: string;
  playlistLen: number;
  onPress: () => void;
}

const PlaylistItem = ({
  playlistName,
  playlistLen,
  onPress,
}: PlaylistItemProps) => {
  return (
    <View>
      <TouchableOpacity
        style={tw`w-full h-[15] flex-row items-center justify-between mb-5`}>
        <View style={tw`flex-row`}>
          {/* <View style={tw`h-[20] w-[20] bg-[#C7E3BE]`} /> */}
          <Image
            source={{
              uri: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/dCyJyeNJ50BMG489LQg9cokHUpk.jpg',
            }}
            // style={styles.image}
            style={tw`w-15 h-15 rounded-lg`}
          />
          <View style={tw`h-full ml-4`}>
            <Text style={tw`text-white text-sm mt-1`}>{playlistName}</Text>
            <Text style={tw`text-white text-sm mt-2`}>
              Playlist {'\u00B7'} {playlistLen} songs
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress}>
          <ArrowRightIcon width={24} height={24} style={tw`mr-5`} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export {PlaylistItem};
