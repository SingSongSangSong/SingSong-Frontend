import React from 'react';
import {FlatList, View} from 'react-native';
import tw from 'twrnc';
import {PostComments} from '../../types';
import {designatedColor} from '../../constants';
import CommentGrayIcon from '../../assets/svg/commentGray.svg';
import CustomText from '../text/CustomText';
import {PostCommentItem} from '..';

interface PostCommentListProps {
  postComment: PostComments[];
}

const PostCommentList = ({postComment}: PostCommentListProps) => {
  const renderItem = ({item}: {item: PostComments}) => (
    // <View style={tw`w-full px-2 py-2`}>
    <PostCommentItem
      postId={item.postId}
      postCommentId={item.postCommentId}
      content={item.content}
      createdAt={item.createdAt}
      isLiked={item.isLiked}
      likes={item.likes}
      isRecomment={item.isRecomment}
      memberId={item.memberId}
      nickname={item.nickname}
      parentCommentId={item.parentPostCommentId}
      postRecommentsCount={item.postRecommentsCount}
      songOnPostComment={item.songOnPostComment}
      // onPressRecomment={() => handleOnPressRecomment(item)}
      // onPressMoreInfo={() =>
      //   commentHandler.handleOnPressMoreInfo(item.commentId, item.memberId)
      // }
      // onPressLikeButton={() =>
      //   commentHandler.handleOnPressLikeButton(item.commentId)
      // }
      // isVisibleRecomment={true}
      // recommentCount={commentHandler.getRecommentCount(item.commentId)}
    />
    // </View>
  );

  return (
    <View style={tw`w-full `}>
      <FlatList
        data={postComment}
        renderItem={renderItem}
        keyExtractor={item => item.postCommentId.toString()}
        ListEmptyComponent={
          <View style={tw`w-full h-full justify-center items-center`}>
            <View style={tw`flex-1 justify-center items-center`}>
              <CommentGrayIcon width={50} height={50} />
              <CustomText style={tw`text-[${designatedColor.GRAY1}] mt-4`}>
                첫 댓글을 작성해주세요
              </CustomText>
            </View>
          </View>
        }
        contentContainerStyle={[tw`flex-grow`, {paddingBottom: 100}]}
      />
    </View>
  );
};

export {PostCommentList};
