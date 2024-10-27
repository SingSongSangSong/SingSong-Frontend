import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment} from '../../utils';
import CustomText from '../text/CustomText';

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
  isShowMoreInfo?: boolean;
  onPressMoreInfo?: () => void;
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
  isShowMoreInfo = true,
  onPressMoreInfo = () => {},
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
    <View
      style={tw`w-full border-b-[0.5px] border-[${designatedColor.GRAY5}] py-2`}>
      <View
        style={tw`flex-row justify-between mb-2 items-center 
        `}>
        <View style={tw`flex-row items-center`}>
          <CustomText style={tw`text-white ml-2`}>{nickname}</CustomText>
          <CustomText
            style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[12px]`}>
            {formatDateComment(createdAt)}
          </CustomText>
        </View>
        {isShowMoreInfo && (
          <IconButton
            Icon={MoreVerticalIcon}
            size={16}
            onPress={onPressMoreInfo}
          />
        )}
      </View>
      <View>
        <CustomText style={tw`text-white ml-4`}>{content}</CustomText>
      </View>

      <View style={tw`justify-start flex-row my-1 items-center`}>
        <TouchableOpacity
          onPress={handleOnPressLikeButton}
          style={tw`flex-row items-center`}
          activeOpacity={0.8}
          disabled={isLiked}>
          {!isLiked ? (
            <View style={tw`p-2 pr-1 justify-center items-center`}>
              <LikeIcon width={20} height={20} />
            </View>
          ) : (
            <View style={tw`p-2 pr-1 justify-center items-center`}>
              <FilledLikeIcon width={20} height={20} />
            </View>
          )}

          <CustomText
            style={[
              isLiked ? tw`text-[${designatedColor.PINK}]` : tw`text-white`,
              tw`text-[11px]`,
            ]}>
            {likes}
          </CustomText>
        </TouchableOpacity>
        {isVisibleRecomment && recommentCount == 0 && (
          <TouchableOpacity
            onPress={onPressRecomment}
            style={tw`flex-row items-center ml-1 py-0.5 px-2`}
            activeOpacity={0.8}>
            <CustomText style={tw`text-[${designatedColor.GRAY1}] text-[12px]`}>
              답글 달기
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
      {isVisibleRecomment && recommentCount > 0 && (
        <TouchableOpacity
          onPress={onPressRecomment}
          style={tw`flex-row items-center mx-2 mb-2 px-2`}
          activeOpacity={0.8}>
          <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
            답글 {recommentCount}개 모두 보기
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {CommentItem};
