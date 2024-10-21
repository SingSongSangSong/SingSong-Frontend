import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import CommentIcon from '../../assets/svg/commentGray.svg';
import {formatDateComment} from '../../utils';
import CustomText from '../text/CustomText';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface PostItemProps {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  nickname: string;
  commentCount: number;
  likes: number;
  onPressPost: () => void;
}

const PostItem = ({
  postId,
  title,
  content,
  createdAt,
  nickname,
  commentCount,
  likes,
  onPressPost,
}: PostItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  return (
    // <TouchableOpacity
    //   onPress={onPressPost}
    //   style={tw`w-full px-4 py-4 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}
    //   activeOpacity={0.8}>
    <TouchableOpacity
      onPress={onPressPost}
      style={[
        tw`w-full px-4 py-4 border-b-[0.5px] border-[${designatedColor.GRAY5}]`,
        // {position: 'absolute'},
      ]}
      activeOpacity={0.8}
      // hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} // 이 부분 추가
    >
      <View
        style={tw`flex-row justify-between mb-2 items-center 
        `}>
        <View style={tw`flex-row items-center`}>
          <CustomText style={tw`text-white font-bold text-[16px]`}>
            {title}
          </CustomText>
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
        <View style={tw`flex-row items-center justify-center`}>
          <CustomText style={tw`text-[${designatedColor.GRAY3}] text-[12px]`}>
            {formatDateComment(createdAt)} |{' '}
          </CustomText>
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
    </TouchableOpacity>
  );
};

export {PostItem};
