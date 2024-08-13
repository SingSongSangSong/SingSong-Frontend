import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {Comment, HomeStackParamList, KeepStackParamList} from '../../types';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
} from '../../constants';
import useComment from '../../hooks/useComment';
import {CommentKeyboard, Commentlist, TextButton} from '../../components';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';

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

  useFocusEffect(
    React.useCallback(() => {
      // 화면이 포커스될 때 실행
      commentHandler.setIsKeyboardVisible(true);
      return () => {
        // 화면에서 벗어날 때 실행
        // commentHandler.setIsKeyboardVisible(false);
      };
    }, []),
  );

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

  const handleOnPressReport = () => {
    const reportParams = {
      reportCommentId: commentHandler.reportCommentId,
      reportSubjectMemberId: commentHandler.reportSubjectMemberId,
    };

    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_COMMENT) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).navigate(keepStackNavigations.KEEP_REPORT, reportParams);
      } else if (props.route.name === homeStackNavigations.COMMENT) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.REPORT, reportParams);
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        {!commentHandler.isLoading ? (
          Object.keys(commentHandler.comments).length > 0 ? (
            <Commentlist
              commentData={commentHandler.comments}
              onPressRecomment={handleOnPressRecomment}
              onPressMoreInfo={commentHandler.handleOnPressMoreInfo}
              onPressLikeButton={commentHandler.handleOnPressLikeButton}
              getRecommentCount={commentHandler.getRecommentCount}
            />
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <Text style={tw`text-white`}>댓글이 없어요</Text>
            </View>
          )
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-white`}>댓글을 불러오는 중...</Text>
          </View>
        )}
      </View>
      {commentHandler.isKeyboardVisible && (
        <View style={tw`w-full justify-end m-0`}>
          <CommentKeyboard
            onSendPress={commentHandler.handleOnPressSendButton}
            text="댓글"
          />
        </View>
      )}

      <Modal
        isVisible={commentHandler.isModalVisible}
        onBackdropPress={() => {
          commentHandler.setIsModalVisible(false);
          commentHandler.setIsKeyboardVisible(true);
        }}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={tw`bg-black w-full px-4`}>
          <Text style={tw`text-white font-bold text-xl my-4`}>댓글</Text>
          <View
            style={tw`items-start border-b border-[${designatedColor.GRAY4}] py-4`}>
            <View style={tw`mb-3`}>
              <TextButton
                title="신고하기"
                onPress={handleOnPressReport}
                color="white"
                size={4}
              />
            </View>
            <View style={tw`mt-3`}>
              <TextButton
                title="차단하기"
                onPress={commentHandler.handleOnPressBlacklist}
                color="white"
                size={4}
              />
            </View>
          </View>
          <View style={tw`py-4`}>
            <TextButton
              title="닫기"
              onPress={() => {
                commentHandler.setIsModalVisible(false);
                commentHandler.setIsKeyboardVisible(true);
              }}
              color="white"
              size={4}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default CommentScreen;
