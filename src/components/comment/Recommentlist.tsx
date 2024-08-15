import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {CommentItem} from './CommentItem';
import {RecommentItem} from './RecommentItem';

interface RecommentlistProps {
  parentComment: Comment;
  recomments: Comment[]; // 객체로 수정
  onPressMoreInfo: (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => void;
  onPressCommentLikeButton: (commentId: number) => void;
  onPressRecommentLikeButton: (commentId: number, recommentId: number) => void;
}

const Recommentlist: React.FC<RecommentlistProps> = ({
  parentComment,
  recomments = [],
  onPressMoreInfo,
  onPressCommentLikeButton,
  onPressRecommentLikeButton,
}) => {
  // 객체를 배열로 변환

  const renderItem = ({item}: {item: Comment}) => (
    <View style={tw`px-4 py-2`}>
      <RecommentItem
        commentId={item.commentId}
        content={item.content}
        createdAt={item.createdAt}
        isRecomment={item.isRecomment}
        memberId={item.memberId}
        nickname={item.nickname}
        parentCommentId={item.parentCommentId}
        recomments={item.recomments}
        songId={item.songId}
        likes={item.likes}
        isLiked={item.isLiked}
        isVisibleRecomment={false}
        onPressRecomment={() => {}}
        onPressMoreInfo={() => {
          onPressMoreInfo(item.commentId, item.memberId);
        }}
        onPressLikeButton={() => {
          onPressRecommentLikeButton(item.parentCommentId, item.commentId);
        }}
      />
    </View>
  );

  const renderHeader = () => {
    return (
      <View>
        <CommentItem
          commentId={parentComment.commentId}
          content={parentComment.content}
          createdAt={parentComment.createdAt}
          isRecomment={parentComment.isRecomment}
          memberId={parentComment.memberId}
          nickname={parentComment.nickname}
          parentCommentId={parentComment.parentCommentId}
          recomments={parentComment.recomments}
          songId={parentComment.songId}
          isLiked={parentComment.isLiked}
          likes={parentComment.likes}
          isVisibleRecomment={false}
          onPressRecomment={() => {}}
          onPressMoreInfo={() => {
            onPressMoreInfo(parentComment.commentId, parentComment.memberId);
          }}
          onPressLikeButton={() => {
            onPressCommentLikeButton(parentComment.commentId);
          }}
          recommentCount={0}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={recomments} // 객체를 배열로 변환하여 FlatList에 전달
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={item => item.commentId.toString()} // commentId를 사용하여 고유한 키 생성
    />
  );
};

export {Recommentlist};
