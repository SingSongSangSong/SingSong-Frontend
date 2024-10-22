import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
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
  CommentItem,
  CustomModal,
  TextButton,
} from '../../components';
// import Modal from 'react-native-modal';
import ErrorIcon from '../../assets/svg/error.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from '../../components/text/CustomText';
import {logPageView, logTrack} from '../../utils';

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

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const handleOnPressRecomment = (comment: Comment) => {
    logTrack('comment_recomment_button_click');
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
    commentHandler.setIsModalVisible(false);
    commentHandler.setIsKeyboardVisible(true);
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

  const renderCommentItem = ({item}: {item: Comment}) => (
    <View style={tw`px-2`}>
      <CommentItem
        commentId={item.commentId}
        content={item.content}
        createdAt={item.createdAt}
        isLiked={item.isLiked}
        likes={item.likes}
        isRecomment={item.isRecomment}
        memberId={item.memberId}
        nickname={item.nickname}
        parentCommentId={item.parentCommentId}
        recomments={item.recomments}
        songId={item.songId}
        onPressRecomment={() => handleOnPressRecomment(item)}
        onPressMoreInfo={() =>
          commentHandler.handleOnPressMoreInfo(item.commentId, item.memberId)
        }
        onPressLikeButton={() =>
          commentHandler.handleOnPressLikeButton(item.commentId)
        }
        isVisibleRecomment={true}
        recommentCount={commentHandler.getRecommentCount(item.commentId)}
      />
    </View>
  );

  const insets = useSafeAreaInsets();
  // const {width} = useWindowDimensions();

  return (
    <View style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={[tw`flex-1`, {paddingBottom: insets.bottom + 70}]}>
        {!commentHandler.isLoading ? (
          <FlatList
            data={commentHandler.orderedComments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.commentId.toString()}
            ListEmptyComponent={
              <View style={tw`w-full h-full justify-center items-center`}>
                <View style={tw`flex-1 justify-center items-center`}>
                  <ErrorIcon width={50} height={50} />
                  <CustomText style={tw`text-[${designatedColor.VIOLET}] mt-4`}>
                    댓글이 없어요
                  </CustomText>
                </View>
              </View>
            }
            contentContainerStyle={[tw`flex-grow`, {paddingBottom: 20}]}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="small" color={designatedColor.VIOLET} />
          </View>
        )}
      </View>
      <View style={[tw`justify-end m-0 h-1 w-full`]}>
        {commentHandler.isKeyboardVisible && (
          <CommentKeyboard
            onSendPress={commentHandler.handleOnPressSendButton}
            text="댓글"
          />
        )}
      </View>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={commentHandler.isModalVisible}
        onRequestClose={() => {
          commentHandler.setIsKeyboardVisible(true);
          commentHandler.setIsModalVisible(false);
        }}
        // style={[
        //   {
        //     justifyContent: 'flex-end',
        //     margin: 0,
        //   },
        //   Platform.OS == 'ios' && {paddingBottom: insets.bottom},
        // ]}
      >
        <TouchableWithoutFeedback
          onPress={() => commentHandler.setIsModalVisible(false)}>
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)] justify-end`}>
            <TouchableWithoutFeedback>
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
                    onPress={() => {
                      commentHandler.handleOnPressBlacklistForIOS();
                      // commentHandler.setIsModalVisible(false);
                      // setTimeout(() => {
                      //   commentHandler.setIsBlacklist(true); // 두 번째 모달 열기
                      // }, 300);
                      // // commentHandler.setIsBlacklist(true);
                      // console.log('차단하기');
                    }}
                    color="white"
                    size={4}
                  />
                </View>
              </View>
              <View style={tw`py-4`}>
                <TextButton
                  title="닫기"
                  onPress={() => {
                    commentHandler.setIsKeyboardVisible(true);
                    commentHandler.setIsModalVisible(false);
                  }}
                  color="white"
                  size={4}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={commentHandler.isModalVisible}
        onRequestClose={() => {
          commentHandler.setIsKeyboardVisible(true);
          commentHandler.setIsModalVisible(false);
        }}
        style={[
          {
            justifyContent: 'flex-end',
            margin: 0,
          },
          Platform.OS == 'ios' && {paddingBottom: insets.bottom + 20},
        ]}>
        <TouchableWithoutFeedback
          onPress={() => commentHandler.setIsModalVisible(false)}>
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)] justify-end`}>
            <TouchableWithoutFeedback>
              {/* View로 감싸서 여러 자식을 포함 */}
              <View style={tw`bg-black`}>
                <CustomText style={tw`text-white font-bold text-xl my-4 px-4`}>
                  댓글
                </CustomText>
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
                      onPress={() => {
                        commentHandler.handleOnPressBlacklistForIOS();
                        // commentHandler.setIsModalVisible(false);
                        // setTimeout(() => {
                        //   commentHandler.setIsBlacklist(true); // 두 번째 모달 열기
                        // }, 300);
                        // // commentHandler.setIsBlacklist(true);
                        // console.log('차단하기');
                      }}
                      color="white"
                      size={4}
                    />
                  </View>
                </View>
                <View style={tw`py-4`}>
                  <TextButton
                    title="닫기"
                    onPress={() => {
                      commentHandler.setIsKeyboardVisible(true);
                      commentHandler.setIsModalVisible(false);
                    }}
                    color="white"
                    size={4}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
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
    </View>
  );
}

export default CommentScreen;
