import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {CommentItem} from './CommentItem';
import {RecommentItem} from './RecommentItem';

interface RecommentlistProps {
  parentComment: Comment;
  recomments: Comment[];
  onPressMoreInfo: (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => void;
  onPressLikeButton: (commentId: number) => void;
}

const Recommentlist: React.FC<RecommentlistProps> = ({
  parentComment,
  recomments,
  onPressMoreInfo,
  onPressLikeButton,
}) => {
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
        isVisibleRecomment={false}
        onPressRecomment={() => {}}
        onPressMoreInfo={() => {
          onPressMoreInfo(item.commentId, item.memberId);
        }}
        onPressLikeButton={() => {
          onPressLikeButton(item.commentId);
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
          likes={parentComment.likes}
          isVisibleRecomment={false}
          onPressRecomment={() => {}}
          onPressMoreInfo={() => {
            onPressMoreInfo(parentComment.commentId, parentComment.memberId);
          }}
          onPressLikeButton={() => {
            onPressLikeButton(parentComment.commentId);
          }}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={recomments}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={(recomments, index) => index.toString()}
    />
    // <Text style={tw`text-white`}>hi!!!!!!!!</Text>
  );
};

export {Recommentlist};
