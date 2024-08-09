import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import tw from 'twrnc';
import {RcdSonglistItem} from '..';
import {RcdRefreshSong} from '../../types';

interface RcdSonglistProps {
  RcdSonglistData: RcdRefreshSong[];
  handleOnPressSong: (songNumber: number, songId: number) => void;
  toggleAddStored: (songId: number) => void;
  toggleRemoveStored: (songId: number) => void;
  handleRefreshSongs: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  refreshing: boolean;
}

const RcdSonglist = ({
  RcdSonglistData,
  handleOnPressSong,
  toggleAddStored,
  toggleRemoveStored,
  handleRefreshSongs,
  onRefresh,
  isLoading,
  refreshing,
}: RcdSonglistProps) => {
  const renderItem = ({item}: {item: RcdRefreshSong}) => (
    <RcdSonglistItem
      key={item.songNumber}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      onPress={() => {
        handleOnPressSong(item.songNumber, item.songId);
      }}
      onAddPress={() => {}}
      onRemovePress={() => {}}
      showKeepIcon={true}
      onToggleAddStored={() => toggleAddStored(item.songId)}
      onToggleRemoveStored={() => toggleRemoveStored(item.songId)}
    />
  );

  return (
    <FlatList
      data={RcdSonglistData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      style={tw`h-[50%]`}
      contentContainerStyle={tw`flex-grow`}
      onEndReached={handleRefreshSongs}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoading ? (
          <View style={tw`py-10`}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export {RcdSonglist};
