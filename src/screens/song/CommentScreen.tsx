import React, {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {Comment, HomeStackParamList, KeepStackParamList} from '../../types';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
} from '../../constants';
import useComment from '../../hooks/useComment';
import {
  CommentKeyboard,
  Commentlist,
  CustomModal,
  TextButton,
} from '../../components';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import ErrorIcon from '../../assets/svg/error.svg';
import {logScreenView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

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

  // const route = useRoute();
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     console.log('route name', props.route.name);
  //     logScreenView(props.route.name); // 스크린이 포커스될 때 로그 이벤트 발생
  //   });

  //   return unsubscribe;
  // }, [props]);

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
    amplitude.track('Recomment Press');
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_COMMENT) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_RECOMMENT, {comment});
      } else if (props.route.name === homeStackNavigations.COMMENT) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.RECOMMENT, {comment});
      }
    }
  };

  const handleOnPressReport = () => {
    amplitude.track('Report Press');
    const reportParams = {
      reportCommentId: commentHandler.reportCommentId,
      reportSubjectMemberId: commentHandler.reportSubjectMemberId,
    };

    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_COMMENT) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_REPORT, reportParams);
      } else if (props.route.name === homeStackNavigations.COMMENT) {
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
        {!commentHandler.isLoading ? (
          commentHandler.orderedComments.length > 0 ? (
            <Commentlist
              commentData={commentHandler.orderedComments}
              onPressRecomment={handleOnPressRecomment}
              onPressMoreInfo={commentHandler.handleOnPressMoreInfo}
              onPressLikeButton={commentHandler.handleOnPressLikeButton}
              getRecommentCount={commentHandler.getRecommentCount}
            />
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <View style={tw`flex-1 justify-center items-center`}>
                <ErrorIcon width={50} height={50} />
                <Text style={tw`text-[${designatedColor.PINK2}] mt-4`}>
                  댓글이 없어요
                </Text>
              </View>
            </View>
          )
        ) : (
          // <View style={tw`flex-1 justify-center items-center`}>
          //   <Text style={tw`text-[${}]`}>댓글을 불러오는 중...</Text>
          // </View>
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="small" color={designatedColor.PINK2} />
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
                onPress={() => commentHandler.setIsBlacklist(true)}
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
      <CustomModal
        visible={commentHandler.isBlacklist}
        onClose={() => commentHandler.setIsBlacklist(false)}
        message={
          '사용자를 차단하면 이 사용자의 댓글과 활동이 숨겨집니다.\n차단하시겠습니까?'
        }
        onConfirm={commentHandler.handleOnPressBlacklist}
        onCancel={() => commentHandler.setIsBlacklist(false)}
        confirmText="차단"
        cancelText="취소"
      />
    </SafeAreaView>
  );
}

export default CommentScreen;
