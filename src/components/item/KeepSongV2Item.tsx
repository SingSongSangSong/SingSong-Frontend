import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import CustomText from '../text/CustomText';
import {CommonTag} from '..';

interface KeepSongV2ItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
  melonLink: string;
  isMr: boolean;
  isLive: boolean;
  onSongPress: () => void;
}

const KeepSongV2Item = ({
  songId,
  songNumber,
  songName,
  singerName,
  album,
  melonLink,
  isMr,
  isLive,
  onSongPress,
}: KeepSongV2ItemProps) => {
  return (
    <>
      <TouchableOpacity onPress={onSongPress} activeOpacity={0.9}>
        <View
          style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2`}>
          <View style={tw`flex-row flex-1`}>
            <View style={tw`items-center justify-center w-[12] h-[12]`}>
              {album == '' ? (
                // <View
                //   style={[
                //     {
                //       backgroundColor: 'rgba(0, 0, 0, 1)',
                //       width: 54,
                //       height: 54,
                //     },
                //     tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY3}]`,
                //   ]}>
                //   <MusicIcon width={16} height={16} />
                // </View>
                <View
                  style={tw`flex-1 w-full h-full bg-[${designatedColor.BLACK}] rounded-sm justify-center items-center`}>
                  <WhiteLogoIcon width={43.2} height={30.4} />
                </View>
              ) : (
                <View style={tw`w-[12] h-[12]`}>
                  <Image
                    source={{uri: album}}
                    style={tw`w-full h-full rounded-sm`}
                  />
                </View>
              )}
            </View>

            <View style={tw`flex-1 h-full ml-4 mr-2`}>
              <View style={tw`flex-row items-center`}>
                <CustomText
                  style={tw`text-white text-sm text-[${designatedColor.VIOLET}] mr-1`}>
                  {songNumber}
                </CustomText>
                {isMr && <CommonTag name="MR" color={designatedColor.PURPLE} />}
                {isLive && (
                  <CommonTag name="LIVE" color={designatedColor.ORANGE} />
                )}
                <CustomText
                  style={tw`text-white text-sm flex-1`}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {songName}
                </CustomText>
              </View>
              <CustomText
                style={tw`text-white text-sm mt-1 flex-1 text-[${designatedColor.GRAY2}]`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {singerName}
              </CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export {KeepSongV2Item};
