import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Song} from '../../types';
import {SonglistEditItem} from '../item/SonglistEditItem';

interface SonglistEditProps {
  songlistData: Song[];
}

const SonglistEdit: React.FC<SonglistEditProps> = ({songlistData}) => {
  const renderItem = ({item}: {item: Song}) => (
    <View style={tw`m-2`}>
      <SonglistEditItem
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
      />
    </View>
  );

  return (
    <FlatList data={songlistData} renderItem={renderItem} style={tw`mb-10`} />
  );
};

export {SonglistEdit};
