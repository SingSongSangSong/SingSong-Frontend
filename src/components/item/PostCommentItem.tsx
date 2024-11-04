import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {PostComments, SongOnPostComment} from '../../types';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment, logTrack, showToast} from '../../utils';
import CustomText from '../text/CustomText';
import {CustomModal, PostRecommentItem} from '..';
import Popover from 'react-native-popover-view';
import {useMutation} from '@tanstack/react-query';
import deletePostComment from '../../api/post/deletePostComment';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import postBlacklist from '../../api/comment/postBlacklist';

interface PostCommentItemProps {
  postId: number;
  postCommentId: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isRecomment: boolean;
  isWriter: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  postRecommentsCount: number;
  songOnPostComment: SongOnPostComment[];
  onPressCommentLike: (postCommentId: number) => void;
  setIsRecomment: (isRecomment: boolean) => void;
  inputRef: React.RefObject<TextInput>;
  // onPressRecomment: () => void;
  setParentCommentId: (parentCommentId: number) => void;
  isFocused: boolean; // 포커싱된 상태 전달
  onFocus: () => void;
  commentRecomments: {
    [key: number]: PostComments[];
  };
  setCommentRecomments: React.Dispatch<
    React.SetStateAction<{[key: number]: PostComments[]}>
  >;
  mutateAsyncCommentRecomment: (data: {
    postCommentId: number;
    cursor: number;
    size: number;
  }) => Promise<any>;
  mutateAsyncDeleteComment: (postCommentId: number) => Promise<any>;
  onPressCommentReport: (commentId: number, subjectMemberId: number) => void;
  onPressCommentBlacklist: (memberId: number) => void;
}

