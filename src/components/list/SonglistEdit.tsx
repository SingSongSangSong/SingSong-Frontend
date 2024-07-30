import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {SonglistEditItem} from '../item/SonglistEditItem';
import {KeepSong} from '../../types';

interface SonglistEditProps {
  songlistData: KeepSong[];
  onPressIn: (songNumber: number) => void;
  onPressOut: (songNumber: number) => void;
}

const SonglistEdit: React.FC<SonglistEditProps> = ({
  songlistData,
  onPressIn,
  onPressOut,
}) => {
  const renderItem = ({item}: {item: KeepSong}) => (
    <View style={tw`m-2`}>
      <SonglistEditItem
        key={item.songNumber}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
    </View>
  );

  return (
    <FlatList data={songlistData} renderItem={renderItem} style={tw`mb-10`} />
  );
};

export {SonglistEdit};
