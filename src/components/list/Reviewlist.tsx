import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {SongInfoReview} from '../../types';
import {ReviewlistItem} from '../item/ReviewlistItem';

interface ReviewlistProps {
  reviewlistData: SongInfoReview[];
  onAddPress: (songReviewOptionId: number) => void;
  onRemovePress: (songReviewOptionId: number) => void;
}

const Reviewlist: React.FC<ReviewlistProps> = ({
  reviewlistData,
  onAddPress,
  onRemovePress,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const selectedItem = reviewlistData.find(item => item.selected);
    if (selectedItem) {
      setSelectedId(selectedItem.songReviewOptionId);
      console.log('selectedId:', selectedId);
    }
  }, [reviewlistData]);

  const renderItem = ({item}: {item: SongInfoReview}) => (
    <View style={tw`m-2`}>
      <ReviewlistItem
        title={item.title}
        count={item.count}
        // isPressed={item.selected}
        reviewId={item.songReviewOptionId}
        isPressed={item.songReviewOptionId === selectedId}
        onAddPress={() => onAddPress(item.songReviewOptionId)}
        onRemovePress={() => onRemovePress(item.songReviewOptionId)}
        setSelectedId={setSelectedId}
      />
    </View>
  );

  return (
    <FlatList data={reviewlistData} renderItem={renderItem} style={tw`mb-10`} />
  );
};

export {Reviewlist};
