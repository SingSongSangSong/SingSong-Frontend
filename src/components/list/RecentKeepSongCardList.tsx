import React, {memo} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {SongCard} from '..';
import {Song} from '../../types';

type RecentKeepSongCardListProps = {
  //   tag: string;
  //   onPress: () => void;
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
};

const RecentKeepSongCardList = ({
  data,
  onSongPress,
}: RecentKeepSongCardListProps) => {
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View style={tw`w-full mx-2 mb-2`}>
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
              key={index} // 고유한 key 생성
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
    </View>
  );
};

// React.memo를 사용하여 SongCardList 컴포넌트를 메모이제이션하고 내보내기
export const RecentMemoizedSongCardList = memo(RecentKeepSongCardList);
export {RecentMemoizedSongCardList as RecentKeepSongCardList};
