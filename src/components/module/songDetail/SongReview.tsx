import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import tw from 'twrnc';
import getSongsReviews from '../../../api/songs/getSongsReviews';
import deleteSongsReviews from '../../../api/songs/deleteSongsReviews';
import {SongInfoReview} from '../../../types';
import {designatedColor} from '../../../constants';
import putSongReviews from '../../../api/songs/putSongsReviews';

type SongReviewProps = {
  songId: number;
};

const TOUCHABLE_OPACITY_HEIGHT = 50; // 높이를 50으로 설정, 필요에 따라 조정 가능

const SongReview = ({songId}: SongReviewProps) => {
  console.log('songReview!!');
  const [songReviews, setSongReviews] = useState<SongInfoReview[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>();
  const [maxCount, setMaxCount] = useState<number | null>(null); // 기본 분모는 null로 설정
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가

  const setInitSongReview = async (songId: number) => {
    try {
      const tempSongsReviews = await getSongsReviews(String(songId));
      const reviews = tempSongsReviews.data;
      setSongReviews(reviews);
      const maxReviewCount = Math.max(
        ...reviews.map(review => review.count),
        1,
      );
      setMaxCount(maxReviewCount); // 최대 count 값을 기준으로 설정

      const selectedItem = reviews.find(item => item.selected);
      if (selectedItem) {
        setSelectedId(selectedItem.songReviewOptionId);
      }
    } catch (error) {
      console.error('Error fetching song reviews:', error);
    } finally {
      setLoading(false); // 로딩 완료 후 로딩 상태 업데이트
    }
  };

  const handleOnPressReview = async (songReviewOptionId: number) => {
    if (selectedId === songReviewOptionId) {
      // 선택된 항목을 다시 누르면 해제하고 count 감소
      setSelectedId(undefined);
      setSongReviews(prevReviews =>
        prevReviews.map(review =>
          review.songReviewOptionId === songReviewOptionId
            ? {...review, selected: false, count: review.count - 1}
            : review,
        ),
      );
      await handleOnRemovePressReviewlist();
    } else {
      // 다른 항목 선택 시 이전 선택 항목 해제 후 새 항목 선택 및 count 증가
      if (selectedId !== undefined) {
        setSongReviews(prevReviews =>
          prevReviews.map(review =>
            review.songReviewOptionId === selectedId
              ? {...review, selected: false, count: review.count - 1}
              : review,
          ),
        );
      }
      setSelectedId(songReviewOptionId);
      setSongReviews(prevReviews =>
        prevReviews.map(review =>
          review.songReviewOptionId === songReviewOptionId
            ? {...review, selected: true, count: review.count + 1}
            : review,
        ),
      );
      await handleOnAddPressReviewlist(songReviewOptionId);
    }
  };

  const handleOnAddPressReviewlist = async (songReviewOptionId: number) => {
    await putSongReviews(String(songId), songReviewOptionId);
  };

  const handleOnRemovePressReviewlist = async () => {
    await deleteSongsReviews(String(songId));
  };

  useEffect(() => {
    setInitSongReview(songId);
  }, []);

  if (loading) {
    // 로딩 중인 경우 로딩 스피너를 보여줌
    return (
      <View
        style={[
          tw`flex-1 justify-center items-center bg-black`,
          {height: TOUCHABLE_OPACITY_HEIGHT * 2},
        ]}>
        {/* <ActivityIndicator size="large" color={designatedColor.PINK2} /> */}
      </View>
    );
  }

  return (
    <View>
      {maxCount !== null &&
        songReviews.map(review => {
          const percentage = (review.count / maxCount) * 100;
          console.log('percentage:', percentage);
          const isSelected = selectedId === review.songReviewOptionId;
          const backgroundColor = isSelected
            ? tw`bg-[${designatedColor.PINK2}]`
            : tw`bg-[${designatedColor.GRAY3}]`;
          const titleColor = isSelected
            ? tw`text-black font-bold`
            : tw`text-white`;

          const textColor = isSelected
            ? tw`text-[${designatedColor.PINK}]`
            : tw`text-[${designatedColor.GRAY2}]`;
          const pinkWidth = percentage >= 100 ? 100 : percentage; // 100%를 넘지 않도록 제한

          return (
            <TouchableOpacity
              key={review.songReviewOptionId}
              style={[
                tw`flex-row justify-between items-center my-1 bg-[${designatedColor.GRAY4}] rounded-lg overflow-hidden`,
                {height: TOUCHABLE_OPACITY_HEIGHT}, // 상수로 설정한 높이 적용
              ]}
              onPress={() => handleOnPressReview(review.songReviewOptionId)}
              activeOpacity={0.9}>
              <View
                style={[
                  tw`absolute rounded-lg`,
                  backgroundColor,
                  {
                    width: `${pinkWidth}%`,
                    height: TOUCHABLE_OPACITY_HEIGHT, // 상수로 설정한 높이 적용
                  },
                ]}
              />
              <Text style={[titleColor, tw`ml-2`]}>{review.title}</Text>
              <Text style={[textColor, tw`mr-2`]}>{review.count}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export {SongReview};
