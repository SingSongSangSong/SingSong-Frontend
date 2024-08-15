import React from 'react';
import {View, ScrollView, Text, Dimensions} from 'react-native';
import tw from 'twrnc';
import {RcdHomeSong} from '../../types';
import {SongCard, TextButton} from '..';
import {designatedColor} from '../../constants';

type SongCardListProps = {
  tag: string;
  onPress: (tag: string) => void;
  data: RcdHomeSong[];
  onSongPress: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
  ) => void;
};

const SongCardList = ({tag, onPress, data, onSongPress}: SongCardListProps) => {
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View
      style={tw`w-full mt-2 border-b border-[${designatedColor.GRAY4}] my-2 py-4`}>
      <View
        style={tw`flex-row justify-between px-2 items-center px-4 mt-2 mb-6`}>
        <Text style={tw`text-white text-sm font-bold`}>{tag}</Text>
        <TextButton
          title="전체보기"
          onPress={() => onPress(tag)}
          color={designatedColor.GRAY3}
          size={3}
        />
      </View>

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
                  song.songNumber,
                  song.songId,
                  song.songName,
                  song.singerName,
                  song.album,
                )
              }
              album={song.album}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export {SongCardList};
