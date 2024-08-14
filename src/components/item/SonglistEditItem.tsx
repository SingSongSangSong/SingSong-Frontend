import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CircleButton} from '..';
import MusicIcon from '../../assets/svg/music.svg';

interface SonglistEditItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  onPressIn: (songNumber: number) => void;
  onPressOut: (songNumber: number) => void;
  isAllSelected: boolean;
  isAllDeleted: boolean;
}

const SonglistEditItem = ({
  songId,
  songNumber,
  songName,
  singerName,
  album = '',
  onPressIn,
  onPressOut,
  isAllSelected,
  isAllDeleted,
}: SonglistEditItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isAllSelected) {
      setIsSelected(true);
    }
    if (isAllDeleted) {
      setIsSelected(false);
    }
  }, [isAllSelected, isAllDeleted]);

  const handleOnPress = () => {
    if (!isSelected) {
      setIsSelected(true);
      onPressIn(songId);
    } else {
      setIsSelected(false);
      onPressOut(songId);
    }
  };

  const handleOnPressIn = () => {
    setIsSelected(true);
    onPressIn(songId);
  };

  const handleOnPressOut = () => {
    setIsSelected(false);
    onPressOut(songId);
  };

  return (
    <TouchableOpacity onPress={() => handleOnPress()} activeOpacity={0.8}>
      <View
        style={tw`flex-row items-center border-b border-[${designatedColor.GRAY4}] py-3 px-2 mx-2`}>
        <View style={tw`mr-4 justify-center items-center`}>
          <CircleButton
            onPressIn={() => handleOnPressIn()}
            onPressOut={() => handleOnPressOut()}
            isSelected={isSelected}
            isDeleted={!isSelected}
          />
        </View>

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
            <Image source={{uri: album}} style={tw`w-full h-full rounded-sm`} />
          )}
        </View>

        <View style={tw`flex-1 h-full ml-4 mr-2`}>
          <View style={tw`flex-row items-center`}>
            <Text
              style={tw`text-white text-sm text-[${designatedColor.PINK2}]`}>
              {songNumber}
            </Text>
            <Text
              style={tw`text-white text-sm ml-2 flex-1`}
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
    </TouchableOpacity>
  );
};

export {SonglistEditItem};
