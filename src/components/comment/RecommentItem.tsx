import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import RecommentIcon from '../../assets/svg/recomment.svg';
import ArrowRecommentIcon from '../../assets/svg/arrowRecomment.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';

interface RecommentItemProps {
  commentId: number;
  content: string;
  createdAt: string;
  isRecomment: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  recomments: Comment[];
  songId: number;
  likes: number;
  isLiked: boolean;
  isVisibleRecomment: boolean;
  onPressRecomment: () => void;
  onPressMoreInfo: () => void;
  onPressLikeButton: () => void;
}

const RecommentItem = ({
  commentId,
  content,
  createdAt,
  isRecomment,
  memberId,
  nickname,
  parentCommentId,
  recomments,
  songId,
  isLiked,
  likes,
  onPressRecomment,
  onPressMoreInfo,
  isVisibleRecomment,
  onPressLikeButton,
}: RecommentItemProps) => {
  // const [isLike, setIsLike] = useState(false);
  // const [likeCount, setLikeCount] = useState(likes);

  const handleOnPressLikeButton = () => {
    if (!isLiked) {
      onPressLikeButton();
    }
  };

  return (
    <View
      style={tw`w-full border-b border-[${designatedColor.GRAY4}] flex-row`}>
      <View style={tw`mt-2`}>
        <ArrowRecommentIcon width={16} height={16} />
      </View>

      <View style={tw`flex-1`}>
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

        <View style={tw`justify-between flex-row my-2`}>
          <View style={tw`flex-row items-center`}>
            {!isLiked ? (
              <TouchableOpacity
                onPress={handleOnPressLikeButton}
                style={tw`p-2`}>
                <LikeIcon width={20} height={20} />
              </TouchableOpacity>
            ) : (
              <View style={tw`p-2`}>
                <FilledLikeIcon width={20} height={20} />
              </View>
            )}
            <Text style={tw`text-white`}>{likes}</Text>
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
    </View>
  );
};

export {RecommentItem};
