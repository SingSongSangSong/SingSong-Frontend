import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import CustomText from '../text/CustomText';

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
            <CustomText style={tw`text-white text-sm mt-1`}>
              {playlistName}
            </CustomText>
            <CustomText style={tw`text-white text-sm mt-2`}>
              Playlist {'\u00B7'} {playlistLen} songs
            </CustomText>
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
