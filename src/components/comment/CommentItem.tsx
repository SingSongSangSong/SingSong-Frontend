import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
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
  songInfoId: number;
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
  songInfoId,
}: CommentItemProps) => {
  console.log('commentItem!!!');
  return (
    <View style={tw`w-full pb-8 border-b border-[${designatedColor.GRAY4}]`}>
      <View
        style={tw`flex-row justify-between mb-2 items-center 
        `}>
        <Text style={tw`text-white`}>{nickname}</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-white mr-2`}>{createdAt}</Text>
          <IconButton Icon={MoreVerticalIcon} size={20} onPress={() => {}} />
        </View>
      </View>
      <View>
        <Text style={tw`text-white`}>{content}</Text>
      </View>
    </View>
  );
};

export {CommentItem};
