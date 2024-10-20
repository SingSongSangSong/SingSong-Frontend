import React from 'react';
import {FlatList, View} from 'react-native';
import {Song} from '../../types';
import {PostSearchSongItem} from '..';

interface PostSearchSongsListProps {
  songData: Song[];
}

const PostSearchSongsList = ({songData}: PostSearchSongsListProps) => {
  const renderItem = ({item}: {item: Song}) => (
    <View>
      <PostSearchSongItem
        song={item}
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        album={item.album}
        melonLink={item.melonLink}
        isKeep={item.isKeep}
        isMr={item.isMr}
        isLive={item.isLive || false}
      />
    </View>
  );

  return <FlatList data={songData} renderItem={renderItem} />;
};

export {PostSearchSongsList};
