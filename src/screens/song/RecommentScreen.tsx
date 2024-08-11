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
import {CommentKeyboard, Recommentlist, TextButton} from '../../components';
import useRecomment from '../../hooks/useRecomment';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';

type RecommentScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_RECOMMENT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.RECOMMENT>;

function RecommentScreen(props: RecommentScreenProps) {
  const comment = props.route?.params?.comment; // 초기 카테고리

  //   const commentHandler = useComment(songNumber, songId);
  const recommentHandler = useRecomment(comment);

  useFocusEffect(
    React.useCallback(() => {
      // 화면이 포커스될 때 실행
      recommentHandler.setIsKeyboardVisible(true);
      return () => {
        // 화면에서 벗어날 때 실행
        // recommentHandler.setIsKeyboardVisible(false);
      };
    }, []),
  );

  const handleOnPressReport = () => {
    const reportParams = {
      reportCommentId: recommentHandler.reportCommentId,
      reportSubjectMemberId: recommentHandler.reportSubjectMemberId,
    };

    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_RECOMMENT) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).navigate(keepStackNavigations.KEEP_REPORT, reportParams);
      } else if (props.route.name === homeStackNavigations.RECOMMENT) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.REPORT, reportParams);
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {/* <View style={tw`w-full justify-end m-0`}>
        <CommentKeyboard onSendPress={commentHandler.handleOnPressSendButton} />
      </View> */}
      <View style={tw`flex-1`}>
        {recommentHandler.parentComment && (
          <Recommentlist
            parentComment={recommentHandler.parentComment}
            recomments={recommentHandler.recomments}
            onPressMoreInfo={recommentHandler.handleOnPressMoreInfo}
            onPressLikeButton={recommentHandler.handleOnPressLikeButton}
          />
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
        onBackdropPress={() => recommentHandler.setIsModalVisible(false)}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View style={tw`bg-black w-full px-4`}>
          <Text style={tw`text-white font-bold text-xl my-4`}>답글</Text>
          <View
            style={tw`items-start border-b border-[${designatedColor.GRAY4}] py-4`}>
            <TextButton title="신고하기" onPress={handleOnPressReport} />
          </View>
          <View style={tw`py-4`}>
            <TextButton
              title="닫기"
              onPress={() => {
                recommentHandler.setIsModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default RecommentScreen;
