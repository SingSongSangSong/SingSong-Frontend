import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment} from '../../utils';

interface CommentItemProps {
  commentId: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isRecomment: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  recomments: Comment[];
  songId: number;
  isVisibleRecomment: boolean;
  onPressRecomment: () => void;
  onPressMoreInfo: () => void;
  onPressLikeButton: () => void;
  recommentCount: number;
}

const CommentItem = ({
  commentId,
  content,
  createdAt,
  likes,
  isLiked,
  isRecomment,
  memberId,
  nickname,
  parentCommentId,
  recomments,
  songId,
  onPressRecomment,
  onPressMoreInfo,
  isVisibleRecomment,
  onPressLikeButton,
  recommentCount,
}: CommentItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  const handleOnPressLikeButton = () => {
    if (!isLiked) {
      onPressLikeButton();
    }
  };
  return (
    <View style={tw`w-full`}>
      <View
        style={tw`flex-row justify-between mb-2 items-center 
        `}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-white ml-2`}>{nickname}</Text>
          <Text style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[12px]`}>
            {formatDateComment(createdAt)}
          </Text>
        </View>
        <IconButton
          Icon={MoreVerticalIcon}
          size={16}
          onPress={onPressMoreInfo}
        />
      </View>
      <View>
        <Text style={tw`text-white ml-4`}>{content}</Text>
      </View>

      <View style={tw`justify-between flex-row my-2 items-center`}>
        <View style={tw`flex-row items-center`}>
          {!isLiked ? (
            <TouchableOpacity
              onPress={handleOnPressLikeButton}
              style={tw`p-2 pr-1`}
              activeOpacity={0.8}>
              <LikeIcon width={20} height={20} />
            </TouchableOpacity>
          ) : (
            <View style={tw`p-2 pr-1`}>
              <FilledLikeIcon width={20} height={20} />
            </View>
          )}

          <Text style={tw`text-white`}>{likes}</Text>
        </View>
      </View>
      {isVisibleRecomment && (
        <TouchableOpacity
          onPress={onPressRecomment}
          style={tw`flex-row items-center mx-2`}
          activeOpacity={0.8}>
          {/* <IconButton
            Icon={RecommentIcon}
            size={20}
            onPress={onPressRecomment}
          /> */}
          {recommentCount > 0 ? (
            <Text style={tw`text-[${designatedColor.PINK}]`}>
              답글 {recommentCount}개 모두 보기
            </Text>
          ) : (
            <Text style={tw`text-[${designatedColor.PINK}]`}>답글</Text>
          )}

          <TouchableOpacity onPress={onPressRecomment} />

          {/* <Text style={tw`text-[${designatedColor.GRAY1}]`}>답글 보기</Text> */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export {CommentItem};
