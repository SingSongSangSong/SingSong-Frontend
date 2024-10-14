import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import CommentIcon from '../../assets/svg/commentGray.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment} from '../../utils';
import CustomText from '../text/CustomText';

interface PostItemProps {
  postId: number;
  title: string;
  content: string;
  nickname: string;
  commentCount: number;
  likes: number;
  onPressPost: () => void;
}

const PostItem = ({
  postId,
  title,
  content,
  nickname,
  commentCount,
  likes,
  onPressPost,
}: PostItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  return (
    <TouchableOpacity
      onPress={onPressPost}
      style={tw`w-full px-4 py-4 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}
      activeOpacity={1.0}>
      <View
        style={tw`flex-row justify-between mb-2 items-center 
        `}>
        <View style={tw`flex-row items-center`}>
          <CustomText style={tw`text-white font-bold text-[16px]`}>
            {title}
          </CustomText>
          {/* <CustomText
            style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[12px]`}>
            {formatDateComment(createdAt)}
          </CustomText> */}
        </View>
      </View>
      <View>
        <CustomText
          style={tw`text-[${designatedColor.GRAY1}]`}
          numberOfLines={1}
          ellipsizeMode="tail">
          {content}
        </CustomText>
      </View>
      <View style={tw`items-center justify-between flex-row mt-3`}>
        <View style={tw`items-center justify-center`}>
          <CustomText style={tw`text-[${designatedColor.GRAY3}] text-[12px]`}>
            {nickname}
          </CustomText>
        </View>
        <View style={tw`flex-row items-center`}>
          {likes > 0 && (
            <View style={tw`flex-row items-center`}>
              <LikeIcon width={12} height={12} />
              <CustomText
                style={tw`text-[${designatedColor.GRAY3}] text-[12px] pl-1`}>
                {likes}
              </CustomText>
            </View>
          )}
          {commentCount > 0 && (
            <View style={tw`flex-row items-center ml-2`}>
              <CommentIcon width={12} height={12} />
              <CustomText
                style={tw`text-[${designatedColor.GRAY3}] text-[12px] pl-1`}>
                {commentCount}
              </CustomText>
            </View>
          )}
        </View>
      </View>

      {/* <View style={tw`justify-between flex-row my-2 items-center`}>
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
      </View> */}
    </TouchableOpacity>
  );
};

export {PostItem};
