import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
import {homeStackNavigations, keepStackNavigations} from '../../constants';
import useComment from '../../hooks/useComment';
import {CommentKeyboard} from '../../components';

type CommentScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_COMMENT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.COMMENT>;

function CommentScreen(props: CommentScreenProps) {
  const songNumber = props.route?.params?.songNumber; // 초기 카테고리
  const commentHandler = useComment(songNumber);

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1 bg-blue-400`}>
        <Text style={tw`text-white`}>comment screen</Text>
        {commentHandler.comments ? (
          commentHandler.comments.length > 0 ? (
            <Text style={tw`text-white`}>댓글이 있어요</Text>
          ) : (
            <Text style={tw`text-white`}>댓글이 없어요</Text>
          )
        ) : (
          <Text style={tw`text-white`}>댓글을 불러오는 중...</Text>
        )}
      </View>
      <View style={tw`w-full justify-end m-0`}>
        <CommentKeyboard />
      </View>
    </SafeAreaView>
  );
}

export default CommentScreen;
