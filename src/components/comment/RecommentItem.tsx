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
import {formatDateComment} from '../../utils';

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
    <View style={tw`w-full flex-row`}>
      {/* <View style={tw`mt-2`}>
        <ArrowRecommentIcon width={16} height={16} />
      </View> */}

      <View style={tw`flex-1`}>
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
          {/* <View style={tw`flex-row items-center`}>
            {!isLiked ? (
              <TouchableOpacity
                onPress={handleOnPressLikeButton}
                style={tw`p-2 pr-1`}>
                <LikeIcon width={20} height={20} />
              </TouchableOpacity>
            ) : (
              <View style={tw`p-2 pr-1`}>
                <FilledLikeIcon width={20} height={20} />
              </View>
            )}
            <Text style={tw`text-white`}>{likes}</Text>
          </View> */}

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

            <Text
              style={
                isLiked ? tw`text-[${designatedColor.PINK}]` : tw`text-white`
              }>
              {likes}
            </Text>
          </TouchableOpacity>

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
