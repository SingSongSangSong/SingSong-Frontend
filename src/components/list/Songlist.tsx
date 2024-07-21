import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {SonglistItem} from '..';
import {Song} from '../../types';

interface SonglistProps {
  songlistData: Song[];
}

const Songlist: React.FC<SonglistProps> = ({songlistData}) => {
  const renderItem = ({item}: {item: Song}) => (
    <View style={tw`m-2`}>
      <SonglistItem
        songNumber={item.song_number}
        songName={item.song_name}
        singerName={item.singer_name}
      />
    </View>
  );

  return (
    <FlatList data={songlistData} renderItem={renderItem} style={tw`mb-10`} />
  );
};

export {Songlist};
