import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
} from '../../constants';
import {
  CommentKeyboard,
  CustomModal,
  Recommentlist,
  TextButton,
} from '../../components';
import useRecomment from '../../hooks/useRecomment';
import Modal from 'react-native-modal';
import * as amplitude from '@amplitude/analytics-react-native';

type RecommentScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_RECOMMENT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.RECOMMENT>;

function RecommentScreen(props: RecommentScreenProps) {
  const commentId = props.route?.params?.comment.commentId; // 초기 카테고리
  const recommentHandler = useRecomment(commentId);

  const handleOnPressReport = () => {
    amplitude.track('Recomment Report Press');
    recommentHandler.setIsModalVisible(false);
    recommentHandler.setIsKeyboardVisible(true);
    const reportParams = {
      reportCommentId: recommentHandler.reportCommentId,
      reportSubjectMemberId: recommentHandler.reportSubjectMemberId,
    };

    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_RECOMMENT) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_REPORT, reportParams);
      } else if (props.route.name === homeStackNavigations.RECOMMENT) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.REPORT, reportParams);
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        {recommentHandler.parentComment ? (
          <Recommentlist
            parentComment={recommentHandler.parentComment} //comments[commentId]
            recomments={recommentHandler.orderedRecomments} //recomments[commentId]
            onPressMoreInfo={recommentHandler.handleOnPressMoreInfo}
            onPressCommentLikeButton={
              recommentHandler.handleOnPressCommentLikeButton
            }
            onPressRecommentLikeButton={
              recommentHandler.handleOnPressRecommentLikeButton
            }
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-white`}>답글이 없어요</Text>
          </View>
        )}
      </View>
      {recommentHandler.isKeyboardVisible && (
        <View style={tw`w-full justify-end m-0`}>
          <CommentKeyboard
            onSendPress={recommentHandler.handleOnPressSendButton}
            text="답글"
          />
        </View>
      )}

      <Modal
        isVisible={recommentHandler.isModalVisible}
        onBackdropPress={() => {
          recommentHandler.setIsModalVisible(false);
          recommentHandler.setIsKeyboardVisible(true);
        }}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={tw`bg-black w-full px-4`}>
          <Text style={tw`text-white font-bold text-xl my-4`}>답글</Text>
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
                onPress={() => recommentHandler.setIsBlacklist(true)}
                color="white"
                size={4}
              />
            </View>
          </View>
          <View style={tw`py-4`}>
            <TextButton
              title="닫기"
              onPress={() => {
                recommentHandler.setIsModalVisible(false);
                recommentHandler.setIsKeyboardVisible(true);
              }}
              color="white"
              size={4}
            />
          </View>
        </View>
      </Modal>
      <CustomModal
        visible={recommentHandler.isBlacklist}
        onClose={() => recommentHandler.setIsBlacklist(false)}
        message={
          '사용자를 차단하면 이 사용자의 댓글과 활동이 숨겨집니다.\n차단하시겠습니까?'
        }
        onConfirm={recommentHandler.handleOnPressBlacklist}
        onCancel={() => recommentHandler.setIsBlacklist(false)}
        confirmText="차단"
        cancelText="취소"
      />
    </SafeAreaView>
  );
}

export default RecommentScreen;
