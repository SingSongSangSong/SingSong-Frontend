import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Song} from '../../types';
import {SongItem} from '..';
import {designatedColor} from '../../constants';

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
    melonLink: string,
    isMr: boolean,
  ) => void;
  handleRefreshRelatedSongs: () => void;
  onKeepAddPress: (songId: number) => void;
  onKeepRemovePress: (songId: number) => void;
}

const Relatedlist: React.FC<RelatedlistProps> = ({
  isLoading,
  relatedlistData,
  isShowKeepIcon,
  onSongPress,
  handleRefreshRelatedSongs,
  onKeepAddPress,
  onKeepRemovePress,
}) => {
  const renderItem = ({item}: {item: Song}) => (
    <View>
      <SongItem
        key={item.songNumber}
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        album={item.album}
        melonLink={item.melonLink}
        isKeep={item.isKeep}
        isShowKeepIcon={isShowKeepIcon}
        isMr={item.isMr}
        isShowInfo={false}
        onSongPress={() =>
          onSongPress(
            item.songId,
            item.songNumber,
            item.songName,
            item.singerName,
            item.album,
            item.melonLink || '',
            item.isMr,
          )
        }
        onKeepAddPress={() => onKeepAddPress(item.songId)}
        onKeepRemovePress={() => onKeepRemovePress(item.songId)}
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
            <ActivityIndicator size="large" color={designatedColor.VIOLET} />
          </View>
        ) : null
      }
    />
  );
};

export {Relatedlist};
