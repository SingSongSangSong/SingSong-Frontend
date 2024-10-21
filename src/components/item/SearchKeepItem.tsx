import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CommonTag} from '../tag/CommonTag';
import CustomText from '../text/CustomText';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import CheckCircleIcon from '../../assets/svg/checkCircle.svg';
import PlusCircleIcon from '../../assets/svg/plusCircle.svg';
import usePostSongStore from '../../store/usePostSongStore';
import {Song} from '../../types';
import {logTrack} from '../../utils';

interface SearchKeepItemProps {
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

const SearchKeepItem = ({
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
SearchKeepItemProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const postSong = usePostSongStore(state => state.postSong);
  const addPostSong = usePostSongStore(state => state.addPostSong);
  const removePostSong = usePostSongStore(state => state.removePostSong);

  const _handleOnPressKeepAdd = () => {
    // console.log('KeepAdd');
    logTrack('post_song_keep_add_button_click');
    addPostSong(song);
  };

  const _handleOnPressKeepRemove = () => {
    // console.log('KeepRemove');
    logTrack('post_song_keep_remove_button_click');
    removePostSong(songId);
  };

  const handleOnPressKeep = () => {
    if (isPressed) {
      setIsPressed(!isPressed);
      _handleOnPressKeepRemove();
    } else {
      setIsPressed(!isPressed);
      _handleOnPressKeepAdd();
    }

    // onSongAddPress();
  };
  useEffect(() => {
    const isSongInPost = postSong.some(song => song.songId === songId);
    setIsPressed(isSongInPost);
  }, [postSong, songId]);

  return (
    <View
      style={tw`w-full flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2`}>
      <View style={tw`flex-row flex-1`}>
        <View style={tw`items-center justify-center w-[12] h-[12]`}>
          {album == '' ? (
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
          <TouchableOpacity style={tw`p-2 mr-1`} onPress={handleOnPressKeep}>
            {isPressed ? (
              <CheckCircleIcon width={30} height={30} />
            ) : (
              <PlusCircleIcon width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {SearchKeepItem};
