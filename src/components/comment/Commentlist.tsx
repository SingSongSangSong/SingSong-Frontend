import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {Comment} from '../../types';
import {CommentItem} from './CommentItem';

interface CommentlistProps {
  commentData: Comment[];
  onPressRecomment: (comment: Comment) => void;
}

const Commentlist: React.FC<CommentlistProps> = ({
  commentData,
  onPressRecomment,
}) => {
  console.log('commentData', commentData);
  const renderItem = ({item}: {item: Comment}) => (
    <View style={tw`px-4 py-2`}>
      <CommentItem
        commentId={item.commentId}
        content={item.content}
        createdAt={item.createdAt}
        isRecomment={item.isRecomment}
        memberId={item.memberId}
        nickname={item.nickname}
        parentCommentId={item.parentCommentId}
        recomments={item.recomments}
        songId={item.songId}
        onPressRecomment={() => {
          onPressRecomment(item);
        }}
        isVisibleRecomment={true}
      />
    </View>
  );

  return (
    <FlatList
      data={commentData}
      renderItem={renderItem}
      //   keyExtractor={item => item.songId.toString()}
    />
    // <Text style={tw`text-white`}>hi!!!!!!!!</Text>
  );
};

export {Commentlist};
