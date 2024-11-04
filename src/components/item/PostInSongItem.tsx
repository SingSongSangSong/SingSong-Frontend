import React, {useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CommonTag} from '../tag/CommonTag';
import CustomText from '../text/CustomText';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import CheckCircleIcon from '../../assets/svg/checkCircle.svg';
import usePostSongStore from '../../store/usePostSongStore';
import {Song} from '../../types';

interface PostInSongItemProps {
  song: Song;
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
  melonLink: string;
  isMr: boolean;
  isLive: boolean;
  // onSongAddPress: () => void;
}

const PostInSongItem = ({
  song,
  songId,
  songNumber,
  songName,
  singerName,
  album = '',
  melonLink,
  isMr = false,
  isLive = false,
}: // onSongAddPress,
PostInSongItemProps) => {
  const removePostSong = usePostSongStore(state => state.removePostSong);

  const _handleOnPressKeepRemove = () => {
    // console.log('KeepRemove');
    removePostSong(songId);
  };

  const handleOnPressRemove = () => {
    _handleOnPressKeepRemove();
  };
  // console.log('song', song);

  return (
    <View
      style={tw`w-full flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2`}>
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
            <TouchableOpacity
              // onPress={() => {
              //   setIsModalVisible(true);
              // }}
              style={tw`w-[12] h-[12]`}
              activeOpacity={1.0}>
              <Image
                source={{uri: album}}
                style={tw`w-full h-full rounded-sm`}
              />
            </TouchableOpacity>
          )}
          {/* <View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    width: 54,
                    height: 54,
                  },
                  tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY5}]`,
                ]}>
                <WhiteLogoIcon width={54} height={38} />
              </View> */}
          {/* <View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    width: 54,
                    height: 54,
                  },
                  tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY5}]`,
                ]}>
                <WhiteLogoIcon width={54} height={38} />
              </View> */}
        </View>

        <View style={tw`flex-1 h-full ml-4 mr-2`}>
          <View style={tw`flex-row items-center`}>
            <CustomText
              style={tw`text-white text-sm text-[${designatedColor.VIOLET}] mr-1`}>
              {songNumber}
            </CustomText>
            {isMr && <CommonTag name="MR" color={designatedColor.PURPLE} />}
            {isLive && <CommonTag name="LIVE" color={designatedColor.ORANGE} />}
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
        <View style={tw`items-center justify-center`}>
          <TouchableOpacity style={tw`p-2 mr-1`} onPress={handleOnPressRemove}>
            {/* {isPressed ? ( */}
            <CheckCircleIcon width={30} height={30} />
            {/* ) : (
              <PlusCircleIcon width={30} height={30} />
            )} */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {PostInSongItem};
