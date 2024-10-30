import React, {useRef, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
// import {PostComments} from '../../types';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import {designatedColor} from '../../constants';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import {formatDateComment} from '../../utils';
import CustomText from '../text/CustomText';
// import getPostsCommentsRecomments from '../../api/post/getPostsCommentsRecomments';
import CornerDownIcon from '../../assets/svg/cornerDown.svg';
import Popover from 'react-native-popover-view';
import {CustomModal} from '../message/CustomModal';

interface PostRecommentItemProps {
  postId: number;
  postCommentId: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  isWriter: boolean;
  //   isRecomment: boolean;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  //   postRecommentsCount: number;
  //   songOnPostComment: SongOnPostComment[];
  onPressCommentLike: () => void;
  onPressRecommentReport: () => void;
  onPressRecommentBlacklist: () => void;
  //   setIsRecomment: (isRecomment: boolean) => void;
  //   inputRef: React.RefObject<TextInput>;
  // onPressRecomment: () => void;
  //   setParentCommentId: (parentCommentId: number) => void;
  mutateAsyncDeleteRecomment: (childCommentId: number) => void;
}

const PostRecommentItem = ({
  postId,
  postCommentId,
  content,
  createdAt,
  likes,
  isLiked,
  isWriter,
  memberId,
  nickname,
  parentCommentId,
  onPressCommentLike,
  onPressRecommentReport,
  onPressRecommentBlacklist,
  mutateAsyncDeleteRecomment,
}: // onPressRecomment,
PostRecommentItemProps) => {
  // const [isLike, setIsLike] = useState(isLiked);
  // const [likeCount, setLikeCount] = useState(likes);

  //   const handleOnPressLikeButton = () => {
  //     if (!isLiked) {
  //       onPressLikeButton();
  //     }
  //   };
  const [likeCount, setLikeCount] = useState<number>(likes);
  const [isLike, setIsLike] = useState<boolean>(isLiked);
  //   const [recommentCount, setRecommentCount] =
  //     useState<number>(postRecommentsCount);
  // const [commentRecomments, setCommentRecomments] = useState<PostComments[]>();
  // const [lastCursor, setLastCursor] = useState<number>(-1);
  // const [isFocusRecomment, setIsFocusRecomment] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef(null); // MoreVerticalIcon의 위치를 참조할 ref 생성
  const [isShowBlacklistModal, setIsShowBlacklistModal] = useState(false);

  const handleOnPressCommentLike = () => {
    onPressCommentLike();
    if (isLike) {
      setLikeCount(likeCount - 1);
      setIsLike(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLike(true);
    }
  };

  const handleOnPressRecommentDelete = async (postCommentId: number) => {
    await mutateAsyncDeleteRecomment(postCommentId);
    setIsVisible(false);
  };

  return (
    <View style={tw`flex-row items-center px-2`}>
      <CornerDownIcon width={14} height={14} />
      <View
        style={[
          tw`flex-1 ml-2 px-2 py-2 border-b-[0.5px] border-[${designatedColor.GRAY5}] bg-[${designatedColor.GRAY5}] bg-opacity-50 rounded-lg`,
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
          <TouchableOpacity
            ref={iconRef}
            onPress={() => {
              setIsVisible(true);
              // console.log('more button clicked');
            }}
            style={tw`px-2`}
            activeOpacity={0.8}>
            <MoreVerticalIcon width={14} height={14} />
          </TouchableOpacity>
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

        <View style={tw`justify-end flex-row pt-1 pr-2 items-center`}>
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
      </View>
      <Popover
        isVisible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        from={iconRef} // Popover를 MoreVerticalIcon에서 시작하도록 설정
        arrowSize={{width: 0, height: 0}}
        popoverStyle={{width: 150}}
        // placement="bottom" // 팝업이 아이콘 아래쪽에 위치
        // showArrow={false}
        // arrowStyle={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}
      >
        <View style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
          {isWriter && (
            <TouchableOpacity
              style={tw`p-4`}
              onPress={() => {
                handleOnPressRecommentDelete(postCommentId);
              }}>
              <CustomText style={tw`text-white`}>삭제</CustomText>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={tw`p-4`}
            onPress={() => {
              // postDetailHandler.onRefresh();
              onPressRecommentReport();
              setIsVisible(false);
            }}>
            <CustomText style={tw`text-white`}>신고</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`p-4`}
            onPress={() => {
              // postDetailHandler.handleOnPressPostReport();
              // onPressCommentBlacklist(memberId);
              setIsVisible(false);
              setIsShowBlacklistModal(true);
            }}>
            <CustomText style={tw`text-white`}>차단</CustomText>
          </TouchableOpacity>
          {/* {postDetailHandler.postDetailed?.isWriter && (
              <TouchableOpacity
                style={tw`p-4`}
                onPress={() => {
                  postDetailHandler.setIsShowDeleteModal(true); //삭제 모달 표시
                  setIsVisible(false);
                }}>
                <CustomText style={tw`text-white`}>삭제</CustomText>
              </TouchableOpacity>
            )} */}
        </View>
      </Popover>
      <CustomModal
        visible={isShowBlacklistModal}
        onClose={() => setIsShowBlacklistModal(false)}
        message={
          '사용자를 차단하면 이 사용자의 댓글과 활동이 숨겨집니다.\n차단하시겠습니까?'
        }
        onConfirm={() => {
          setIsShowBlacklistModal(false);
          onPressRecommentBlacklist();
        }}
        onCancel={() => setIsShowBlacklistModal(false)}
        confirmText="차단"
        cancelText="취소"
      />
    </View>
  );
};

export {PostRecommentItem};
