import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import getSongsReviews from '../../../api/songs/getSongsReviews';
import deleteSongsReviews from '../../../api/songs/deleteSongsReviews';
import {SongInfoReview} from '../../../types';
import {designatedColor} from '../../../constants';
import putSongReviews from '../../../api/songs/putSongsReviews';
import getSongReviewOptions from '../../../api/songs/getSongReviewOptions';
import {logButtonClick} from '../../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type SongReviewProps = {
  songId: number;
};

const TOUCHABLE_OPACITY_HEIGHT = 50; // 높이를 50으로 설정, 필요에 따라 조정 가능

const SongReview = ({songId}: SongReviewProps) => {
  const [songReviews, setSongReviews] = useState<SongInfoReview[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [maxSum, setMaxSum] = useState<number>(1); // 기본 분모는 1로 설정
  const [reviewOptions, setReviewOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchReviewOptions = async () => {
      const options = await getSongReviewOptions();
      setReviewOptions(options.data);
    };

    fetchReviewOptions();
  }, []);

  const setInitSongReview = async (songId: number) => {
    console.log('setInitSongReview');
    try {
      const tempSongsReviews = await getSongsReviews(String(songId));
      const reviews = tempSongsReviews.data;
      setSongReviews(reviews);

      // 전체 리뷰 카운트의 총합을 계산
      const totalReviewCount = reviews.reduce(
        (sum, review) => sum + review.count,
        0,
      );
      setMaxSum(totalReviewCount);

      const selectedItem = reviews.find(item => item.selected);
      if (selectedItem) {
        setSelectedId(selectedItem.songReviewOptionId);
        console.log('selectedId', selectedId);
      }
    } catch (error) {
      console.error('Error fetching song reviews:', error);
    }
  };

  const handleOnPressReview = async (songReviewOptionId: number) => {
    amplitude.track('song_review_button_click');
    logButtonClick('song_review_button_click');
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
      setMaxSum(prevMaxSum => prevMaxSum - 1); // 전체 합계를 1 감소
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
        setMaxSum(prevMaxSum => prevMaxSum - 1); // 전체 합계를 1 감소 (기존 선택 해제)
      }
      setSelectedId(songReviewOptionId);
      setSongReviews(prevReviews =>
        prevReviews.map(review =>
          review.songReviewOptionId === songReviewOptionId
            ? {...review, selected: true, count: review.count + 1}
            : review,
        ),
      );
      setMaxSum(prevMaxSum => prevMaxSum + 1); // 전체 합계를 1 증가 (새 선택)
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

  const getReviewCount = (option: string) => {
    const review = songReviews.find(review => review.title === option);
    return review ? review.count : 0;
  };

  const getReviewSelected = (option: string) => {
    const review = songReviews.find(review => review.title === option);
    return review ? review.selected : false;
  };

  return (
    <View>
      {reviewOptions.map((option, index) => {
        const count = getReviewCount(option);
        const percentage = (count / maxSum) * 100;
        const isSelected = getReviewSelected(option);
        const backgroundColor = isSelected
          ? designatedColor.PINK2
          : designatedColor.GRAY3;
        const pinkWidth = percentage >= 100 ? 100 : percentage; // 100%를 넘지 않도록 제한

        return (
          <TouchableOpacity
            key={index}
            style={[
              tw`flex-row justify-between items-center my-1 bg-[${designatedColor.GRAY4}] rounded-lg overflow-hidden`,
              {height: TOUCHABLE_OPACITY_HEIGHT}, // 상수로 설정한 높이 적용
            ]}
            onPress={() => handleOnPressReview(index + 1)} // 옵션의 인덱스를 사용하여 처리
            activeOpacity={0.9}>
            <View
              style={[
                tw`absolute rounded-lg`,
                {
                  backgroundColor: backgroundColor,
                  width: `${pinkWidth}%`,
                  height: TOUCHABLE_OPACITY_HEIGHT, // 상수로 설정한 높이 적용
                },
              ]}
            />
            <Text
              style={[
                tw`ml-2`,
                isSelected && tw`font-bold`,
                {color: isSelected ? 'black' : 'white'},
              ]}>
              {option}
            </Text>
            <Text style={[tw`mr-2 font-bold text-[${designatedColor.PINK}]`]}>
              {count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export {SongReview};
