import React from 'react';
import {FlatList, View} from 'react-native';
import {SonglistEditItem} from '../item/SonglistEditItem';
import {KeepSong} from '../../types';

interface SonglistEditProps {
  songlistData: KeepSong[];
  onPressIn: (songNumber: number) => void;
  onPressOut: (songNumber: number) => void;
  isAllSelected: boolean; // 추가된 prop
  isAllDeleted: boolean;
}

const SonglistEdit: React.FC<SonglistEditProps> = ({
  songlistData,
  onPressIn,
  onPressOut,
  isAllSelected,
  isAllDeleted,
}) => {
  const renderItem = ({item}: {item: KeepSong}) => (
    <View>
      <SonglistEditItem
        key={item.songNumber}
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        isAllSelected={isAllSelected}
        isAllDeleted={isAllDeleted}
      />
    </View>
  );

  return <FlatList data={songlistData} renderItem={renderItem} />;
};

export {SonglistEdit};
