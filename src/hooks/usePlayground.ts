import {useEffect, useState} from 'react';
import {logButtonClick, logRefresh} from '../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {PlaygroundStackParamList, Post} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {playgroundStackNavigations} from '../constants';
import {useQuery} from '@tanstack/react-query';
import getPosts from '../api/post/getPosts';

type UsePlaygroundProps = {
  navigation: StackNavigationProp<
    PlaygroundStackParamList,
    typeof playgroundStackNavigations.PLAYGROUND
  >;
};

const usePlayground = ({navigation}: UsePlaygroundProps) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>(); //songlist를 렌더링하기 위함
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [pageId, setPageId] = useState<number>(1);
  const [lastCursor, setLastCursor] = useState<number>(-1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const size = 20;

  const {
    data: tempPosts,
    error: postsError,
    isFetching: isFetchingPosts,
    // refetch: refetchPosts,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(lastCursor, size),

    staleTime: 3600000, // 1시간 동안 캐시 유지
    select: data => data.data,
  });

  useEffect(() => {
    if (tempPosts) {
      setPosts(tempPosts.posts);
      if (tempPosts.posts.length != 0) {
        setLastCursor(tempPosts.lastCursor);
      }
    }
  }, [tempPosts]);

  //위로 당겨서 새로고침시 실행되는 함수
  const onRefresh = async () => {
    console.log('refreshing!!!!!');
    setRefreshing(true);
    await handleOnRefreshPosts();
    logRefresh('up_posts');
    setRefreshing(false);
  };

  //위로 당길 시 노래 리스트 새로고침하는 함수
  const handleOnRefreshPosts = async () => {
    try {
      if (posts && posts.length < 200) {
        const postData = await getPosts(-1, 20);
        setPosts(postData.data.posts);
        setLastCursor(postData.data.lastCursor);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleDownRefreshPosts = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (posts && posts.length >= 20 && posts.length < 200) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        logRefresh('down_posts');
        getPosts(lastCursor, size)
          .then(response => {
            const postData = response.data.posts;
            setPosts(prev => [...(prev || []), ...postData]);
            setLastCursor(response.data.lastCursor);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error post refreshing:', error);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      setIsLoading(false);
    }
  };

  const handleOnPressWritePost = () => {
    setIsFetching(true);
    navigation.navigate(playgroundStackNavigations.PLAYGROUND_POST_WRITE);
  };

  const handleOnPressPost = (postId: number) => {
    logButtonClick('post_detail');
    navigation.navigate(playgroundStackNavigations.PLAYGROUND_POST_DETAIL, {
      postId,
    });
  };

  return {
    isLoading,
    isFetching,
    setIsFetching,
    postsError,
    isFetchingPosts,
    refreshing,
    onRefresh,
    handleDownRefreshPosts,
    posts,
    handleOnPressWritePost,
    handleOnPressPost,
  };
};

export default usePlayground;
