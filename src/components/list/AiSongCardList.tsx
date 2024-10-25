import React, {memo} from 'react';
import {View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {SongCard} from '..';
import {designatedColor} from '../../constants';
import {Song} from '../../types';
import CustomText from '../text/CustomText';

type AiSongCardListProps = {
  tag: string;
  onPress: () => void;
  data: Song[];
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => void;
  isShowed: boolean;
};

const AiSongCardList = ({
  tag,
  onPress,
  data,
  onSongPress,
  isShowed,
}: AiSongCardListProps) => {
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View style={[tw`w-full`, !isShowed && tw`bg-[#C4D7FF]`]}>
      <TouchableOpacity
        style={[tw`w-full px-2 px-8 pt-2 pb-2 py-4`]}
        onPress={() => onPress()}
        activeOpacity={1.0}>
        <View style={tw`w-full flex-row justify-between items-center`}>
          <CustomText
            style={tw`text-[${designatedColor.VIOLET}] text-lg font-bold`}>
            {tag}
          </CustomText>
          <TouchableOpacity
            onPress={() => onPress()}
            activeOpacity={0.8}
            style={tw`p-2`}>
            <CustomText
              style={[
                tw`text-[3] font-bold`,
                isShowed
                  ? tw`text-[${designatedColor.GRAY1}]`
                  : tw`text-[${designatedColor.BLACK}]`,
              ]}>
              보러가기
            </CustomText>
          </TouchableOpacity>
        </View>
        <CustomText
          style={
            isShowed
              ? tw`text-[${designatedColor.GRAY1}]`
              : tw`text-[${designatedColor.GRAY5}]`
          }>
          보관함에 저장된 노래를 기반으로 추천한 노래
        </CustomText>
      </TouchableOpacity>
      {isShowed && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`px-2`}
          snapToInterval={deviceWidth * 0.46}
          decelerationRate="fast">
          {data &&
            data.slice(0, 10).map((song, index) => (
              <SongCard
                key={`${tag}-${index}`} // 고유한 key 생성
                songNumber={song.songNumber}
                songName={song.songName}
                singerName={song.singerName}
                onSongPress={() =>
                  onSongPress(
                    song.songId,
                    song.songNumber,
                    song.songName,
                    song.singerName,
                    song.album,
                    song.melonLink || '',
                    song.isMr,
                    song.isLive || false,
                  )
                }
                album={song.album}
                melonLink={song.melonLink}
                isMr={song.isMr}
                isLive={song.isLive || false}
              />
            ))}
        </ScrollView>
      )}
    </View>
  );
};

// React.memo를 사용하여 SongCardList 컴포넌트를 메모이제이션하고 내보내기
export const MemoizedSongCardList = memo(AiSongCardList);
export {MemoizedSongCardList as AiSongCardList};
