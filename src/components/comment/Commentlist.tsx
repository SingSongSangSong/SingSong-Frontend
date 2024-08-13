import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {CommentItem} from './CommentItem';

interface CommentlistProps {
  commentData: {[commentId: number]: Comment};
  onPressRecomment: (comment: Comment) => void;
  onPressMoreInfo: (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => void;
  onPressLikeButton: (commentId: number) => void;
  getRecommentCount: (commentId: number) => number;
}

const Commentlist = ({
  commentData,
  onPressRecomment,
  onPressMoreInfo,
  onPressLikeButton,
  getRecommentCount,
}: CommentlistProps) => {
  console.log('commentData', commentData);

  // 객체를 배열로 변환
  const commentArray = Object.values(commentData);

  const renderItem = ({item}: {item: Comment}) => (
    <View style={tw`px-4 py-2`}>
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
        onPressRecomment={() => {
          onPressRecomment(item);
        }}
        onPressMoreInfo={() => {
          onPressMoreInfo(item.commentId, item.memberId);
        }}
        onPressLikeButton={() => {
          onPressLikeButton(item.commentId);
        }}
        isVisibleRecomment={true}
        recommentCount={getRecommentCount(item.commentId)}
      />
    </View>
  );

  return (
    <FlatList
      data={commentArray} // 객체를 배열로 변환하여 FlatList에 전달
      renderItem={renderItem}
      keyExtractor={item => item.commentId.toString()}
    />
  );
};

export {Commentlist};
