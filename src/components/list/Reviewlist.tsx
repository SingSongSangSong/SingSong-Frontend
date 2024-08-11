import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {SongInfoReview} from '../../types';
import {ReviewlistItem} from '../item/ReviewlistItem';
import {designatedColor} from '../../constants';

interface ReviewlistProps {
  reviewlistData: SongInfoReview[];
}

const Reviewlist: React.FC<ReviewlistProps> = ({reviewlistData}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const selectedItem = reviewlistData.find(item => item.selected);
    if (selectedItem) {
      setSelectedId(selectedItem.songReviewOptionId);
      console.log('selectedId:', selectedId);
    }
  }, [reviewlistData]);

  // 가장 큰 count 값을 찾음
  const maxCount = Math.max(...reviewlistData.map(item => item.count));

  const renderItem = ({item}: {item: SongInfoReview}) => {
    const color =
      item.count === maxCount
        ? `${designatedColor.PINK2}`
        : `${designatedColor.GRAY3}`;

    const textColor =
      item.count === maxCount
        ? `${designatedColor.PINK}`
        : `${designatedColor.GRAY1}`;

    const titleColor =
      item.count === maxCount
        ? `${designatedColor.BLACK}`
        : `${designatedColor.WHITE}`;

    const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
    return (
      <View style={tw`m-2`}>
        <ReviewlistItem
          title={item.title}
          count={item.count}
          reviewId={item.songReviewOptionId}
          isPressed={item.songReviewOptionId === selectedId}
          onAddPress={() => {}}
          onRemovePress={() => {}}
          setSelectedId={setSelectedId}
          color={color}
          textColor={textColor}
          titleColor={titleColor}
          percentage={percentage}
        />
      </View>
    );
  };

  return (
    <FlatList data={reviewlistData} renderItem={renderItem} style={tw`mb-4`} />
  );
};

export {Reviewlist};