const PostCommentItem = ({
  postId,
  postCommentId,
  content,
  createdAt,
  likes,
  isLiked,
  isWriter,
  memberId,
  nickname,
  parentCommentId,
  postRecommentsCount,
  songOnPostComment,
  onPressCommentLike,
  setIsRecomment,
  inputRef,
  setParentCommentId,
  isFocused,
  onFocus,
  commentRecomments,
  setCommentRecomments,
  mutateAsyncCommentRecomment,
  mutateAsyncDeleteComment,
  onPressCommentReport,
  onPressCommentBlacklist,
}: // onPressRecomment,
PostCommentItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  //   const handleOnPressLikeButton = () => {
  //     if (!isLiked) {
  //       onPressLikeButton();
  //     }
  //   };
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [recommentCount, setRecommentCount] =
    useState<number>(postRecommentsCount);
  // const [commentRecomments, setCommentRecomments] = useState<PostComments[]>();
  const [lastCursor, setLastCursor] = useState<number>(-1);
  // const [isFocusRecomment, setIsFocusRecomment] = useState<boolean>(false);
  const [isPressedRecomment, setIsPressedRecomment] = useState<boolean>(false);
  const [isShowBlacklistModal, setIsShowBlacklistModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (commentRecomments[postCommentId]) {
      setRecommentCount(commentRecomments[postCommentId].length);
      // console.log('commentRecomments: ', commentRecomments);
    }
  }, [commentRecomments]);

  const {mutateAsync: mutateAsyncDeleteRecomment} = useMutation({
    mutationFn: async (childCommentId: number) => {
      return deletePostComment(childCommentId);
    },
    onError: () => {
      showToast('답글 삭제에 실패했습니다. 다시 시도해주세요');
    },
    onSuccess: (data, childCommentId) => {
      setCommentRecomments(prevComments => ({
        ...prevComments,
        [postCommentId]: prevComments[postCommentId].filter(
          comment => comment.postCommentId !== childCommentId,
        ),
      }));

      showToast('답글이 삭제되었습니다.');
    },
  });

  const handleOnPressCommentLike = () => {
    onPressCommentLike(postCommentId);
    if (isLike) {
      setLikeCount(likeCount - 1);
      setIsLike(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLike(true);
    }
  };

  const handleOnPressRecomment = () => {
    if (isPressedRecomment) {
      // setIsRecomment(false);
      setIsPressedRecomment(false);
    } else {
      onPressRecomment(postCommentId, lastCursor, 20);
      setIsPressedRecomment(true);
      logTrack('open_recomment_button_click');
    }
  };

  const onPressRecomment = async (
    postCommentId: number,
    cursor: number,
    size: number,
  ) => {
    await mutateAsyncCommentRecomment({
      postCommentId,
      cursor,
      size,
    });
  };

  const handleOnPressCommentDelete = async (postCommentId: number) => {
    await mutateAsyncDeleteComment(postCommentId);
  };

  // const onPressCommentBlacklist = async (memberId: number) => {
  //   await postBlacklist(memberId);
  //   Toast.show({
  //     type: 'selectedToast',
  //     text1: '차단되었습니다.',
  //     position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
  //     visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
  //   });
  // };

  const handleOnPressWriteRecomment = () => {
    setIsRecomment(true);
    // inputRef.current?.focus(); // 키보드 포커싱
    logTrack('write_recomment_button_click');
    setParentCommentId(postCommentId);
    onFocus(); // 포커싱 상태 요청
  };

  const handleOnPressBlacklist = () => {
    // console.log('차단 클릭');
    setIsVisible(false);
    setTimeout(() => {
      setIsShowBlacklistModal(true);
    }, 500);
  };

  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef(null); // MoreVerticalIcon의 위치를 참조할 ref 생성

  return (
    <>
      <View
        style={[
          tw`pb-2 pt-3 px-4 border-b-[0.5px] border-[${designatedColor.GRAY5}]`,
          isFocused && tw`bg-[${designatedColor.GRAY5}] bg-opacity-70`,
        ]}>
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
            {isWriter && (
              <TouchableOpacity
                style={tw`p-4`}
                onPress={() => {
                  handleOnPressCommentDelete(postCommentId);
                  setIsVisible(false);
                }}>
                <CustomText style={tw`text-white`}>삭제</CustomText>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={tw`p-4`}
              onPress={() => {
                // postDetailHandler.onRefresh();
                // console.log('신고클릭');
                onPressCommentReport(postCommentId, memberId);
                setIsVisible(false);
              }}>
              <CustomText style={tw`text-white`}>신고</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`p-4`}
              onPress={() => {
                // postDetailHandler.handleOnPressPostReport();
                // onPressCommentBlacklist(memberId);
                // setIsVisible(false);
                // setIsShowBlacklistModal(true);
                handleOnPressBlacklist();
              }}>
              <CustomText style={tw`text-white`}>차단</CustomText>
            </TouchableOpacity>
            {/* {postDetailHandler.postDetailed?.isWriter && (
              <TouchableOpacity
                style={tw`p-4`}
                onPress={() => {
                  postDetailHandler.setIsShowDeleteModal(true); //삭제 모달 표시
                  setIsVisible(false);
                }}>
                <CustomText style={tw`text-white`}>삭제</CustomText>
              </TouchableOpacity>
            )} */}
          </View>
        </Popover>
        <View
          style={tw`flex-row justify-between items-center
        `}>
          <View style={tw`flex-row items-center mb-1`}>
            <CustomText style={tw`text-white font-bold text-[14px]`}>
              {nickname}
            </CustomText>
            <CustomText
              style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[12px]`}>
              {formatDateComment(createdAt)}
            </CustomText>
          </View>
          <TouchableOpacity
            ref={iconRef}
            onPress={() => {
              setIsVisible(true);
              // console.log('more button clicked');
            }}
            style={tw`p-2`}
            activeOpacity={0.8}>
            <MoreVerticalIcon width={14} height={14} />
          </TouchableOpacity>
          {/* <IconButton
          Icon={MoreVerticalIcon}
          size={16}
          onPress={onPressMoreInfo}
        /> */}
        </View>
        <View>
          <CustomText style={tw`text-[${designatedColor.GRAY1}] pl-1 pt-1`}>
            {content}
          </CustomText>
        </View>

        <View style={tw`justify-between flex-row pt-1 pr-2 items-center`}>
          <View style={tw`flex-row items-center`}>
            {recommentCount > 0 && (
              <TouchableOpacity
                style={tw`pt-1 pb-1 pr-2 `}
                onPress={handleOnPressRecomment}
                activeOpacity={0.8}>
                <>
                  {isPressedRecomment ? (
                    <CustomText style={tw`text-[${designatedColor.VIOLET3}]`}>
                      답글 닫기
                    </CustomText>
                  ) : (
                    <CustomText
                      style={tw`text-[${designatedColor.VIOLET3}] text-[14px]`}>
                      답글 {recommentCount}개 모두 보기
                    </CustomText>
                  )}
                </>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={tw`flex-row items-center px-2 py-2`}
              activeOpacity={0.8}
              onPress={handleOnPressWriteRecomment}
              //   disabled={isLiked}
            >
              <CustomText
                style={tw`text-[${designatedColor.GRAY2}] text-[10px]`}>
                답글 쓰기
              </CustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleOnPressCommentLike}
            style={tw`flex-row items-center`}
            activeOpacity={0.8}
            disabled={isLike}>
            {!isLike ? (
              <View style={tw`p-2 pr-1 justify-center items-center`}>
                <LikeIcon width={14} height={14} />
              </View>
            ) : (
              <View style={tw`p-2 pr-1 justify-center items-center`}>
                <FilledLikeIcon width={14} height={14} />
              </View>
            )}

            <CustomText
              style={[
                isLike
                  ? tw`text-[${designatedColor.PINK}]`
                  : tw`text-[${designatedColor.GRAY1}]`,
                tw`text-[11px]`,
              ]}>
              {likeCount}
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* {isVisibleRecomment && (
        <TouchableOpacity
          onPress={onPressRecomment}
          style={tw`flex-row items-center mx-2 py-1 px-2`}
          activeOpacity={0.8}>
          {recommentCount > 0 ? (
            <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
              답글 {recommentCount}개 모두 보기
            </CustomText>
          ) : (
            <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
              답글
            </CustomText>
          )}

          <TouchableOpacity onPress={onPressRecomment} />
        </TouchableOpacity>
      )} */}
      </View>
      {isPressedRecomment &&
        commentRecomments &&
        commentRecomments[postCommentId] && (
          <View style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
            {commentRecomments[postCommentId].map((item, index) => (
              <View key={index} style={tw`py-2`}>
                {/* <CustomText style={tw`text-[${designatedColor.GRAY1}]`}>
                    {item.content}
                  </CustomText> */}
                <PostRecommentItem
                  postId={postId}
                  postCommentId={item.postCommentId}
                  content={item.content}
                  createdAt={item.createdAt}
                  likes={item.likes}
                  isLiked={item.isLiked}
                  isWriter={item.isWriter}
                  memberId={item.memberId}
                  nickname={item.nickname}
                  parentCommentId={item.parentPostCommentId}
                  onPressCommentLike={() => {
                    onPressCommentLike(item.postCommentId);
                  }}
                  onPressRecommentReport={() => {
                    onPressCommentReport(item.postCommentId, item.memberId);
                  }}
                  onPressRecommentBlacklist={() => {
                    onPressCommentBlacklist(item.memberId);
                  }}
                  // mutateAsyncDeleteRecomment={mutateAsyncDeleteComment}
                  mutateAsyncDeleteRecomment={mutateAsyncDeleteRecomment}
                  // postRecommentsCount={item.postRecommentsCount}
                  // songOnPostComment={item.songOnPostComment}
                  // onPressCommentLike={handleOnPressCommentLike}
                  // setIsRecomment={setIsRecomment}
                  // inputRef={inputRef}
                  // setParentCommentId={setParentCommentId}
                  // isFocused={isFocusRecomment}
                  // onFocus={() => setIsFocusRecomment(true)}
                />
              </View>
            ))}
          </View>
        )}
      <CustomModal
        visible={isShowBlacklistModal}
        onClose={() => setIsShowBlacklistModal(false)}
        message={
          '사용자를 차단하면 이 사용자의 댓글과 활동이 숨겨집니다.\n차단하시겠습니까?'
        }
        onConfirm={() => {
          setIsShowBlacklistModal(false);
          onPressCommentBlacklist(memberId);
        }}
        onCancel={() => setIsShowBlacklistModal(false)}
        confirmText="차단"
        cancelText="취소"
      />
    </>
  );
};

export {PostCommentItem};
