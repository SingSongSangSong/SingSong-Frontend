import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {SonglistItem} from '..';
import {KeepSong} from '../../types';

interface SonglistProps {
  songlistData: KeepSong[];
}

const Songlist: React.FC<SonglistProps> = ({songlistData}) => {
  const renderItem = ({item}: {item: KeepSong}) => (
    <View style={tw`m-2`}>
      <SonglistItem
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

export {Songlist};
