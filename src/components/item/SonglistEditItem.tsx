import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CircleButton} from '..';

interface SonglistEditItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
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
    <TouchableOpacity onPress={() => handleOnPress()}>
      <View
        style={tw`flex-row border-b border-[${designatedColor.GRAY4}] mx-2 p-2`}>
        <View style={tw`mr-4 justify-center items-center`}>
          <CircleButton
            onPressIn={() => handleOnPressIn()}
            onPressOut={() => handleOnPressOut()}
            isSelected={isSelected}
            isDeleted={!isSelected}
          />
        </View>

        {/* <Image
          source={{
            uri: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/dCyJyeNJ50BMG489LQg9cokHUpk.jpg',
          }}
          // style={styles.image}
          style={tw`w-12 h-12 rounded-sm`}
        /> */}

        <View style={tw`h-full ml-2`}>
          <View style={tw`flex-row items-center`}>
            <Text
              style={tw`text-white text-sm mr-2 text-[${designatedColor.GREEN}] items-center justify-center font-bold`}>
              {songNumber}
            </Text>
            <View style={tw`ml-2`}>
              <Text style={tw`text-white text-sm`}>{songName}</Text>
              <Text
                style={tw`text-white text-sm mt-1 text-[${designatedColor.DARK_GRAY}]`}>
                {singerName}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {SonglistEditItem};
