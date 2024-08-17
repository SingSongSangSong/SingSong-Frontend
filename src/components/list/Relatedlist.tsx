import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Song} from '../../types';
import {SongItem} from '..';

interface RelatedlistProps {
  isLoading: boolean;
  relatedlistData: Song[];
  isShowKeepIcon: boolean;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => void;
  handleRefreshRelatedSongs: () => void;
}

const Relatedlist: React.FC<RelatedlistProps> = ({
  isLoading,
  relatedlistData,
  isShowKeepIcon,
  onSongPress,
  handleRefreshRelatedSongs,
}) => {
  const renderItem = ({item}: {item: Song}) => (
    <View>
      <SongItem
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        album={item.album}
        isKeep={item.isKeep}
        isShowKeepIcon={isShowKeepIcon}
        onSongPress={() =>
          onSongPress(
            item.songId,
            item.songNumber,
            item.songName,
            item.singerName,
            item.album,
          )
        }
      />
    </View>
  );

  return (
    <FlatList
      data={relatedlistData}
      renderItem={renderItem}
      keyExtractor={item => item.songId.toString()}
      onEndReached={handleRefreshRelatedSongs}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoading ? (
          <View style={tw`py-10`}>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : null
      }
    />
  );
};

export {Relatedlist};
