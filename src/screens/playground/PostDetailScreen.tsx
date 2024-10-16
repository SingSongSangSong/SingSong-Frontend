import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {PlaygroundStackParamList, PostComments} from '../../types';
import CustomText from '../../components/text/CustomText';
// import SearchIcon from '../../assets/svg/search.svg';
import usePostDetail from '../../hooks/usePostDetail';
import LikeIcon from '../../assets/svg/filledLike.svg';
import LikeGrayIcon from '../../assets/svg/like.svg';
import CommentIcon from '../../assets/svg/comment.svg';
import {CommentKeyboard, PostCommentItem} from '../../components';
import CommentGrayIcon from '../../assets/svg/commentGray.svg';
import {formatDateComment} from '../../utils';

type PostDetailScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_DETAIL
>;

function PostDetailScreen(props: PostDetailScreenProps) {
  const postDetailHandler = usePostDetail({
    route: props.route,
    navigation: props.navigation,
  });

  const flatListRef = useRef<FlatList<PostComments>>(null);
  const [focusedCommentId, setFocusedCommentId] = useState<number>();

  useEffect(() => {
    // 키보드가 닫힐 때 실행할 추가 로직
    const handleKeyboardHide = () => {
      setFocusedCommentId(undefined);
      postDetailHandler.setIsRecomment(false);
    };

    // 키보드가 닫힐 때 감지
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    // 컴포넌트가 언마운트될 때 리스너 정리
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const refocusInput = () => {
    postDetailHandler.inputRef.current?.blur(); // 먼저 포커스를 잃게 함
    setTimeout(() => {
      postDetailHandler.inputRef.current?.focus(); // 잠시 후에 다시 포커스
    }, 100);
  };

  const handleFocusComment = (commentId: number) => {
    setFocusedCommentId(commentId);

    // 포커스를 재설정하는 함수 호출
    refocusInput();

    // FlatList에서 해당 댓글로 스크롤
    const index = postDetailHandler.postComment!.findIndex(
      comment => comment.postCommentId === commentId,
    );

    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.2, // 스크롤 뷰에서 중간에 위치하게 설정
      });
    }
  };

  const renderItem = ({item}: {item: PostComments}) => (
    // <View style={tw`w-full px-2 py-2`}>
    <PostCommentItem
      key={item.postCommentId}
      postId={item.postId}
      postCommentId={item.postCommentId}
      content={item.content}
      createdAt={item.createdAt}
      isLiked={item.isLiked}
      likes={item.likes}
      isRecomment={item.isRecomment}
      memberId={item.memberId}
      nickname={item.nickname}
      parentCommentId={item.parentPostCommentId}
      postRecommentsCount={item.postRecommentsCount}
      songOnPostComment={item.songOnPostComment}
      onPressCommentLike={postDetailHandler.onPressCommentLikeButton}
      setIsRecomment={postDetailHandler.setIsRecomment}
      inputRef={postDetailHandler.inputRef}
      setParentCommentId={postDetailHandler.setParentCommentId}
      isFocused={focusedCommentId === item.postCommentId} // 포커싱된 상태 전달
      onFocus={() => handleFocusComment(item.postCommentId)}
      commentRecomments={postDetailHandler.commentRecomments}
      mutateAsyncCommentRecomment={
        postDetailHandler.mutateAsyncCommentRecomment
      }
    />
    // </View>
  );

  const renderHeader = () => {
    return (
      <View
        style={tw`px-4 pt-2 py-5 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
        <View style={tw`flex-row items-center`}>
          <CustomText style={tw`text-[${designatedColor.VIOLET3}] py-1`}>
            {props.route.params.nickname}
          </CustomText>
          <CustomText
            style={tw`text-[${designatedColor.GRAY1}] py-1 text-[12px]`}>
            {'  '}
            {formatDateComment(props.route.params.createdAt)}
          </CustomText>
        </View>
        <View style={tw`py-2`}>
          <CustomText
            style={tw`text-[${designatedColor.WHITE}] font-bold text-[20px]`}>
            {props.route.params.title}
          </CustomText>
          <CustomText style={tw`text-[${designatedColor.WHITE}] py-4`}>
            {props.route.params.content}
          </CustomText>
        </View>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            style={tw`flex-row items-center py-2 px-3 rounded-lg bg-[${designatedColor.GRAY5}]`}
            activeOpacity={0.9}
            onPress={postDetailHandler.onPressPostLikeButton}>
            <LikeGrayIcon width={16} height={16} />
            <CustomText
              style={tw`text-[${designatedColor.GRAY1}] text-[12px] pl-1`}>
              좋아요
            </CustomText>
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-row items-center`}>
              <LikeIcon width={14} height={14} />
              <CustomText
                style={tw`text-[${designatedColor.PINK}] pl-1 text-[14px]`}>
                {postDetailHandler.likes}
              </CustomText>
            </View>
            <View style={tw`flex-row items-center pl-2`}>
              <CommentIcon width={14} height={14} />
              <CustomText
                style={tw`text-[${designatedColor.MINT}] pl-1 text-[14px]`}>
                {postDetailHandler.commentCount}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        // {
        //   paddingTop: insets.top,
        //   paddingBottom: insets.bottom,
        //   paddingLeft: insets.left,
        //   paddingRight: insets.right,
        // },
      ]}>
      {postDetailHandler.postComment && (
        <View style={tw`flex-1 w-full`}>
          {/* <PostCommentList postComment={postDetailHandler.postComment} /> */}
          <View style={tw`flex-1 w-full`}>
            <FlatList
              data={postDetailHandler.postComment}
              ref={flatListRef}
              renderItem={renderItem}
              keyExtractor={item => item.postCommentId.toString()}
              ListHeaderComponent={renderHeader}
              ListEmptyComponent={
                <View
                  style={tw`flex-1 w-full h-full justify-center items-center`}>
                  <View style={tw`flex-1 justify-center items-center`}>
                    <CommentGrayIcon width={50} height={50} />
                    <CustomText
                      style={tw`text-[${designatedColor.GRAY1}] mt-4`}>
                      첫 댓글을 작성해주세요
                    </CustomText>
                  </View>
                </View>
              }
              contentContainerStyle={[tw`flex-grow`, {paddingBottom: 80}]}
              refreshControl={
                <RefreshControl
                  refreshing={postDetailHandler.refreshing}
                  onRefresh={postDetailHandler.onRefresh}
                  tintColor={designatedColor.VIOLET2} // RefreshControl indicator color (iOS)
                  colors={[designatedColor.VIOLET2]}
                /> // RefreshControl indicator colors (Android)/>
              }
            />
          </View>
        </View>
      )}

      {/* <CommentV2List postComment={postDetailHandler.postComment}  /> */}

      <View style={[tw`justify-end m-0 h-1 w-full`]}>
        {postDetailHandler.isKeyboardVisible && (
          <CommentKeyboard
            onSendPress={postDetailHandler.handleOnPressSendButton}
            text={postDetailHandler.isRecomment ? '답글' : '댓글'}
            inputRef={postDetailHandler.inputRef}
          />
        )}
      </View>
    </View>
  );
}

export default PostDetailScreen;
