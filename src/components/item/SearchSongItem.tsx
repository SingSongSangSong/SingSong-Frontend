import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import KeepIcon from '../../assets/svg/keepIcon.svg';
import KeepFilledIcon from '../../assets/svg/keepFilledIcon.svg';
import MusicIcon from '../../assets/svg/music.svg';
import {useFocusEffect} from '@react-navigation/native';
import {CommonTag} from '../tag/CommonTag';

interface SearchSongItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  isKeep: boolean | undefined;
  isMr?: boolean;
  isShowKeepIcon: boolean;
  onSongPress: () => void;
  onKeepAddPress?: () => void | undefined;
  onKeepRemovePress?: () => void | undefined;
}

const SearchSongItem = ({
  songId,
  songNumber,
  songName,
  singerName,
  album = '',
  isKeep = true,
  isShowKeepIcon,
  isMr = false,
  onSongPress,
  onKeepAddPress = () => {},
  onKeepRemovePress = () => {},
}: SearchSongItemProps) => {
  const [isKeepPressed, setIsKeepPressed] = useState(isKeep);
  const [isPressed, setIsPressed] = useState(false);

  // 포커스가 돌아올 때마다 isPressed 초기화
  useFocusEffect(
    useCallback(() => {
      setIsPressed(false);
    }, []),
  );

  const handleOnKeepPress = () => {
    if (isKeepPressed) {
      onKeepRemovePress();
      setIsKeepPressed(!isKeepPressed);
    } else {
      onKeepAddPress();
      setIsKeepPressed(!isKeepPressed);
    }
  };

  const handleOnPress = () => {
    if (!isPressed) {
      setIsPressed(true);
      onSongPress();
    }
  };

  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={0.9}>
      <View
        style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2`}>
        <View style={tw`flex-row flex-1`}>
          <View style={tw`items-center justify-center w-[12] h-[12]`}>
            {album == '' ? (
              <View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    width: 54,
                    height: 54,
                  },
                  tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY3}]`,
                ]}>
                <MusicIcon width={16} height={16} />
              </View>
            ) : (
              <Image
                source={{uri: album}}
                style={tw`w-full h-full rounded-sm`}
              />
            )}
          </View>

          <View style={tw`flex-1 h-full ml-4 mr-2`}>
            <View style={tw`flex-row items-center`}>
              <Text
                style={tw`text-white text-sm text-[${designatedColor.PINK2}]`}>
                {songNumber}
              </Text>
              {isMr ? (
                <CommonTag name="MR" color={designatedColor.PURPLE} />
              ) : (
                <View style={tw`mx-1`} />
              )}
              <Text
                style={tw`text-white text-sm flex-1`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {songName}
              </Text>
            </View>
            <Text
              style={tw`text-white text-sm mt-1 flex-1 text-[${designatedColor.GRAY2}]`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {singerName}
            </Text>
          </View>
        </View>
        <View>
          {isShowKeepIcon && (
            <TouchableOpacity
              onPress={handleOnKeepPress}
              activeOpacity={0.8}
              style={tw`p-2`}>
              {isKeepPressed ? (
                <KeepFilledIcon width={20} height={20} />
              ) : (
                <KeepIcon width={20} height={20} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {SearchSongItem};
