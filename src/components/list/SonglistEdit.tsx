import React from 'react';
import {FlatList, View} from 'react-native';
import {SonglistEditItem} from '../item/SonglistEditItem';
import {Song} from '../../types';

interface SonglistEditProps {
  songlistData: Song[];
  onPressIn: (songNumber: number) => void;
  onPressOut: (songNumber: number) => void;
  isAllSelected: boolean; // 추가된 prop
  isAllDeleted: boolean;
}

const SonglistEdit = ({
  songlistData,
  onPressIn,
  onPressOut,
  isAllSelected,
  isAllDeleted,
}: SonglistEditProps) => {
  const renderItem = ({item}: {item: Song}) => (
    <View>
      <SonglistEditItem
        key={item.songNumber}
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        album={item.album}
        melonLink={item.melonLink}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        isAllSelected={isAllSelected}
        isAllDeleted={isAllDeleted}
        isMr={item.isMr}
        isLive={item.isLive}
      />
    </View>
  );

  return <FlatList data={songlistData} renderItem={renderItem} />;
};

export {SonglistEdit};
