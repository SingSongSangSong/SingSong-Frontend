import React from 'react';
import {FlatList, View} from 'react-native';
import {Song} from '../../types';
import {KeepAdditionSongItem} from '..';

interface KeepAdditionSongsListProps {
  songData: Song[];
}

const KeepAdditionSongsList = ({songData}: KeepAdditionSongsListProps) => {
  const renderItem = ({item}: {item: Song}) => (
    <View>
      <KeepAdditionSongItem
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

export {KeepAdditionSongsList};
