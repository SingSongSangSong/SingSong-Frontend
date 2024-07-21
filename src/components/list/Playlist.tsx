import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {PlaylistItem} from '..';
import {PlaylistInfo} from '../../types';

interface PlaylistProps {
  playlistData: PlaylistInfo[];
  onPlayPress: (playlistId: string, songCount: number) => void;
}

const Playlist: React.FC<PlaylistProps> = ({playlistData, onPlayPress}) => {
  const renderItem = ({item}: {item: PlaylistInfo}) => (
    <View style={tw`m-2`}>
      <PlaylistItem
        playlistName={item.playlistName}
        playlistLen={item.songCount}
        onPress={() => onPlayPress(item.playlistName, item.songCount)}
      />
    </View>
  );

  return (
    <FlatList
      data={playlistData}
      renderItem={renderItem}
      keyExtractor={item => item.playlistName}
    />
  );
};

export {Playlist};
