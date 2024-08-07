import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {Comment, HomeStackParamList, KeepStackParamList} from '../../types';
import {homeStackNavigations, keepStackNavigations} from '../../constants';
import useComment from '../../hooks/useComment';
import {CommentKeyboard, Commentlist} from '../../components';

type CommentScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_COMMENT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.COMMENT>;

function CommentScreen(props: CommentScreenProps) {
  const songNumber = props.route?.params?.songNumber; // 초기 카테고리
  const songId = props.route?.params?.songId;

  const commentHandler = useComment(songNumber, songId);

  const handleOnPressRecomment = (comment: Comment) => {
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_COMMENT) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).navigate(keepStackNavigations.KEEP_RECOMMENT, {comment});
      } else if (props.route.name === homeStackNavigations.COMMENT) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.RECOMMENT, {comment});
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        {commentHandler.comments ? (
          // commentHandler.comments.length > 0 ? (
          //   <Commentlist commentData={commentHandler.comments} />
          // ) : (
          //   <Text style={tw`text-white`}>댓글이 없어요</Text>
          // )
          <Commentlist
            commentData={commentHandler.comments}
            onPressRecomment={handleOnPressRecomment}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-white`}>댓글을 불러오는 중...</Text>
          </View>
        )}
      </View>
      <View style={tw`w-full justify-end`}>
        <CommentKeyboard
          onSendPress={commentHandler.handleOnPressSendButton}
          text="댓글"
        />
      </View>
    </SafeAreaView>
  );
}

export default CommentScreen;
