import React, {RefObject, useState} from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import MediumIcon from '../../assets/svg/medium.svg';
import UpIcon from '../../assets/svg/up.svg';
import DownIcon from '../../assets/svg/down.svg';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomText from '../text/CustomText';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import {CommonTag, CustomModal} from '..';

type HotTrendingItemProps = {
  artistName: string;
  isMr: boolean;
  isNew: boolean;
  ranking: number;
  rankingChange: number;
  songName: string;
  songNumber: number;
  isLive: boolean;
  album: string;
  melonLink: string;
  disabled?: boolean;
  onPress?: () => void;
  isScrollingHome: RefObject<View>;
};

const HotTrendingItem = ({
  artistName,
  isMr,
  isNew,
  ranking,
  rankingChange,
  songName,
  songNumber,
  isLive,
  album,
  melonLink,
  disabled = true,
  onPress,
  isScrollingHome,
}: HotTrendingItemProps) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1.0}
        ref={isScrollingHome}
        disabled={disabled}
        style={tw`flex-row items-center p-2 mx-2 my-1 border-b-[0.5px] border-[${designatedColor.GRAY5}] rounded-lg bg-[${designatedColor.HOT_TRENDING_COLOR}]`}>
        <View style={tw`flex-1 mx-2`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              onPress={() => {
                if (album && album != '') {
                  setIsModalVisible(true);
                }
              }}
              style={tw`rounded-lg justify-center items-center`}
              activeOpacity={1.0}>
              {!album || album == '' ? (
                <View
                  style={tw`w-12 h-12 bg-[${designatedColor.BACKGROUND_BLACK}] rounded-lg justify-center items-center`}>
                  <WhiteLogoIcon width={54} height={38} />
                </View>
              ) : (
                <Image
                  source={{uri: album}}
                  style={tw`w-12 h-12 rounded-md`}
                  resizeMode="cover" // 이미지가 크기에 맞게 잘리도록 조정
                />
              )}
              {/* <View
                style={tw`w-12 h-12 bg-[${designatedColor.BACKGROUND_BLACK}] rounded-lg justify-center items-center`}>
                <WhiteLogoIcon width={54} height={38} />
              </View> */}
              {/* <View
                style={tw`w-12 h-12 bg-[${designatedColor.BACKGROUND_BLACK}] rounded-lg justify-center items-center`}>
                <WhiteLogoIcon width={54} height={38} />
              </View> */}
            </TouchableOpacity>
            {/* </View> */}
            <View style={tw`items-center mx-1`}>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET}] text-lg font-bold w-10 text-center`}>
                {ranking}
              </CustomText>
              {rankingChange == 0 ? (
                <>
                  {isNew ? (
                    <UpIcon width={14} height={14} />
                  ) : (
                    <MediumIcon width={14} height={14} />
                  )}
                </>
              ) : (
                <>
                  {rankingChange < 0 ? (
                    <DownIcon width={14} height={14} />
                  ) : (
                    <UpIcon width={14} height={14} />
                  )}
                </>
              )}
            </View>
            <View style={tw`flex-1`}>
              <View style={tw`flex-row mb-1 items-center`}>
                {isNew && <CommonTag name="NEW" color={designatedColor.MINT} />}
                {isMr && <CommonTag name="MR" color={designatedColor.PURPLE} />}
                {isLive && (
                  <CommonTag name="LIVE" color={designatedColor.ORANGE} />
                )}
                <CustomText
                  style={tw`text-white flex-1`}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {songName}
                </CustomText>
              </View>
              <View style={tw`flex-row items-center`}>
                <CustomText
                  style={tw`text-[${designatedColor.VIOLET2}] mr-2 text-[3]`}>
                  {songNumber}
                </CustomText>
                <CustomText
                  style={tw`text-[${designatedColor.GRAY3}] flex-1 text-[3]`} // flex-1을 추가하여 가로 확장을 제한
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {artistName}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {album && album != '' && (
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

export {HotTrendingItem};
