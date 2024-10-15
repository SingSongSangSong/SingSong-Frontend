import {StackNavigationProp} from '@react-navigation/stack';
import {PlaygroundStackParamList, PostComments, PostDetailed} from '../types';
import {playgroundStackNavigations} from '../constants';
import {useMutation, useQuery} from '@tanstack/react-query';
import getPostsDetailed from '../api/post/getPostsDetailed';
import {RouteProp} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import postPostsComments from '../api/post/postPostsComments';
import Toast from 'react-native-toast-message';
import getPostsComments from '../api/post/getPostsComments';
import postPostsLike from '../api/post/postPostsLike';
import postPostsCommentsLike from '../api/post/postPostsCommentsLike';

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
      console.log('content22: ', content);
      if (content.trim() === '') {
        Toast.show({
          type: 'selectedToast',
          text1: '내용을 입력해주세요.',
          position: 'bottom',
          visibilityTime: 2000,
        });
        throw new Error('제목과 내용을 입력해주세요.');
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
      setContent('');
      console.log('newCommentData: ', newCommentData);
      if (newCommentData) {
        // 새로운 댓글 데이터를 postComment 상태에 추가
        setPostComment(prev => [
          ...(prev || []),
          newCommentData.data, // newCommentData의 postComments 배열을 업데이트
        ]);
      }
    },
  });

  const {mutateAsync: mutateAsyncPostLike} = useMutation({
    mutationFn: async (postId: number) => {
      console.log('postId: ', postId);
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
    },
  });

  const {mutateAsync: mutateAsyncCommentLike} = useMutation({
    mutationFn: async (postCommentId: number) => {
      console.log('postCommentId: ', postCommentId);
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

  useEffect(() => {
    if (tempPostDetailed) {
      setPostDetailed(tempPostDetailed);
    }
  }, [tempPostDetailed]);

  useEffect(() => {
    if (tempPostComment) {
      console.log('refresh!!!');
      setPostComment(tempPostComment.postComments);
      setLastCursor(tempPostComment.lastCursor);
      setCommentCount(tempPostComment.totalPostCommentCount);
    }
  }, [tempPostComment]);

  const handleOnPressSendButton = async (content: string) => {
    setContent(content);
    console.log('content: ', content);
    await mutateAsync(content);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchPosts();
    await refetchPostsComment();
    setRefreshing(false);
  };

  const onPressPostLikeButton = async () => {
    await mutateAsyncPostLike(route.params.postId);
  };

  const onPressCommentLikeButton = async (postCommentId: number) => {
    await mutateAsyncCommentLike(postCommentId);
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
  };
};

export default usePostDetail;
