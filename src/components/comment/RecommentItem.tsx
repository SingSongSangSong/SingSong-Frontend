import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {IconButton} from '../button/IconButton';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import RecommentIcon from '../../assets/svg/recomment.svg';
import ArrowRecommentIcon from '../../assets/svg/arrowRecomment.svg';
import {designatedColor} from '../../constants';

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
  isVisibleRecomment: boolean;
  onPressRecomment: () => void;
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
  onPressRecomment,
  isVisibleRecomment,
}: RecommentItemProps) => {
  console.log('commentItem!!!');
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
            <IconButton Icon={MoreVerticalIcon} size={20} onPress={() => {}} />
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
    </View>
  );
};

export {RecommentItem};
