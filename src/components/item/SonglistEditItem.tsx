import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CircleButton, CustomModal} from '..';
import MusicIcon from '../../assets/svg/music.svg';
import CustomText from '../text/CustomText';

interface SonglistEditItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  melonLink?: string;
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
  melonLink,
}: SonglistEditItemProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
    <>
      <TouchableOpacity onPress={() => handleOnPress()} activeOpacity={0.8}>
        <View
          style={tw`flex-row items-center border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2`}>
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
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(true);
                }}
                activeOpacity={1.0}
                style={tw`w-[12] h-[12]`}>
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
                style={tw`text-white text-sm text-[${designatedColor.VIOLET}]`}>
                {songNumber}
              </CustomText>
              <CustomText
                style={tw`text-white text-sm ml-2 flex-1`}
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
      </TouchableOpacity>
      {album && album != '' && melonLink && (
        <CustomModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}
          message="해당 노래에 대한 가사를 볼 수 있는 외부 링크로 이동하게 됩니다. 이동하시겠습니까?"
          onConfirm={() => {
            Linking.openURL(melonLink);
          }}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          confirmText="확인"
          cancelText="취소"
        />
      )}
    </>
  );
};

export {SonglistEditItem};
