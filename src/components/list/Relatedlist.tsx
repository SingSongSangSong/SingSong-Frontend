import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {RcdRefreshSong} from '../../types';
import {RelatedlistItem} from '../item/RelatedlistItem';

interface RelatedlistProps {
  relatedlistData: RcdRefreshSong[];
  onPress: (songNumber: number) => void;
  renderHeader: () => React.ReactNode;
}

const Relatedlist: React.FC<RelatedlistProps> = ({
  relatedlistData,
  onPress,
  renderHeader,
}) => {
  //   useEffect(() => {
  //     const selectedItem = reviewlistData.find(item => item.selected);
  //     if (selectedItem) {
  //       setSelectedId(selectedItem.songReviewOptionId);
  //       console.log('selectedId:', selectedId);
  //     }
  //   }, [reviewlistData]);

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
    />
  );
};

export {Relatedlist};
