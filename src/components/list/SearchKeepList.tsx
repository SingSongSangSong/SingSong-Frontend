import React from 'react';
import {FlatList, View} from 'react-native';
import {Song} from '../../types';
import {SearchKeepItem} from '..';
import tw from 'twrnc';

interface SearchKeepListProps {
  songData: Song[];
  // onSongAddPress: (
  //   songId: number,
  //   songNumber: number,
  //   songName: string,
  //   singerName: string,
  //   album: string,
  //   melonLink: string,
  //   isMr: boolean,
  //   isLive: boolean,
  // ) => void;
}

const SearchKeepList = ({songData}: SearchKeepListProps) => {
  const renderItem = ({item}: {item: Song}) => (
    // <View>
    <SearchKeepItem
      song={item}
      songId={item.songId}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      album={item.album}
      melonLink={item.melonLink || ''}
      isMr={item.isMr}
      isLive={item.isLive || false}
      // onSongAddPress={() =>
      //   onSongAddPress(
      //     item.songId,
      //     item.songNumber,
      //     item.songName,
      //     item.singerName,
      //     item.album,
      //     item.melonLink || '',
      //     item.isMr,
      //     item.isLive || false,
      //   )
      // }
    />
    // </View>
  );

  return (
    <View style={tw`flex-1 w-full`}>
      <FlatList data={songData} renderItem={renderItem} />
    </View>
  );
};

export {SearchKeepList};
