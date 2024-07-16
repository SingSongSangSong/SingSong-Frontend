import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {PlaylistItem} from '..';

interface PlaylistItem {
  id: string;
  name: string;
  length: string;
}

interface PlaylistProps {
  playlistData: PlaylistItem[];
  onPlayPress: (playlistId: string) => void;
}

const Playlist: React.FC<PlaylistProps> = ({playlistData, onPlayPress}) => {
  const renderItem = ({item}: {item: PlaylistItem}) => (
    <View style={tw`m-2`}>
      <PlaylistItem
        playlistName={item.name}
        playlistLen={item.length}
        onPress={() => onPlayPress(item.id)}
      />
    </View>
  );

  return (
    <FlatList
      data={playlistData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export {Playlist};
