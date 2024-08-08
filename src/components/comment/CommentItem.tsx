import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import RecommentIcon from '../../assets/svg/recomment.svg';
import {designatedColor} from '../../constants';

interface CommentItemProps {
  commentId: number;
  content: string;
  createdAt: string;
  isRecomment: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  recomments: Comment[];
  songId: number;
  isVisibleRecomment: boolean;
  onPressRecomment: () => void;
  onPressMoreInfo: () => void;
}

const CommentItem = ({
  commentId,
  content,
  createdAt,
  isRecomment,
  memberId,
  nickname,
  parentCommentId,
  recomments,
  songId,
  onPressRecomment,
  onPressMoreInfo,
  isVisibleRecomment,
}: CommentItemProps) => {
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

      <View style={tw`justify-between flex-row my-2`}>
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
