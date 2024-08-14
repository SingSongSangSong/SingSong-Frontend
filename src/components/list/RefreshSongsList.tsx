import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import tw from 'twrnc';
import {SongItem} from '..';
import {Song} from '../../types';

interface RefreshSongsListProps {
  songlistData: Song[];
  isShowKeepIcon: boolean | undefined;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => void;
  onKeepAddPress: (songId: number) => void;
  onKeepRemovePress: (songId: number) => void;
  handleRefreshSongs: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  refreshing: boolean;
}

const RefreshSongsList = ({
  songlistData,
  isShowKeepIcon = false,
  onSongPress,
  onKeepAddPress,
  onKeepRemovePress,
  handleRefreshSongs,
  onRefresh,
  isLoading,
  refreshing,
}: RefreshSongsListProps) => {
  const renderItem = ({item}: {item: Song}) => (
    <SongItem
      key={item.songNumber}
      songId={item.songId}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      album={item.album}
      isKeep={item.isKeep}
      isShowKeepIcon={isShowKeepIcon}
      onSongPress={() => {
        onSongPress(
          item.songId,
          item.songNumber,
          item.songName,
          item.singerName,
          item.album,
        );
      }}
      onKeepAddPress={() => onKeepAddPress(item.songId)}
      onKeepRemovePress={() => onKeepRemovePress(item.songId)}
    />
  );

  return (
    <FlatList
      data={songlistData}
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

export {RefreshSongsList};
