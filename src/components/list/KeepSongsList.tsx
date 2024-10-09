import React from 'react';
import {FlatList, View} from 'react-native';
import {SearchSongItem} from '..';
import {Song} from '../../types';

interface KeepSongsListProps {
  songlistData: Song[];
  isShowKeepIcon: boolean;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => void;
  onKeepAddPress?: (songId: number) => void;
  onKeepRemovePress?: (songId: number) => void;
}

const KeepSongsList = ({
  songlistData,
  isShowKeepIcon = false,
  onSongPress,
  onKeepAddPress,
  onKeepRemovePress,
}: KeepSongsListProps) => {
  const renderItem = ({item}: {item: Song}) => (
    <View>
      <SearchSongItem
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        album={item.album}
        melonLink={item.melonLink}
        isKeep={item.isKeep}
        isShowKeepIcon={isShowKeepIcon}
        isMr={item.isMr}
        isLive={item.isLive}
        onSongPress={() =>
          onSongPress(
            item.songId,
            item.songNumber,
            item.songName,
            item.singerName,
            item.album,
            item.melonLink || '',
            item.isMr,
            item.isLive || false,
          )
        }
        onKeepAddPress={
          onKeepAddPress ? () => onKeepAddPress(item.songId) : () => {}
        }
        onKeepRemovePress={
          onKeepRemovePress ? () => onKeepRemovePress(item.songId) : () => {}
        }
      />
    </View>
  );

  return <FlatList data={songlistData} renderItem={renderItem} />;
};

export {KeepSongsList};
