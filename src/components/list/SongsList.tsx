import React from 'react';
import {FlatList, View} from 'react-native';
import {SongItem} from '..';
import {Song} from '../../types';

interface SongsListProps {
  songlistData: Song[];
  isShowKeepIcon: boolean | undefined;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => void;
  onKeepAddPress: (songId: number) => void | undefined;
  onKeepRemovePress: (songId: number) => void | undefined;
}

const SongsList: React.FC<SongsListProps> = ({
  songlistData,
  isShowKeepIcon = false,
  onSongPress,
  onKeepAddPress,
  onKeepRemovePress,
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
        onKeepAddPress={() => onKeepAddPress(item.songId)}
        onKeepRemovePress={() => onKeepRemovePress(item.songId)}
      />
    </View>
  );

  return <FlatList data={songlistData} renderItem={renderItem} />;
};

export {SongsList};
