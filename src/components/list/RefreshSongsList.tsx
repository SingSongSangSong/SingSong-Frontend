import React, {memo} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import tw from 'twrnc';
import {SongItem} from '..';
import {Song} from '../../types';
import {designatedColor} from '../../constants';

interface RefreshSongsListProps {
  songlistData: Song[];
  isShowKeepIcon: boolean | undefined;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    isMr: boolean,
  ) => void;
  onKeepAddPress: (songId: number) => void;
  onKeepRemovePress: (songId: number) => void;
  handleRefreshSongs: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  refreshing: boolean;
}

// 메모이제이션된 renderItem 함수
const RenderItem = memo(
  ({
    item,
    onSongPress,
    onKeepAddPress,
    onKeepRemovePress,
    isShowKeepIcon,
  }: any) => (
    <SongItem
      key={item.songNumber}
      songId={item.songId}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      album={item.album}
      isKeep={item.isKeep}
      isShowKeepIcon={isShowKeepIcon}
      isMr={item.isMr}
      keepCount={item.keepCount}
      commentCount={item.commentCount}
      onSongPress={() => {
        onSongPress(
          item.songId,
          item.songNumber,
          item.songName,
          item.singerName,
          item.album,
          item.isMr,
        );
      }}
      onKeepAddPress={() => onKeepAddPress(item.songId)}
      onKeepRemovePress={() => onKeepRemovePress(item.songId)}
    />
  ),
);

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
  // console.log('RefreshSongsList rendered!');

  return (
    <FlatList
      data={songlistData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <RenderItem
          item={item}
          onSongPress={onSongPress}
          onKeepAddPress={onKeepAddPress}
          onKeepRemovePress={onKeepRemovePress}
          isShowKeepIcon={isShowKeepIcon}
        />
      )}
      style={tw`h-[50%]`}
      contentContainerStyle={tw`flex-grow`}
      onEndReached={handleRefreshSongs}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoading ? (
          <View style={tw`py-10`}>
            <ActivityIndicator size="large" color={designatedColor.PINK2} />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={designatedColor.PINK2} // RefreshControl indicator color (iOS)
          colors={[designatedColor.PINK2]}
        /> // RefreshControl indicator colors (Android)/>
      }
    />
  );
};

// 먼저 메모이제이션된 컴포넌트를 생성
const MemoizedRefreshSongsList = memo(RefreshSongsList);

// export 시에 중괄호를 사용
export {MemoizedRefreshSongsList as RefreshSongsList};
