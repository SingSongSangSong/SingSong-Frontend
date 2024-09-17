import React from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import MusicIcon from '../../../assets/svg/music.svg';
import {CommonTag} from '../../tag/CommonTag';
import CustomText from '../../text/CustomText';

type SongDefaultInfoProps = {
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
  isMr: boolean;
};
const SongDefaultInfo = ({
  songNumber,
  songName,
  singerName,
  album,
  isMr,
}: SongDefaultInfoProps) => {
  // console.log('songDefaultInfo');
  return (
    <View>
      <View style={tw`justify-center items-center overflow-hidden`}>
        <View style={tw`w-full h-40 bg-[${designatedColor.GRAY5}]`} />
        <View
          style={tw`w-full h-30 bg-[${designatedColor.BACKGROUND_BLACK}]`}
        />

        {!album || album == '' ? (
          <View
            style={tw`absolute w-50 h-50 bg-[${designatedColor.GRAY4}] rounded-lg justify-center items-center`}>
            <MusicIcon width={64} height={64} />
          </View>
        ) : (
          <View
            style={tw`absolute w-50 h-50 rounded-lg justify-center items-center`}>
            <Image
              source={{uri: album}}
              style={tw`w-50 h-50 rounded-md`}
              resizeMode="cover" // 이미지가 크기에 맞게 잘리도록 조정
            />
          </View>
        )}
      </View>
      <View style={tw`px-3 `}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`items-center`}>
            {isMr && <CommonTag name="MR" color={designatedColor.PURPLE} />}
          </View>

          <CustomText
            style={tw`flex-1 text-white text-2xl font-bold`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {songName}
          </CustomText>
        </View>

        <View style={tw`flex-row items-center mt-2`}>
          <View style={tw`items-center justify-center`}>
            <CustomText style={tw`text-white text-[${designatedColor.PINK2}]`}>
              {songNumber}
            </CustomText>
          </View>
          <CustomText
            style={tw`text-white mx-2`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {singerName}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

export {SongDefaultInfo};
