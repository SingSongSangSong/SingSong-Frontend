import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {SongOnPostComment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment} from '../../utils';
import CustomText from '../text/CustomText';
import CommentGrayIcon from '../../assets/svg/commentGray.svg';
import CommentIcon from '../../assets/svg/comment.svg';

interface PostCommentItemProps {
  postId: number;
  postCommentId: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isRecomment: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  postRecommentsCount: number;
  songOnPostComment: SongOnPostComment[];
  onPressCommentLike: () => void;
}

const PostCommentItem = ({
  postId,
  postCommentId,
  content,
  createdAt,
  likes,
  isLiked,
  memberId,
  nickname,
  parentCommentId,
  postRecommentsCount,
  songOnPostComment,
  onPressCommentLike,
}: PostCommentItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  //   const handleOnPressLikeButton = () => {
  //     if (!isLiked) {
  //       onPressLikeButton();
  //     }
  //   };
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [recommentCount, setRecommentCount] =
    useState<number>(postRecommentsCount);
  const handleOnPressCommentLike = () => {
    onPressCommentLike();
    if (isLike) {
      setLikeCount(likeCount - 1);
      setIsLike(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLike(true);
    }
  };
  return (
    <View
      style={tw`my-2 mx-4 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
      <View
        style={tw`flex-row justify-between items-center
        `}>
        <View style={tw`flex-row items-center mb-1`}>
          <CustomText style={tw`text-white font-bold text-[14px]`}>
            {nickname}
          </CustomText>
          <CustomText
            style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[12px]`}>
            {formatDateComment(createdAt)}
          </CustomText>
        </View>
        {/* <IconButton
          Icon={MoreVerticalIcon}
          size={16}
          onPress={onPressMoreInfo}
        /> */}
      </View>
      <View>
        <CustomText style={tw`text-[${designatedColor.GRAY1}] pl-1`}>
          {content}
        </CustomText>
      </View>

      <View style={tw`justify-between flex-row pt-1 pb-2 pr-2 items-center`}>
        <TouchableOpacity
          //   onPress={handleOnPressLikeButton}
          style={tw`flex-row items-center`}
          activeOpacity={0.8}
          //   disabled={isLiked}
        >
          {recommentCount == 0 ? (
            <View style={tw`p-2 pr-1 justify-center items-center`}>
              <CommentGrayIcon width={14} height={14} />
            </View>
          ) : (
            <View style={tw`p-2 pr-1 justify-center items-center`}>
              <CommentIcon width={14} height={14} />
            </View>
          )}

          <CustomText
            style={[
              postRecommentsCount > 0
                ? tw`text-[${designatedColor.MINT}]`
                : tw`text-[${designatedColor.GRAY1}]`,
              tw`text-[11px]`,
            ]}>
            {recommentCount}
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleOnPressCommentLike}
          style={tw`flex-row items-center`}
          activeOpacity={0.8}
          disabled={isLike}>
          {!isLike ? (
            <View style={tw`p-2 pr-1 justify-center items-center`}>
              <LikeIcon width={14} height={14} />
            </View>
          ) : (
            <View style={tw`p-2 pr-1 justify-center items-center`}>
              <FilledLikeIcon width={14} height={14} />
            </View>
          )}

          <CustomText
            style={[
              isLike
                ? tw`text-[${designatedColor.PINK}]`
                : tw`text-[${designatedColor.GRAY1}]`,
              tw`text-[11px]`,
            ]}>
            {likeCount}
          </CustomText>
        </TouchableOpacity>
      </View>
      {/* {isVisibleRecomment && (
        <TouchableOpacity
          onPress={onPressRecomment}
          style={tw`flex-row items-center mx-2 py-1 px-2`}
          activeOpacity={0.8}>
          {recommentCount > 0 ? (
            <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
              답글 {recommentCount}개 모두 보기
            </CustomText>
          ) : (
            <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
              답글
            </CustomText>
          )}

          <TouchableOpacity onPress={onPressRecomment} />
        </TouchableOpacity>
      )} */}
    </View>
  );
};

export {PostCommentItem};
