import React from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import tw from 'twrnc';
import {RcdRefreshSong} from '../../types';
import {RelatedlistItem} from '../item/RelatedlistItem';

interface RelatedlistProps {
  isLoading: boolean;
  relatedlistData: RcdRefreshSong[];
  onPress: (songNumber: number) => void;
  handleRefreshRelatedSongs: () => void;
  renderHeader: () => React.ReactNode;
}

const Relatedlist: React.FC<RelatedlistProps> = ({
  isLoading,
  relatedlistData,
  onPress,
  handleRefreshRelatedSongs,
  renderHeader,
}) => {
  const renderItem = ({item}: {item: RcdRefreshSong}) => (
    <View style={tw`m-2`}>
      <RelatedlistItem
        songNumber={item.songNumber}
        songName={item.songName}
        singerName={item.singerName}
        onPress={() => onPress(item.songNumber)}
      />
    </View>
  );

  return (
    <FlatList
      data={relatedlistData}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
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
