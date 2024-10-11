import React, {memo} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {NewSong} from '../../types';
import {NewSongCard} from '..';

type NewSongCardListProps = {
  //   tag: string;
  //   onPress: () => void;
  data: NewSong[];
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

const NewSongCardList = ({
  //   tag,
  //   onPress,
  data,
  onSongPress,
}: NewSongCardListProps) => {
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
            <NewSongCard
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
              isRecentlyUpdated={song.isRecentlyUpdated}
            />
          ))}
      </ScrollView>
    </View>
  );
};

// React.memo를 사용하여 SongCardList 컴포넌트를 메모이제이션하고 내보내기
export const NewMemoizedSongCardList = memo(NewSongCardList);
export {NewMemoizedSongCardList as NewSongCardList};
