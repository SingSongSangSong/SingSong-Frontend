import React from 'react';
import {Image, Text, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import MediumIcon from '../../assets/svg/medium.svg';
import UpIcon from '../../assets/svg/up.svg';
import DownIcon from '../../assets/svg/down.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomText from '../text/CustomText';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';

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
  disabled?: boolean;
  onPress?: () => void;
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
  disabled = true,
  onPress,
}: HotTrendingItemProps) => {
  // console.log(isMr);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1.0}
      disabled={disabled}
      // border border-[${designatedColor.GRAY4}] rounded-lg bg-[${designatedColor.GRAY5}]
      //
      style={tw`flex-row items-center p-2 mx-2 my-1 border-b-[0.5px] border-[${designatedColor.GRAY5}] rounded-lg bg-[${designatedColor.HOT_TRENDING_COLOR}]`}>
      <View style={tw`flex-1 mx-2`}>
        <View style={tw`flex-row items-center`}>
          <View style={tw`rounded-lg justify-center items-center`}>
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
          </View>
          <View style={tw`items-center mx-1`}>
            <CustomText
              style={tw`text-[${designatedColor.PINK}] text-lg font-bold w-10 text-center`}>
              {ranking}
            </CustomText>
            {rankingChange == 0 ? (
              <MediumIcon width={14} height={14} />
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
              {isNew && (
                <View
                  style={tw`border border-[${designatedColor.ORANGE}] rounded-sm py-0.4 px-1 mr-2`}>
                  <CustomText
                    style={tw`text-[${designatedColor.ORANGE}] text-xs`}>
                    NEW
                  </CustomText>
                </View>
              )}
              {isMr && (
                <View
                  style={tw`border border-[${designatedColor.PURPLE}] rounded-sm py-0.4 px-1 mr-2`}>
                  <CustomText
                    style={tw`text-[${designatedColor.PURPLE}] text-xs`}>
                    MR
                  </CustomText>
                </View>
              )}
              {isLive && (
                <View
                  style={tw`border border-[${designatedColor.RED2}] rounded-sm py-0.4 px-1 mr-2`}>
                  <CustomText
                    style={tw`text-[${designatedColor.RED2}] text-xs`}>
                    LIVE
                  </CustomText>
                </View>
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
                style={tw`text-[${designatedColor.PINK}] mr-2 text-[3]`}>
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
  );
};

export {HotTrendingItem};
