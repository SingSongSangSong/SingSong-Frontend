import React from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {PlaygroundStackParamList, PostComments} from '../../types';
import CustomText from '../../components/text/CustomText';
// import SearchIcon from '../../assets/svg/search.svg';
import usePostDetail from '../../hooks/usePostDetail';
import LikeIcon from '../../assets/svg/filledLike.svg';
import LikeGrayIcon from '../../assets/svg/like.svg';
import CommentIcon from '../../assets/svg/comment.svg';
import {
  CommentKeyboard,
  PostCommentItem,
  PostCommentList,
} from '../../components';
import CommentGrayIcon from '../../assets/svg/commentGray.svg';

type PostDetailScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_DETAIL
>;

function PostDetailScreen(props: PostDetailScreenProps) {
  const postDetailHandler = usePostDetail({
    route: props.route,
    navigation: props.navigation,
  });

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
      onPressCommentLike={() =>
        postDetailHandler.onPressCommentLikeButton(item.postCommentId)
      }
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

  const renderHeader = () => {
    return (
      <View
        style={tw`px-4 pt-2 py-5 border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
        <View>
          <CustomText style={tw`text-[${designatedColor.VIOLET3}] py-1`}>
            {props.route.params.nickname}
          </CustomText>
        </View>
        <View style={tw`py-2`}>
          <CustomText
            style={tw`text-[${designatedColor.WHITE}] font-bold text-[20px]`}>
            {props.route.params.title}
          </CustomText>
          <CustomText style={tw`text-[${designatedColor.WHITE}] py-4`}>
            {props.route.params.content}
          </CustomText>
        </View>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            style={tw`flex-row items-center py-2 px-3 rounded-lg bg-[${designatedColor.GRAY5}]`}
            activeOpacity={0.9}
            onPress={postDetailHandler.onPressPostLikeButton}>
            <LikeGrayIcon width={16} height={16} />
            <CustomText
              style={tw`text-[${designatedColor.GRAY1}] text-[12px] pl-1`}>
              좋아요
            </CustomText>
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-row items-center`}>
              <LikeIcon width={14} height={14} />
              <CustomText
                style={tw`text-[${designatedColor.PINK}] pl-1 text-[14px]`}>
                {postDetailHandler.likes}
              </CustomText>
            </View>
            <View style={tw`flex-row items-center pl-2`}>
              <CommentIcon width={14} height={14} />
              <CustomText
                style={tw`text-[${designatedColor.MINT}] pl-1 text-[14px]`}>
                {postDetailHandler.commentCount}
              </CustomText>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        // {
        //   paddingTop: insets.top,
        //   paddingBottom: insets.bottom,
        //   paddingLeft: insets.left,
        //   paddingRight: insets.right,
        // },
      ]}>
      <View style={tw`flex-1 w-full`}>
        {/* <PostCommentList postComment={postDetailHandler.postComment} /> */}
        <View style={tw`flex-1 w-full`}>
          <FlatList
            data={postDetailHandler.postComment}
            renderItem={renderItem}
            keyExtractor={item => item.postCommentId.toString()}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={
              <View
                style={tw`flex-1 w-full h-full justify-center items-center`}>
                <View style={tw`flex-1 justify-center items-center`}>
                  <CommentGrayIcon width={50} height={50} />
                  <CustomText style={tw`text-[${designatedColor.GRAY1}] mt-4`}>
                    첫 댓글을 작성해주세요
                  </CustomText>
                </View>
              </View>
            }
            contentContainerStyle={[tw`flex-grow`, {paddingBottom: 80}]}
            refreshControl={
              <RefreshControl
                refreshing={postDetailHandler.refreshing}
                onRefresh={postDetailHandler.onRefresh}
                tintColor={designatedColor.VIOLET2} // RefreshControl indicator color (iOS)
                colors={[designatedColor.VIOLET2]}
              /> // RefreshControl indicator colors (Android)/>
            }
          />
        </View>
      </View>

      {/* <CommentV2List postComment={postDetailHandler.postComment}  /> */}

      <View style={[tw`justify-end m-0 h-1 w-full`]}>
        {postDetailHandler.isKeyboardVisible && (
          <CommentKeyboard
            onSendPress={postDetailHandler.handleOnPressSendButton}
            text="댓글"
          />
        )}
      </View>
    </View>
  );
}

export default PostDetailScreen;
