import React from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import tw from 'twrnc';
import {Post} from '../../types';
import {PostItem} from '..';
import {designatedColor} from '../../constants';

interface PostListProps {
  posts: Post[];
  handleOnPressPost: (
    postId: number,
    title: string,
    content: string,
    createdAt: string,
    nickname: string,
    likes: number,
    commentCount: number,
  ) => void;
  handleRefreshPost: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  refreshing: boolean;
}

const PostList = ({
  posts,
  handleOnPressPost,
  handleRefreshPost,
  onRefresh,
  isLoading,
  refreshing,
}: PostListProps) => {
  const renderItem = ({item}: {item: Post}) => (
    // <View>
    <PostItem
      postId={item.postId}
      title={item.title}
      content={item.content}
      createdAt={item.createdAt}
      nickname={item.nickname}
      commentCount={item.commentCount}
      likes={item.likes}
      onPressPost={() => {
        handleOnPressPost(
          item.postId,
          item.title,
          item.content,
          item.createdAt,
          item.nickname,
          item.likes,
          item.commentCount,
        );
      }}
    />
    // </View>
  );

  return (
    <FlatList
      data={posts} // 객체를 배열로 변환하여 FlatList에 전달
      renderItem={renderItem}
      keyExtractor={item => item.postId.toString()}
      onEndReached={handleRefreshPost}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() =>
        isLoading ? (
          <View style={tw`py-10`}>
            <ActivityIndicator size="large" color={designatedColor.VIOLET} />
          </View>
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={designatedColor.VIOLET2} // RefreshControl indicator color (iOS)
          colors={[designatedColor.VIOLET2]}
        /> // RefreshControl indicator colors (Android)/>
      }
    />
  );
};

export {PostList};
