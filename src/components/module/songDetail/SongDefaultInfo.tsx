import React, {useState} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import MusicIcon from '../../../assets/svg/music.svg';
import {CommonTag} from '../../tag/CommonTag';
import CustomText from '../../text/CustomText';
import {CustomModal} from '../..';
import WhiteLogoIcon from '../../../assets/svg/whiteLogo.svg';

type SongDefaultInfoProps = {
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
  melonLink: string;
  isMr: boolean;
};
const SongDefaultInfo = ({
  songNumber,
  songName,
  singerName,
  album,
  melonLink,
  isMr,
}: SongDefaultInfoProps) => {
  // console.log('songDefaultInfo');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <View>
      <View style={tw`justify-center items-center overflow-hidden`}>
        <View style={tw`w-full h-40 bg-[${designatedColor.GRAY5}]`} />
        <View
          style={tw`w-full h-30 bg-[${designatedColor.BACKGROUND_BLACK}]`}
        />
        {/*
        <View
          style={tw`absolute w-50 h-50 bg-[${designatedColor.BACKGROUND_GRAY}] rounded-lg justify-center items-center border border-[${designatedColor.GRAY5}]`}>
          <WhiteLogoIcon width={108} height={76} />
        </View> */}

        {!album || album == '' ? (
          <View
            style={tw`absolute w-50 h-50 bg-[${designatedColor.GRAY4}] rounded-lg justify-center items-center`}>
            <MusicIcon width={64} height={64} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
            }}
            style={tw`absolute w-50 h-50 rounded-lg justify-center items-center`}
            activeOpacity={1.0}>
            <Image
              source={{uri: album}}
              style={tw`w-50 h-50 rounded-md`}
              resizeMode="cover" // 이미지가 크기에 맞게 잘리도록 조정
            />
          </TouchableOpacity>
        )}
        {/* <View
          style={tw`absolute w-50 h-50 bg-[${designatedColor.BACKGROUND_GRAY}] rounded-lg justify-center items-center border border-[${designatedColor.GRAY5}]`}>
          <WhiteLogoIcon width={108} height={76} />
        </View> */}
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
            <CustomText style={tw`text-white text-[${designatedColor.VIOLET}]`}>
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
    </View>
  );
};

export {SongDefaultInfo};
