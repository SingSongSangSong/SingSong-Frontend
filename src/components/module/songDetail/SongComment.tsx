import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import useCommentStore from '../../../store/useCommentStore';

type SongCommentProps = {
  handleOnPressComment: () => void;
};
const SongComment = ({handleOnPressComment}: SongCommentProps) => {
  const commentCount = useCommentStore(state => state.commentCount);
  return (
    <View style={tw`w-full px-1 mt-4`}>
      <View style={tw`flex-row my-2 items-center`}>
        <Text
          style={tw`text-[${designatedColor.TEXT_WHITE}] mr-2 text-lg font-bold`}>
          댓글
        </Text>
        <Text style={tw`text-[${designatedColor.GRAY3}] text-lg`}>
          {commentCount}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`flex-row items-center p-3 rounded-lg bg-[${designatedColor.GRAY5}]`}
        onPress={handleOnPressComment}
        activeOpacity={0.8}>
        <Text style={tw`text-[${designatedColor.GRAY1}]`}>댓글 추가...</Text>
      </TouchableOpacity>
    </View>
  );
};

export {SongComment};
