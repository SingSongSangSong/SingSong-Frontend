import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import getSongsReviews from '../../../api/songs/getSongsReviews';
import deleteSongsReviews from '../../../api/songs/deleteSongsReviews';
import {SongInfoReview} from '../../../types';
import {designatedColor} from '../../../constants';
import putSongReviews from '../../../api/songs/putSongsReviews';
import {logButtonClick} from '../../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import MusicIcon from '../../../assets/svg/music.svg';
import {LikeButton} from '../../button/LikeButton';
import LikeIcon from '../../../assets/svg/like.svg';
import FilledLikeIcon from '../../../assets/svg/filledLike.svg';
import DislikeIcon from '../../../assets/svg/dislike.svg';
import FilledDislikeIcon from '../../../assets/svg/filledDislike.svg';
import CustomText from '../../text/CustomText';

type SongReviewProps = {
  songId: number;
};

const SongReview = ({songId}: SongReviewProps) => {
  const [songReviews, setSongReviews] = useState<SongInfoReview[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const [maxSum, setMaxSum] = useState<number>(1); // 기본 분모는 1로 설정
  const [isLikePressed, setIsLikePressed] = useState(false);
  const [isDislikePressed, setIsDislikePressed] = useState(false);

  useEffect(() => {
    setInitSongReview(songId);
  }, []);

  const setInitSongReview = async (songId: number) => {
    try {
      const tempSongsReviews = await getSongsReviews(String(songId));
      // console.log('tempSongsReviews', tempSongsReviews);
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
        if (selectedItem.songReviewOptionId == 1) {
          setIsLikePressed(true);
        } else {
          setIsDislikePressed(true);
        }
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
      if (selectedId == 1) {
        setIsLikePressed(false);
      } else if (selectedId == 2) {
        setIsDislikePressed(false);
      }
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
        if (selectedId == 1) {
          setIsLikePressed(false);
        } else if (selectedId == 2) {
          setIsDislikePressed(false);
        }
      }
      setSelectedId(songReviewOptionId);
      setSongReviews(prevReviews =>
        prevReviews.map(review =>
          review.songReviewOptionId === songReviewOptionId
            ? {...review, selected: true, count: review.count + 1}
            : review,
        ),
      );
      if (songReviewOptionId == 1) {
        setIsLikePressed(true);
      } else if (songReviewOptionId == 2) {
        setIsDislikePressed(true);
      }
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

  // "쉬워요"와 "어려워요"에 대한 각각의 리뷰 수를 계산
  const easyCount =
    songReviews.find(review => review.songReviewOptionId === 1)?.count || 0;
  const hardCount =
    songReviews.find(review => review.songReviewOptionId === 2)?.count || 0;

  // 총 리뷰 수로 퍼센트 계산
  const easyPercentage =
    maxSum > 0 ? Math.round((easyCount / maxSum) * 100) : 0;
  const hardPercentage =
    maxSum > 0 ? Math.round((hardCount / maxSum) * 100) : 0;

  return (
    <View>
      <View style={tw`mt-4 px-2 py-1 flex-row items-center`}>
        <View
          style={tw`rounded-full px-2 py-1 bg-[${designatedColor.VIOLET2}]`}>
          {easyCount > hardCount ? (
            // <View style={tw`flex-row items-center`}>
            //   <Text style={tw`text-[${designatedColor.PINK2}]`}>
            //     쉬워요 {easyPercentage}%
            //   </Text>
            //   <Text style={tw`text-[${designatedColor.PINK2}] mx-2 font-bold`}>
            //     VS
            //   </Text>
            //   <Text style={tw`text-[${designatedColor.GRAY3}]`}>
            //     {hardPercentage}% 어려워요
            //   </Text>
            // </View>
            <View style={tw`flex-row items-center`}>
              <CustomText
                style={tw`text-[${designatedColor.GRAY5}] font-bold text-[3]`}>
                부르기 쉬워요
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET}] font-bold text-[3] ml-1`}>
                {easyPercentage}%
              </CustomText>
            </View>
          ) : (
            <View style={tw`flex-row items-center`}>
              <CustomText
                style={tw`text-[${designatedColor.GRAY5}] font-bold text-[3]`}>
                부르기 어려워요
              </CustomText>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET}] font-bold text-[3] ml-1`}>
                {hardPercentage}%
              </CustomText>
            </View>
          )}
        </View>
        <CustomText style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[3]`}>
          {maxSum}명 참여
        </CustomText>
      </View>
      <View style={tw`flex-row items-center pt-4 pl-4`}>
        <MusicIcon width={24} height={24} />
        <CustomText style={tw`text-[${designatedColor.GRAY1}] ml-2 text-sm`}>
          나의 평가는?
        </CustomText>
      </View>
      <View style={tw`items-end mr-4`}>
        <View style={tw`flex-row`}>
          <LikeButton
            title="쉬워요"
            color={designatedColor.VIOLET2}
            onPress={() => {
              handleOnPressReview(1);
            }}
            Icon={LikeIcon}
            PressIcon={FilledLikeIcon}
            isPressed={isLikePressed}
          />
          <LikeButton
            title="어려워요"
            color={designatedColor.VIOLET2}
            onPress={() => {
              handleOnPressReview(2);
            }}
            Icon={DislikeIcon}
            PressIcon={FilledDislikeIcon}
            isPressed={isDislikePressed}
          />
        </View>
      </View>
    </View>
  );
};

export {SongReview};

// import React, {useEffect, useState} from 'react';
// import {View, Text} from 'react-native';
// import tw from 'twrnc';
// import getSongsReviews from '../../../api/songs/getSongsReviews';
// import deleteSongsReviews from '../../../api/songs/deleteSongsReviews';
// import {SongInfoReview} from '../../../types';
// import {designatedColor} from '../../../constants';
// import putSongReviews from '../../../api/songs/putSongsReviews';
// import getSongReviewOptions from '../../../api/songs/getSongReviewOptions';
// import {logButtonClick} from '../../../utils';
// import * as amplitude from '@amplitude/analytics-react-native';
// import MusicIcon from '../../../assets/svg/music.svg';
// import {LikeButton} from '../../button/LikeButton';
// import LikeIcon from '../../../assets/svg/like.svg';
// import FilledLikeIcon from '../../../assets/svg/filledLike.svg';
// import DislikeIcon from '../../../assets/svg/dislike.svg';
// import FilledDislikeIcon from '../../../assets/svg/filledDislike.svg';

// type SongReviewProps = {
//   songId: number;
// };

// // const TOUCHABLE_OPACITY_HEIGHT = 50; // 높이를 50으로 설정, 필요에 따라 조정 가능

// const SongReview = ({songId}: SongReviewProps) => {
//   const [songReviews, setSongReviews] = useState<SongInfoReview[]>([]);
//   const [selectedId, setSelectedId] = useState<number>();
//   const [maxSum, setMaxSum] = useState<number>(1); // 기본 분모는 1로 설정
//   const [reviewOptions, setReviewOptions] = useState<string[]>([]);
//   const [isLikePressed, setIsLikePressed] = useState(false);
//   const [isDislikePressed, setIsDislikePressed] = useState(false);

//   useEffect(() => {
//     setInitSongReview(songId);
//   }, []);

//   useEffect(() => {
//     const fetchReviewOptions = async () => {
//       const options = await getSongReviewOptions();
//       setReviewOptions(options.data);
//     };

//     fetchReviewOptions();
//   }, []);

//   const setInitSongReview = async (songId: number) => {
//     //처음 초기화 함수
//     try {
//       const tempSongsReviews = await getSongsReviews(String(songId));
//       const reviews = tempSongsReviews.data;
//       setSongReviews(reviews);

//       // 전체 리뷰 카운트의 총합을 계산
//       const totalReviewCount = reviews.reduce(
//         (sum, review) => sum + review.count,
//         0,
//       );
//       setMaxSum(totalReviewCount);

//       const selectedItem = reviews.find(item => item.selected);
//       if (selectedItem) {
//         setSelectedId(selectedItem.songReviewOptionId);
//         if (selectedItem.songReviewOptionId == 1) {
//           setIsLikePressed(true);
//         } else {
//           setIsDislikePressed(true);
//         }
//         // console.log('selectedId', selectedId);
//       }
//     } catch (error) {
//       console.error('Error fetching song reviews:', error);
//     }
//   };

//   const handleOnPressReview = async (songReviewOptionId: number) => {
//     amplitude.track('song_review_button_click');
//     logButtonClick('song_review_button_click');
//     if (selectedId === songReviewOptionId) {
//       // 선택된 항목을 다시 누르면 해제하고 count 감소
//       setSelectedId(undefined);
//       setSongReviews(prevReviews =>
//         prevReviews.map(review =>
//           review.songReviewOptionId === songReviewOptionId
//             ? {...review, selected: false, count: review.count - 1}
//             : review,
//         ),
//       );
//       setMaxSum(prevMaxSum => prevMaxSum - 1); // 전체 합계를 1 감소
//       if (selectedId == 1) {
//         setIsLikePressed(false);
//       } else if (selectedId == 2) {
//         setIsDislikePressed(false);
//       }
//       await handleOnRemovePressReviewlist();
//     } else {
//       // 다른 항목 선택 시 이전 선택 항목 해제 후 새 항목 선택 및 count 증가
//       if (selectedId !== undefined) {
//         setSongReviews(prevReviews =>
//           prevReviews.map(review =>
//             review.songReviewOptionId === selectedId
//               ? {...review, selected: false, count: review.count - 1}
//               : review,
//           ),
//         );
//         setMaxSum(prevMaxSum => prevMaxSum - 1); // 전체 합계를 1 감소 (기존 선택 해제)
//         if (selectedId == 1) {
//           setIsLikePressed(false);
//         } else if (selectedId == 2) {
//           setIsDislikePressed(false);
//         }
//       }
//       setSelectedId(songReviewOptionId);
//       setSongReviews(prevReviews =>
//         prevReviews.map(review =>
//           review.songReviewOptionId === songReviewOptionId
//             ? {...review, selected: true, count: review.count + 1}
//             : review,
//         ),
//       );
//       if (songReviewOptionId == 1) {
//         setIsLikePressed(true);
//       } else if (songReviewOptionId == 2) {
//         setIsDislikePressed(true);
//       }
//       setMaxSum(prevMaxSum => prevMaxSum + 1); // 전체 합계를 1 증가 (새 선택)
//       await handleOnAddPressReviewlist(songReviewOptionId);
//     }
//   };

//   const handleOnAddPressReviewlist = async (songReviewOptionId: number) => {
//     await putSongReviews(String(songId), songReviewOptionId);
//   };

//   const handleOnRemovePressReviewlist = async () => {
//     await deleteSongsReviews(String(songId));
//   };

//   const getReviewCount = (option: string) => {
//     const review = songReviews.find(review => review.title === option);
//     return review ? review.count : 0;
//   };

//   const getReviewSelected = (option: string) => {
//     const review = songReviews.find(review => review.title === option);
//     return review ? review.selected : false;
//   };

//   return (
//     <View>
//       <View>
//         <View style={tw`flex-row items-center pt-4 pl-4`}>
//           <MusicIcon width={24} height={24} />
//           <Text style={tw`text-[${designatedColor.GRAY1}] ml-2 text-sm`}>
//             나의 평가는?
//           </Text>
//         </View>
//         <View style={tw`items-end mr-4`}>
//           <View style={tw`flex-row`}>
//             <LikeButton
//               title="쉬워요"
//               color={designatedColor.PINK}
//               onPress={() => {
//                 handleOnPressReview(1);
//               }}
//               Icon={LikeIcon}
//               PressIcon={FilledLikeIcon}
//               isPressed={isLikePressed}
//             />
//             <LikeButton
//               title="어려워요"
//               color={designatedColor.PINK}
//               onPress={() => {
//                 handleOnPressReview(2);
//               }}
//               Icon={DislikeIcon}
//               PressIcon={FilledDislikeIcon}
//               isPressed={isDislikePressed}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export {SongReview};

{
  /* {reviewOptions.map((option, index) => {
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
      })} */
}
