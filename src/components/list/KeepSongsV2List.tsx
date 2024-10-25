import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import tw from 'twrnc';
import {KeepSongV2} from '../../types';
import {KeepSongV2Item} from '..';
import {designatedColor} from '../../constants';

interface KeepSongsV2ListProps {
  songs: KeepSongV2[];
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
  handleRefreshKeep: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  refreshing: boolean;
  renderHeader: () => JSX.Element;
}

const KeepSongsV2List = ({
  songs,
  onSongPress,
  handleRefreshKeep,
  onRefresh,
  isLoading,
  refreshing,
  renderHeader,
}: KeepSongsV2ListProps) => {
  const renderItem = ({item, index}: {item: KeepSongV2; index: number}) => (
    <>
      {index === 0 && (
        <View style={tw`mb-4`}>
          {/* 헤더 컴포넌트를 여기 추가 */}
          {renderHeader()}
        </View>
      )}
      <KeepSongV2Item
        songId={item.songId}
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        album={item.album}
        melonLink={item.melonLink}
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
      />
    </>
  );

  return (
    <FlatList
      data={songs} // 객체를 배열로 변환하여 FlatList에 전달
      renderItem={renderItem}
      keyExtractor={item => item.songId.toString()}
      onEndReached={handleRefreshKeep}
      onEndReachedThreshold={0.1}
      contentContainerStyle={tw`py-2`}
      // ListHeaderComponent={renderHeader}
      // ListFooterComponentStyle={tw`py-10`}
      ListFooterComponent={() =>
        isLoading ? (
          <View style={tw`py-10`}>
            <ActivityIndicator size="large" color={designatedColor.VIOLET} />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={designatedColor.VIOLET2} // RefreshControl indicator color (iOS)
          colors={[designatedColor.VIOLET2]}
        /> // RefreshControl indicator colors (Android)/>
      }
    />
  );
};

export {KeepSongsV2List};
