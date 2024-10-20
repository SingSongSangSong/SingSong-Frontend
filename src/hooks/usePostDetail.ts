import {StackNavigationProp} from '@react-navigation/stack';
import {PlaygroundStackParamList, PostComments, PostDetailed} from '../types';
import {playgroundStackNavigations} from '../constants';
import {useMutation, useQuery} from '@tanstack/react-query';
import getPostsDetailed from '../api/post/getPostsDetailed';
import {RouteProp} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import postPostsComments from '../api/post/postPostsComments';
import Toast from 'react-native-toast-message';
import getPostsComments from '../api/post/getPostsComments';
import postPostsLike from '../api/post/postPostsLike';
import postPostsCommentsLike from '../api/post/postPostsCommentsLike';
import {Keyboard, TextInput} from 'react-native';
import getPostsCommentsRecomments from '../api/post/getPostsCommentsRecomments';
import deletePosts from '../api/post/deletePosts';
import usePostStore from '../store/usePostStore';
import postBlacklist from '../api/comment/postBlacklist';
import {logRefresh, logTrack} from '../utils';

type UsePostDetailProps = {
  navigation: StackNavigationProp<
    PlaygroundStackParamList,
    typeof playgroundStackNavigations.PLAYGROUND_POST_DETAIL
  >;
  route: RouteProp<
    PlaygroundStackParamList,
    typeof playgroundStackNavigations.PLAYGROUND_POST_DETAIL
  >;
};

