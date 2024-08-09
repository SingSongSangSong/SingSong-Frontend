import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {SonglistItem} from '..';
import {KeepSong} from '../../types';

interface SonglistProps {
  songlistData: KeepSong[];
  onPress: (songNumber: number, songId: number) => void;
}

const Songlist: React.FC<SonglistProps> = ({songlistData, onPress}) => {
  const renderItem = ({item}: {item: KeepSong}) => (
    <View>
      <SonglistItem
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        onPress={() => onPress(item.songNumber, item.songId)}
      />
    </View>
  );

  return <FlatList data={songlistData} renderItem={renderItem} />;
};

export {Songlist};
