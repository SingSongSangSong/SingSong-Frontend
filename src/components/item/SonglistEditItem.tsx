import React from 'react';
import {View, Text, Image} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CircleButton} from '..';

interface SonglistEditItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onPressIn: (songNumber: number) => void;
  onPressOut: (songNumber: number) => void;
}

const SonglistEditItem = ({
  songNumber,
  songName,
  singerName,
  onPressIn,
  onPressOut,
}: SonglistEditItemProps) => {
  return (
    <View>
      <View style={tw`flex-row`}>
        <View style={tw`mr-4 justify-center items-center`}>
          <CircleButton
            onPressIn={() => onPressIn(songNumber)}
            onPressOut={() => onPressOut(songNumber)}
          />
        </View>

        <Image
          source={{
            uri: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/dCyJyeNJ50BMG489LQg9cokHUpk.jpg',
          }}
          // style={styles.image}
          style={tw`w-12 h-12 rounded-sm`}
        />
        <View style={tw`h-full ml-4`}>
          <View style={tw`flex-row`}>
            <Text
              style={tw`text-white text-sm mr-2 text-[${designatedColor.GREEN}] items-center justify-center font-bold`}>
              {songNumber}
            </Text>
            <Text style={tw`text-white text-sm`}>{songName}</Text>
          </View>

          <Text
            style={tw`text-white text-sm mt-1 text-[${designatedColor.DARK_GRAY}]`}>
            {singerName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export {SonglistEditItem};