const usePostDetail = ({navigation, route}: UsePostDetailProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [postDetailed, setPostDetailed] = useState<PostDetailed>();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(true);
  const [content, setContent] = useState<string>('');
  const [isRecomment, setIsRecomment] = useState<boolean>(false);
  const [parentCommentId, setParentCommentId] = useState<number>(0);
  const [songIds, setSongIds] = useState<number[]>([]);
  const [lastCursor, setLastCursor] = useState<number>(-1);
  const [postComment, setPostComment] = useState<PostComments[]>();
  const [commentCount, setCommentCount] = useState<number>(
    route.params.commentCount,
  );
  const [likes, setLikes] = useState<number>(route.params.likes);
  // const [isRecomment, setIsRecoment] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const [commentRecomments, setCommentRecomments] = useState<{
    [key: number]: PostComments[];
  }>({});
  // const [ignoreNextDismiss, setIgnoreNextDismiss] = useState<boolean>(false);
  const [focusedCommentId, setFocusedCommentId] = useState<number>();
  const [isShowMoreMenu, setIsShowMoreMenu] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const deletePost = usePostStore(state => state.deletePost);
  const deletePostFromMemberId = usePostStore(
    state => state.deletePostFromMemberId,
  );
  const [isRefreshLoading, setIsRefreshLoading] = useState<boolean>(false);
  const [isEnded, setIsEnded] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyboardHide = () => {
      // console.log('ignoreNextDismiss: ', ignoreNextDismiss);
      // if (!ignoreNextDismiss) {
      setFocusedCommentId(undefined);
      setIsRecomment(false); // 보통 dismiss 시 isRecomment를 false로 설정
      // }
      // setIgnoreNextDismiss(false); // dismiss 이벤트를 처리 후 reset
    };

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    data: tempPostDetailed,
    error: postsError,
    isFetching: isFetchingPosts,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: [`postsDetailed_${route.params.postId}`],
    queryFn: () => getPostsDetailed(route.params.postId),

    staleTime: 0,
    select: data => data.data,
  });

  useEffect(() => {
    if (tempPostDetailed) {
      setPostDetailed(tempPostDetailed);
      setLikes(tempPostDetailed.likes);
      console.log('tempPostDetailed:', tempPostDetailed);
      console.log('tempPostDetailed song:', tempPostDetailed.songs);
    }
  }, [tempPostDetailed]);

  const {
    data: tempPostComment,
    error: postsCommentError,
    isFetching: isFetchingCommentPosts,
    refetch: refetchPostsComment,
  } = useQuery({
    queryKey: [`postsComment_${route.params.postId}`],
    queryFn: () => getPostsComments(route.params.postId, -1, 20),
    staleTime: 0, // 1시간 동안 캐시 유지
    select: data => data.data,
  });

  const {mutateAsync, isLoading} = useMutation({
    mutationFn: async (content: string) => {
      if (content.trim() === '') {
        Toast.show({
          type: 'selectedToast',
          text1: '내용을 입력해주세요.',
          position: 'bottom',
          visibilityTime: 2000,
        });
        // throw new Error('제목과 내용을 입력해주세요.');
        return;
      }
      return postPostsComments(
        content,
        isRecomment,
        parentCommentId,
        route.params.postId,
        songIds,
      );
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: newCommentData => {
      if (newCommentData) {
        if (newCommentData.data.isRecomment) {
          // console.log('is Recomments...');
          const postComments = newCommentData.data;
          setCommentRecomments(prev => ({
            ...prev,
            [parentCommentId]: [...(prev[parentCommentId] || []), postComments],
          }));
        } else {
          // console.log('is not Recomments...');
          // 새로운 댓글 데이터를 postComment 상태에 추가
          setPostComment(prev => [
            ...(prev || []),
            newCommentData.data, // newCommentData의 postComments 배열을 업데이트
          ]);
        }
      }
      setContent('');
      setParentCommentId(0);
      setSongIds([]);
      setIsRecomment(false);
      setCommentCount(prevCount => prevCount + 1);
      // console.log('newCommentData: ', newCommentData);
    },
  });

  const {mutateAsync: mutateAsyncPostLike} = useMutation({
    mutationFn: async (postId: number) => {
      // console.log('postId: ', postId);
      // if (content.trim() === '') {
      //   Toast.show({
      //     type: 'selectedToast',
      //     text1: '내용을 입력해주세요.',
      //     position: 'bottom',
      //     visibilityTime: 2000,
      //   });
      //   throw new Error('제목과 내용을 입력해주세요.');
      // }
      return postPostsLike(postId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: () => {
      // setContent('');
      setLikes(likes + 1);
      Toast.show({
        type: 'selectedToast',
        text1: '좋아요가 등록되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      setPostDetailed(prev => {
        if (prev) {
          return {...prev, isLiked: true};
        }
        return prev; // 상태가 없으면 이전 상태를 그대로 반환
      });
    },
  });

  const {mutateAsync: mutateAsyncCommentLike} = useMutation({
    mutationFn: async (postCommentId: number) => {
      // console.log('postCommentId: ', postCommentId);
      // if (content.trim() === '') {
      //   Toast.show({
      //     type: 'selectedToast',
      //     text1: '내용을 입력해주세요.',
      //     position: 'bottom',
      //     visibilityTime: 2000,
      //   });
      //   throw new Error('제목과 내용을 입력해주세요.');
      // }
      return postPostsCommentsLike(postCommentId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: () => {
      // setContent('');
      // setLikes(likes + 1);
      Toast.show({
        type: 'selectedToast',
        text1: '좋아요가 등록되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
  });

  const {mutateAsync: mutateAsyncDeletePost} = useMutation({
    mutationFn: async (postId: number) => {
      return deletePosts(postId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: () => {
      // setContent('');
      // setLikes(likes + 1);
      deletePost(route.params.postId);
      Toast.show({
        type: 'selectedToast',
        text1: '게시물이 삭제되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      navigation.goBack(); //뒤로가기
    },
  });

  const {mutateAsync: mutateAsyncCommentRecomment} = useMutation({
    mutationFn: async ({
      postCommentId,
      cursor,
      size,
    }: {
      postCommentId: number;
      cursor: number;
      size: number;
    }) => {
      // console.log('currentpostCommentId: ', postCommentId);
      return getPostsCommentsRecomments(postCommentId, cursor, size);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: (tempPostCommentRecomment, {postCommentId}) => {
      const {postReComments} = tempPostCommentRecomment.data;
      // console.log('currentId:', postCommentId);
      setCommentRecomments(prev => ({
        ...prev,
        [postCommentId]: [...postReComments],
      }));
      // console.log('postReComments: ', postReComments);

      // 마지막 커서 갱신
      // setLastCursor(tempPostCommentRecomment.data.lastCursor);
    },
  });

  const {mutateAsync: mutateAsyncCommentBlacklist} = useMutation({
    mutationFn: async (memberId: number) => {
      return postBlacklist(memberId);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: (data, memberId) => {
      Toast.show({
        type: 'selectedToast',
        text1: '차단되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      deletePostFromMemberId(memberId); //memberId와 일치하는 게시물 삭제
      navigation.goBack();
    },
  });

  useEffect(() => {
    if (tempPostDetailed) {
      setPostDetailed(tempPostDetailed);
    }
  }, [tempPostDetailed]);

  useEffect(() => {
    if (tempPostComment) {
      // console.log('refresh!!!');
      setPostComment(tempPostComment.postComments);
      setLastCursor(tempPostComment.lastCursor); //댓글 커서 갱신
      // console.log('lastCursor:', tempPostComment.lastCursor);
      setCommentCount(tempPostComment.totalPostCommentCount);
    }
  }, [tempPostComment]);

  // const handleOnPressSendButton = async (content: string) => {
  //   setContent(content);
  //   console.log('content: ', content);
  //   await mutateAsync(content);
  // };
  const handleOnPressSendButton = async (content: string) => {
    setContent(content);
    // console.log('content: ', content);

    // setIgnoreNextDismiss(true); // 보내기 버튼을 눌렀으므로 키보드 dismiss 이벤트 무시
    await mutateAsync(content); // 여기서 postCommentId를 함께 전달
    // setIgnoreNextDismiss(false);
    logTrack('post_comment_send_button_click');
    setIsRecomment(false); // 필요에 따라 isRecomment를 false로 설정
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPosts();
    await refetchPostsComment();
    setRefreshing(false);
  };

  const onPressPostLikeButton = async () => {
    // console.log('hi!!!');
    if (postDetailed && postDetailed.isLiked) {
      Toast.show({
        type: 'selectedToast',
        text1: '이미 좋아요를 누르셨습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }
    logTrack('post_like_button_click');
    await mutateAsyncPostLike(route.params.postId);
  };

  const onPressCommentLikeButton = async (postCommentId: number) => {
    logTrack('comment_like_button_click');
    await mutateAsyncCommentLike(postCommentId);
  };

  const handleOnPressPostReport = () => {
    // console.log('post report button clicked');
    navigation.navigate(playgroundStackNavigations.PLAYGROUND_POST_REPORT, {
      reportPostId: route.params.postId,
      reportSubjectMemberId: postDetailed?.memberId || 0,
    });
  };

  const handleDeletePost = async () => {
    logTrack('post_delete_button_click');
    await mutateAsyncDeletePost(route.params.postId);
  };

  const handleOnPressCommentReport = (
    commentId: number,
    subjectMemberId: number,
  ) => {
    navigation.navigate(playgroundStackNavigations.PLAYGROUND_COMMENT_REPORT, {
      reportCommentId: commentId,
      reportCommentSubjectMemberId: subjectMemberId,
    });
  };

  const handleOnPressCommentBlacklist = async (memberId: number) => {
    await mutateAsyncCommentBlacklist(memberId);
  };

  const handleDownRefreshComments = async () => {
    // console.log('lastCursor: ', lastCursor);
    if (isRefreshLoading || isEnded) {
      return;
    }
    try {
      setIsRefreshLoading(true);
      //20개 이상일 경우에만 api 호출
      if (postComment && postComment.length >= 20) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        logRefresh('down_post_Comments');
        logTrack('down_post_Comments');
        // console.log('pageId:', pageId);
        getPostsComments(route.params.postId, lastCursor, 20)
          // getSongsNew(lastCursor, 20)
          .then(response => {
            const commentData = response.data.postComments;
            // console.log('newsongData:', response.data.songs);
            // const newSongLst = updateRefreshSongs(initTag, songData);
            if (commentData.length === 0) {
              setIsEnded(true);
            }
            setPostComment(prev => [...(prev || []), ...commentData]);
            setLastCursor(response.data.lastCursor);
            setIsRefreshLoading(false);
          })
          .catch(error => {
            console.error('Error post comment data:', error);
            setIsRefreshLoading(false);
          });
      } else {
        setIsRefreshLoading(false);
      }
    } catch (error) {
      console.error('Error fetching comment:', error);
      setIsRefreshLoading(false);
    }
  };

  return {
    postDetailed,
    postsError,
    isFetchingPosts,
    isKeyboardVisible,
    handleOnPressSendButton,
    commentCount,
    postComment,
    refreshing,
    onRefresh,
    likes,
    onPressPostLikeButton,
    onPressCommentLikeButton,
    isRecomment,
    setIsRecomment,
    inputRef,
    setParentCommentId,
    mutateAsyncCommentRecomment,
    commentRecomments,
    focusedCommentId,
    setFocusedCommentId,
    isShowMoreMenu,
    setIsShowMoreMenu,
    handleOnPressPostReport,
    isShowDeleteModal,
    setIsShowDeleteModal,
    handleDeletePost,
    handleOnPressCommentReport,
    handleOnPressCommentBlacklist,
    isRefreshLoading,
    handleDownRefreshComments,
  };
};

export default usePostDetail;
