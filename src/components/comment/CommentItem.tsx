import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import RecommentIcon from '../../assets/svg/recomment.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';

interface CommentItemProps {
  commentId: number;
  content: string;
  createdAt: string;
  likes: number;
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
}

const CommentItem = ({
  commentId,
  content,
  createdAt,
  likes,
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
}: CommentItemProps) => {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleOnPressLike = () => {
    onPressLikeButton();
    setIsLike(true);
    setLikeCount(likeCount + 1);
  };

  return (
    <View style={tw`w-full border-b border-[${designatedColor.GRAY4}]`}>
      <View
        style={tw`flex-row justify-between mb-2 items-center 
        `}>
        <Text style={tw`text-white ml-2`}>{nickname}</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-white mr-2`}>{createdAt}</Text>
          <IconButton
            Icon={MoreVerticalIcon}
            size={20}
            onPress={onPressMoreInfo}
          />
        </View>
      </View>
      <View>
        <Text style={tw`text-white ml-4`}>{content}</Text>
      </View>

      <View style={tw`justify-between flex-row my-2 items-center`}>
        <View style={tw`flex-row items-center`}>
          {!isLike ? (
            <TouchableOpacity onPress={handleOnPressLike} style={tw`p-2`}>
              <LikeIcon width={20} height={20} />
            </TouchableOpacity>
          ) : (
            <View style={tw`p-2`}>
              <FilledLikeIcon width={20} height={20} />
            </View>
          )}

          <Text style={tw`text-white`}>{likeCount}</Text>
        </View>
        {isVisibleRecomment && (
          <View style={tw`flex-row items-center`}>
            <IconButton
              Icon={RecommentIcon}
              size={20}
              onPress={onPressRecomment}
            />
            <Text style={tw`text-white`}>{recomments.length}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export {CommentItem};
