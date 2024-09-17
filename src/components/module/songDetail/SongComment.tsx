import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import useCommentStore from '../../../store/useCommentStore';
import CustomText from '../../text/CustomText';

type SongCommentProps = {
  handleOnPressComment: () => void;
};
const SongComment = ({handleOnPressComment}: SongCommentProps) => {
  // console.log('songComment');
  const commentCount = useCommentStore(state => state.commentCount);
  return (
    <View style={tw`w-full px-2 mt-4`}>
      <View style={tw`flex-row my-2 items-center`}>
        <CustomText
          style={tw`text-[${designatedColor.TEXT_WHITE}] mr-2 text-lg font-bold`}>
          댓글
        </CustomText>
        <CustomText style={tw`text-[${designatedColor.GRAY3}] text-lg`}>
          {commentCount}
        </CustomText>
      </View>
      <TouchableOpacity
        style={tw`flex-row items-center p-2 rounded-lg bg-[${designatedColor.GRAY5}]`}
        onPress={handleOnPressComment}
        activeOpacity={0.8}>
        <CustomText style={tw`text-[${designatedColor.GRAY1}]`}>
          댓글 추가...
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export {SongComment};
