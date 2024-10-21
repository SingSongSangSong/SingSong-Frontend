import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CommonTag} from '../tag/CommonTag';
import CustomText from '../text/CustomText';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import {Song} from '../../types';
import CheckCircleIcon from '../../assets/svg/checkCircle.svg';
import PlusCircleIcon from '../../assets/svg/plusCircle.svg';
import usePostSongStore from '../../store/usePostSongStore';
import {logTrack} from '../../utils';

interface PostSearchSongItemProps {
  song: Song;
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  isKeep: boolean | undefined;
  isMr: boolean;
  isLive: boolean;
  melonLink?: string;
}

const PostSearchSongItem = ({
  song,
  songId,
  songNumber,
  songName,
  singerName,
  album = '',
  melonLink,
  isMr = false,
  isLive = false,
}: PostSearchSongItemProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const postSong = usePostSongStore(state => state.postSong);
  const addPostSong = usePostSongStore(state => state.addPostSong);
  const removePostSong = usePostSongStore(state => state.removePostSong);

  const _handleOnPressSearchSongAdd = () => {
    // console.log('SearchSongAdd');
    logTrack('post_song_search_add_button_click');
    addPostSong(song);
  };

  const _handleOnPressSearchSongRemove = () => {
    // console.log('SearchSongRemove');
    logTrack('post_song_search_remove_button_click');
    removePostSong(songId);
  };

  const handleOnPressSearchSong = () => {
    if (isPressed) {
      setIsPressed(!isPressed);
      _handleOnPressSearchSongRemove();
    } else {
      setIsPressed(!isPressed);
      _handleOnPressSearchSongAdd();
    }
  };

  useEffect(() => {
    const isSongInPost = postSong.some(song => song.songId === songId);
    setIsPressed(isSongInPost);
  }, [postSong, songId]);

  return (
    <View
      style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2`}>
      <View style={tw`flex-row flex-1`}>
        <View style={tw`items-center justify-center w-[12] h-[12]`}>
          {album == '' ? (
            <View
              style={tw`flex-1 w-full h-full bg-[${designatedColor.BLACK}] rounded-sm justify-center items-center`}>
              <WhiteLogoIcon width={43.2} height={30.4} />
            </View>
          ) : (
            <TouchableOpacity
              //   onPress={() => {
              //     setIsModalVisible(true);
              //   }
              // }
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
          <TouchableOpacity
            style={tw`p-2 mr-1`}
            onPress={handleOnPressSearchSong}>
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

export {PostSearchSongItem};
