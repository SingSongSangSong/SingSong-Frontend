import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import MediumIcon from '../../assets/svg/medium.svg';
import UpIcon from '../../assets/svg/up.svg';
import DownIcon from '../../assets/svg/down.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

type HotTrendingItemProps = {
  artistName: string;
  isMr: number;
  isNew: string;
  ranking: number;
  rankingChange: number;
  songName: string;
  songNumber: number;
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
  onPress,
}: HotTrendingItemProps) => {
  // console.log(isMr);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      // border border-[${designatedColor.GRAY4}] rounded-lg bg-[${designatedColor.GRAY5}]
      //
      style={tw`flex-row items-center p-2 mx-2 my-1 border-b-[0.5px] border-[${designatedColor.GRAY5}] rounded-lg bg-[${designatedColor.HOT_TRENDING_COLOR}]`}>
      <Text
        style={tw`text-[${designatedColor.PINK}] text-lg font-bold w-10 text-center`}>
        {ranking}
      </Text>
      {rankingChange == 0 ? (
        <MediumIcon width={14} height={14} />
      ) : (
        <>
          {rankingChange > 0 ? (
            <DownIcon width={14} height={14} />
          ) : (
            <UpIcon width={14} height={14} />
          )}
        </>
      )}
      <View style={tw`flex-1 mx-4`}>
        <View style={tw`flex-row mb-1 items-center`}>
          {isNew == 'new' && (
            <View
              style={tw`border border-[${designatedColor.ORANGE}] rounded-sm py-0.4 px-1 mr-2`}>
              <Text style={tw`text-[${designatedColor.ORANGE}] text-xs`}>
                NEW
              </Text>
            </View>
          )}
          {isMr == 1 && (
            <View
              style={tw`border border-[${designatedColor.PURPLE}] rounded-sm py-0.4 px-1 mr-2`}>
              <Text style={tw`text-[${designatedColor.PURPLE}] text-xs`}>
                MR
              </Text>
            </View>
          )}
          <Text
            style={tw`text-white flex-1`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {songName}
          </Text>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-[${designatedColor.PINK}] mr-2`}>
            {songNumber}
          </Text>
          <Text
            style={tw`text-[${designatedColor.GRAY3}] flex-1`} // flex-1을 추가하여 가로 확장을 제한
            numberOfLines={1}
            ellipsizeMode="tail">
            {artistName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {HotTrendingItem};
