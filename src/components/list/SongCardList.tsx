import React, {memo} from 'react';
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import {RcdHomeSong} from '../../types';
import {SongCard} from '..';
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
    <View style={tw`w-full mx-2 mt-2 my-2`}>
      <View
        style={tw`flex-row justify-between px-2 items-center px-8 mt-2 mb-6 my-4 py-4  border-t-[1px] border-[${designatedColor.GRAY4}]`}>
        <Text style={tw`text-white text-sm font-bold`}>{tag}</Text>
        <TouchableOpacity
          onPress={() => onPress(tag)}
          activeOpacity={0.8}
          style={tw`p-2`}>
          <Text style={tw`text-[${designatedColor.GRAY3}] text-[3]`}>
            전체보기
          </Text>
        </TouchableOpacity>
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

// React.memo를 사용하여 SongCardList 컴포넌트를 메모이제이션하고 내보내기
export const MemoizedSongCardList = memo(SongCardList);
export {MemoizedSongCardList as SongCardList};
