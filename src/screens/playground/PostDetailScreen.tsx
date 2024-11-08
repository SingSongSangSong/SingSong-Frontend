import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {PlaygroundStackParamList, PostComments} from '../../types';
import CustomText from '../../components/text/CustomText';
import usePostDetail from '../../hooks/usePostDetail';
import LikeIcon from '../../assets/svg/filledLike.svg';
import LikeGrayIcon from '../../assets/svg/like.svg';
import CommentIcon from '../../assets/svg/comment.svg';
import {
  CommentKeyboard,
  CustomModal,
  PostCommentItem,
  SearchSongV2Item,
} from '../../components';
import CommentGrayIcon from '../../assets/svg/commentGray.svg';
import {formatDatePost, logPageView} from '../../utils';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import Popover from 'react-native-popover-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type PostDetailScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_DETAIL
>;

function PostDetailScreen(props: PostDetailScreenProps) {
  const postDetailHandler = usePostDetail({
    route: props.route,
    navigation: props.navigation,
  });

  console.log('props: ', props.route.params);

  const flatListRef = useRef<FlatList<PostComments>>(null);

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef(null); // MoreVerticalIcon의 위치를 참조할 ref 생성
  const [inputVisible, setInputVisible] = useState<boolean>(true);

  useEffect(() => {
    // 뒤로 가기(슬라이드 포함) 직전에 감지
    const beforeRemoveListener = props.navigation.addListener(
      'beforeRemove',
      e => {
        console.log('Going back or closing the screen.');
        setInputVisible(false);
      },
    );

    return () => {
      beforeRemoveListener();
    };
  }, [props.navigation]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          ref={iconRef}
          onPress={() => {
            setIsVisible(true);
            // console.log('more button clicked');
          }}
          style={tw`p-2 px-4`}>
          <MoreVerticalIcon width={20} height={20} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  const refocusInput = () => {
    postDetailHandler.inputRef.current?.blur(); // 먼저 포커스를 잃게 함
    setTimeout(() => {
      postDetailHandler.inputRef.current?.focus(); // 잠시 후에 다시 포커스
    }, 100);
  };

  // const handleFocusComment = (commentId: number) => {
  //   postDetailHandler.setFocusedCommentId(commentId);

  //   // 포커스를 재설정하는 함수 호출
  //   refocusInput();

  //   // FlatList에서 해당 댓글로 스크롤
  //   const index = postDetailHandler.postComment!.findIndex(
  //     comment => comment.postCommentId === commentId,
  //   );

  //   if (index !== -1 && flatListRef.current) {
  //     flatListRef.current.scrollToIndex({
  //       index,
  //       animated: true,
  //       viewPosition: 0.2, // 스크롤 뷰에서 중간에 위치하게 설정
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     e => {
  //       setKeyboardHeight(e.endCoordinates.height); // 키보드 높이 저장
  //     },
  //   );
  //   // const keyboardDidHideListener = Keyboard.addListener(
  //   //   'keyboardDidHide',
  //   //   () => {
  //   //     setKeyboardHeight(0); // 키보드가 내려가면 0으로 설정
  //   //   },
  //   // );

  //   return () => {
  //     keyboardDidShowListener.remove();
  //     // keyboardDidHideListener.remove();
  //   };
  // }, []);

  const handleFocusComment = (commentId: number) => {
    postDetailHandler.setFocusedCommentId(commentId);
    refocusInput();

    // FlatList에서 해당 댓글로 스크롤
    const index = postDetailHandler.postComment!.findIndex(
      comment => comment.postCommentId === commentId,
    );

    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.2, // 해당 아이템이 화면의 20% 위치에 오도록 설정
        // viewOffset: keyboardHeight, // 키보드 높이만큼 추가로 스크롤
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
      isWriter={item.isWriter}
      memberId={item.memberId}
      nickname={item.nickname}
      parentCommentId={item.parentPostCommentId}
      postRecommentsCount={item.postRecommentsCount}
      songOnPostComment={item.songOnPostComment}
      onPressCommentLike={postDetailHandler.onPressCommentLikeButton}
      setIsRecomment={postDetailHandler.setIsRecomment}
      inputRef={postDetailHandler.inputRef}
      setParentCommentId={postDetailHandler.setParentCommentId}
      isFocused={postDetailHandler.focusedCommentId === item.postCommentId} // 포커싱된 상태 전달
      onFocus={() => handleFocusComment(item.postCommentId)}
      commentRecomments={postDetailHandler.commentRecomments}
      setCommentRecomments={postDetailHandler.setCommentRecomments}
      mutateAsyncCommentRecomment={
        postDetailHandler.mutateAsyncCommentRecomment
      }
      mutateAsyncDeleteComment={postDetailHandler.mutateAsyncDeleteComment}
      onPressCommentReport={postDetailHandler.handleOnPressCommentReport}
      onPressCommentBlacklist={postDetailHandler.handleOnPressCommentBlacklist}
    />
    // </View>
  );

  const handleOnOnPressDelete = () => {
    setIsVisible(false);

    setTimeout(() => {
      postDetailHandler.setIsShowDeleteModal(true);
    }, 300);
  };

  const renderHeader = () => {
    return (
      <View
        style={tw`px-4 pt-2 py-5 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
        <Popover
          isVisible={isVisible}
          onRequestClose={() => setIsVisible(false)}
          from={iconRef} // Popover를 MoreVerticalIcon에서 시작하도록 설정
          arrowSize={{width: 0, height: 0}}
          popoverStyle={{width: 150}}
          // placement="bottom" // 팝업이 아이콘 아래쪽에 위치
          // showArrow={false}
          // arrowStyle={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}
        >
          <View style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
            <TouchableOpacity
              style={tw`p-4`}
              onPress={() => {
                postDetailHandler.onRefresh();
                setIsVisible(false);
              }}>
              <CustomText style={tw`text-white`}>새로고침</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-4`}
              onPress={() => {
                postDetailHandler.handleOnPressPostReport();
                setIsVisible(false);
              }}>
              <CustomText style={tw`text-white`}>신고</CustomText>
            </TouchableOpacity>
            {postDetailHandler.postDetailed?.isWriter && (
              <TouchableOpacity
                style={tw`p-4`}
                onPress={() => {
                  // console.log('delete button clicked');
                  // postDetailHandler.setIsShowDeleteModal(true); //삭제 모달 표시
                  handleOnOnPressDelete();
                }}>
                <CustomText style={tw`text-white`}>삭제</CustomText>
              </TouchableOpacity>
            )}
          </View>
        </Popover>
        <View style={tw`flex-row items-center`}>
          <CustomText style={tw`text-[${designatedColor.VIOLET3}] py-1`}>
            {props.route.params.nickname}
          </CustomText>
          <CustomText
            style={tw`text-[${designatedColor.GRAY1}] py-1 text-[12px]`}>
            {'  '}
            {formatDatePost(props.route.params.createdAt)}
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
        <View style={tw`mb-4`}>
          {postDetailHandler.postDetailed?.songs.map((item, index) => (
            <View key={index} style={tw`py-2`}>
              <SearchSongV2Item
                songId={item.songId}
                songNumber={item.songNumber}
                songName={item.songName}
                singerName={item.singerName}
                album={item.album}
                isKeep={false}
                isMr={item.isMr}
                isLive={item.isLive}
                isShowKeepIcon={false}
                onSongPress={() => {}}
              />
            </View>
          ))}
        </View>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            style={tw`flex-row items-center py-2 px-3 rounded-lg bg-[${designatedColor.GRAY5}]`}
            activeOpacity={0.9}
            onPress={postDetailHandler.onPressPostLikeButton}>
            {postDetailHandler.postDetailed?.isLiked ? (
              <LikeIcon width={16} height={16} />
            ) : (
              <LikeGrayIcon width={16} height={16} />
            )}

            <CustomText
              style={[
                tw`text-[${designatedColor.GRAY1}] text-[12px] pl-1`,
                postDetailHandler.postDetailed?.isLiked &&
                  tw`text-[${designatedColor.PINK}]`,
              ]}>
              좋아요
            </CustomText>
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            {/* <View style={tw`flex-row items-center`}> */}
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={postDetailHandler.onPressPostLikeButton}
              activeOpacity={0.9}>
              <LikeIcon width={14} height={14} />
              <CustomText
                style={tw`text-[${designatedColor.PINK}] pl-1 text-[14px]`}>
                {postDetailHandler.likes}
              </CustomText>
            </TouchableOpacity>
            {/* </View> */}
            <View style={tw`flex-row items-center pl-2`}>
              <CommentIcon width={14} height={14} />
              <CustomText
                style={tw`text-[${designatedColor.MINT}] pl-1 text-[14px]`}>
                {postDetailHandler.commentCount}
              </CustomText>
            </View>
          </View>
        </View>
        <CustomModal
          visible={postDetailHandler.isShowDeleteModal}
          onClose={() => postDetailHandler.setIsShowDeleteModal(false)}
          message={'게시글을 삭제하시겠습니까?'}
          onConfirm={() => {
            // setIsVisible(false);
            postDetailHandler.setIsShowDeleteModal(false);
            postDetailHandler.handleDeletePost();
          }}
          onCancel={() => {
            // setIsVisible(false);
            postDetailHandler.setIsShowDeleteModal(false);
          }}
          confirmText="삭제"
          cancelText="취소"
        />
      </View>
    );
  };

  const insets = useSafeAreaInsets();

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
        // <View style={tw`flex-1 w-full`}>
        <View
          style={[
            tw`flex-1 w-full`,
            {paddingBottom: insets.bottom + 80},
            // {paddingBottom: 120},
            // postDetailHandler.isRecomment
            //   ? {marginBottom: keyboardHeight}
            //   : {
            //       paddingBottom: insets.bottom + 70,
            //     },
          ]}>
          {/* <PostCommentList postComment={postDetailHandler.postComment} /> */}
          <View style={tw`flex-1 w-full`}>
            <FlatList
              data={postDetailHandler.postComment}
              ref={flatListRef}
              renderItem={renderItem}
              keyExtractor={item => item.postCommentId.toString()}
              ListHeaderComponent={renderHeader}
              onEndReached={postDetailHandler.handleDownRefreshComments}
              onEndReachedThreshold={0.1}
              ListEmptyComponent={
                <View
                  style={[
                    tw`flex-1 w-full h-full justify-center items-center`,
                    {
                      minHeight: 300,
                    },
                  ]}>
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
              ListFooterComponent={() =>
                postDetailHandler.isLoading ? (
                  <View style={tw`py-10`}>
                    <ActivityIndicator
                      size="large"
                      color={designatedColor.VIOLET}
                    />
                  </View>
                ) : (
                  <View style={{height: 120}} />
                )
              }
            />
          </View>
        </View>
      )}

      {/* <CommentV2List postComment={postDetailHandler.postComment}  /> */}

      <View style={[tw`justify-end m-0 h-1 w-full`]}>
        {inputVisible && (
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
