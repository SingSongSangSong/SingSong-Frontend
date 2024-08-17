import React from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import MusicIcon from '../../../assets/svg/music.svg';

type SongDefaultInfoProps = {
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
};
const SongDefaultInfo = ({
  songNumber,
  songName,
  singerName,
  album,
}: SongDefaultInfoProps) => {
  return (
    <View>
      <View style={tw`justify-center items-center overflow-hidden`}>
        <View style={tw`w-full h-30 bg-[${designatedColor.GRAY}]`} />
        <View style={tw`w-full h-30 bg-black`} />

        {!album || album == '' ? (
          <View
            style={tw`absolute top-5 w-50 h-50 bg-[${designatedColor.GRAY4}] rounded-lg justify-center items-center`}>
            <MusicIcon width={64} height={64} />
          </View>
        ) : (
          <View
            style={tw`absolute top-5 w-50 h-50 rounded-lg justify-center items-center`}>
            <Image
              source={{uri: album}}
              style={tw`w-50 h-50 rounded-md`}
              resizeMode="cover" // 이미지가 크기에 맞게 잘리도록 조정
            />
          </View>
        )}
      </View>
      <View style={tw`pt-6 px-3 `}>
        <View style={tw`flex-row items-center mt-3`}>
          <Text
            style={tw`flex-1 text-white text-2xl font-bold`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {songName}
          </Text>
        </View>

        <View style={tw`flex-row items-center mt-2`}>
          <View style={tw`items-center justify-center`}>
            <Text style={tw`text-white text-[${designatedColor.PINK2}]`}>
              {songNumber}
            </Text>
          </View>
          <Text
            style={tw`text-white mx-2`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {singerName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export {SongDefaultInfo};
