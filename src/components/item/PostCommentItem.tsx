import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import tw from 'twrnc';
import {PostComments, SongOnPostComment} from '../../types';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment} from '../../utils';
import CustomText from '../text/CustomText';
import getPostsCommentsRecomments from '../../api/post/getPostsCommentsRecomments';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import {PostRecommentItem} from '..';

interface PostCommentItemProps {
  postId: number;
  postCommentId: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isRecomment: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  postRecommentsCount: number;
  songOnPostComment: SongOnPostComment[];
  onPressCommentLike: (postCommentId: number) => void;
  setIsRecomment: (isRecomment: boolean) => void;
  inputRef: React.RefObject<TextInput>;
  // onPressRecomment: () => void;
  setParentCommentId: (parentCommentId: number) => void;
  isFocused: boolean; // 포커싱된 상태 전달
  onFocus: () => void;
  commentRecomments: {
    [key: number]: PostComments[];
  };
  mutateAsyncCommentRecomment: (data: {
    postCommentId: number;
    cursor: number;
    size: number;
  }) => Promise<any>;
}

const PostCommentItem = ({
  postId,
  postCommentId,
  content,
  createdAt,
  likes,
  isLiked,
  memberId,
  nickname,
  parentCommentId,
  postRecommentsCount,
  songOnPostComment,
  onPressCommentLike,
  setIsRecomment,
  inputRef,
  setParentCommentId,
  isFocused,
  onFocus,
  commentRecomments,
  mutateAsyncCommentRecomment,
}: // onPressRecomment,
PostCommentItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  //   const handleOnPressLikeButton = () => {
  //     if (!isLiked) {
  //       onPressLikeButton();
  //     }
  //   };
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  const [recommentCount, setRecommentCount] =
    useState<number>(postRecommentsCount);
  // const [commentRecomments, setCommentRecomments] = useState<PostComments[]>();
  const [lastCursor, setLastCursor] = useState<number>(-1);
  const [isFocusRecomment, setIsFocusRecomment] = useState<boolean>(false);
  const [isPressedRecomment, setIsPressedRecomment] = useState<boolean>(false);

  const handleOnPressCommentLike = () => {
    onPressCommentLike(postCommentId);
    if (isLike) {
      setLikeCount(likeCount - 1);
      setIsLike(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLike(true);
    }
  };

  const handleOnPressRecomment = () => {
    if (isPressedRecomment) {
      // setIsRecomment(false);
      setIsPressedRecomment(false);
    } else {
      onPressRecomment(postCommentId, lastCursor, 20);
      setIsPressedRecomment(true);
    }
  };

  const onPressRecomment = async (
    postCommentId: number,
    cursor: number,
    size: number,
  ) => {
    await mutateAsyncCommentRecomment({
      postCommentId,
      cursor,
      size,
    });
  };

  const handleOnPressWriteRecomment = () => {
    setIsRecomment(true);
    // inputRef.current?.focus(); // 키보드 포커싱
    setParentCommentId(postCommentId);
    onFocus(); // 포커싱 상태 요청
  };

  return (
    <>
      <View
        style={[
          tw`py-2 px-4 border-b-[0.5px] border-[${designatedColor.GRAY5}]`,
          isFocused && tw`bg-[${designatedColor.GRAY5}] bg-opacity-70`,
        ]}>
        <View
          style={tw`flex-row justify-between items-center
        `}>
          <View style={tw`flex-row items-center mb-1`}>
            <CustomText style={tw`text-white font-bold text-[14px]`}>
              {nickname}
            </CustomText>
            <CustomText
              style={tw`text-[${designatedColor.GRAY3}] ml-2 text-[12px]`}>
              {formatDateComment(createdAt)}
            </CustomText>
          </View>
          {/* <IconButton
          Icon={MoreVerticalIcon}
          size={16}
          onPress={onPressMoreInfo}
        /> */}
        </View>
        <View>
          <CustomText style={tw`text-[${designatedColor.GRAY1}] pl-1`}>
            {content}
          </CustomText>
        </View>

        <View style={tw`justify-between flex-row pt-1 pr-2 items-center`}>
          <View style={tw`flex-row items-center`}>
            {recommentCount > 0 && (
              <TouchableOpacity
                style={tw`pt-1 pb-1 pr-2 `}
                onPress={handleOnPressRecomment}
                activeOpacity={0.8}>
                <>
                  {isPressedRecomment ? (
                    <CustomText style={tw`text-[${designatedColor.VIOLET3}]`}>
                      답글 닫기
                    </CustomText>
                  ) : (
                    <CustomText
                      style={tw`text-[${designatedColor.VIOLET3}] text-[14px]`}>
                      답글 {recommentCount}개 모두 보기
                    </CustomText>
                  )}
                </>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={tw`flex-row items-center pr-2 py-1`}
              activeOpacity={0.8}
              onPress={handleOnPressWriteRecomment}
              //   disabled={isLiked}
            >
              <CustomText
                style={tw`text-[${designatedColor.GRAY2}] text-[10px]`}>
                답글 쓰기
              </CustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleOnPressCommentLike}
            style={tw`flex-row items-center`}
            activeOpacity={0.8}
            disabled={isLike}>
            {!isLike ? (
              <View style={tw`p-2 pr-1 justify-center items-center`}>
                <LikeIcon width={14} height={14} />
              </View>
            ) : (
              <View style={tw`p-2 pr-1 justify-center items-center`}>
                <FilledLikeIcon width={14} height={14} />
              </View>
            )}

            <CustomText
              style={[
                isLike
                  ? tw`text-[${designatedColor.PINK}]`
                  : tw`text-[${designatedColor.GRAY1}]`,
                tw`text-[11px]`,
              ]}>
              {likeCount}
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* {isVisibleRecomment && (
        <TouchableOpacity
          onPress={onPressRecomment}
          style={tw`flex-row items-center mx-2 py-1 px-2`}
          activeOpacity={0.8}>
          {recommentCount > 0 ? (
            <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
              답글 {recommentCount}개 모두 보기
            </CustomText>
          ) : (
            <CustomText style={tw`text-[${designatedColor.VIOLET2}]`}>
              답글
            </CustomText>
          )}

          <TouchableOpacity onPress={onPressRecomment} />
        </TouchableOpacity>
      )} */}
      </View>
      {isPressedRecomment &&
        commentRecomments &&
        commentRecomments[postCommentId] && (
          <View style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
            {commentRecomments[postCommentId].map((item, index) => (
              <View key={index} style={tw`py-2`}>
                {/* <CustomText style={tw`text-[${designatedColor.GRAY1}]`}>
                    {item.content}
                  </CustomText> */}
                <PostRecommentItem
                  postId={postId}
                  postCommentId={item.postCommentId}
                  content={item.content}
                  createdAt={item.createdAt}
                  likes={item.likes}
                  isLiked={item.isLiked}
                  memberId={item.memberId}
                  nickname={item.nickname}
                  parentCommentId={item.parentPostCommentId}
                  onPressCommentLike={() => {
                    onPressCommentLike(item.postCommentId);
                  }}
                  // postRecommentsCount={item.postRecommentsCount}
                  // songOnPostComment={item.songOnPostComment}
                  // onPressCommentLike={handleOnPressCommentLike}
                  // setIsRecomment={setIsRecomment}
                  // inputRef={inputRef}
                  // setParentCommentId={setParentCommentId}
                  // isFocused={isFocusRecomment}
                  // onFocus={() => setIsFocusRecomment(true)}
                />
              </View>
            ))}
          </View>
        )}
    </>
  );
};

export {PostCommentItem};
