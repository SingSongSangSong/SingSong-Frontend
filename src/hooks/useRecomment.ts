import {useState} from 'react';
// import {useKeyboard} from '@react-native-community/hooks';
import postComment from '../api/comment/postComment';
import postCommentLike from '../api/comment/postCommentLike';
import useCommentStore from '../store/useCommentStore';

const useRecomment = (commentId: number) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<number>(0);
  const [reportSubjectMemberId, setReportSubjectMemberId] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

  const {
    comments,
    recomments,
    updateIsLikedComment,
    updateLikesComment,
    addRecommentComment,
    updateIsLikedRecomment,
    updateLikesRecomment,
  } = useCommentStore();

  // const keyboard = useKeyboard();ㄴ

  // 특정 댓글(commentId)의 답글 가져오기
  // const currentRecomments = recomments[commentId] || {};

  // 새 답글을 추가하는 함수
  const handleOnPressSendButton = async (content: string) => {
    const parentComment = comments[commentId];
    if (!parentComment) {
      return;
    }

    const tempRecomment = await postComment(
      content,
      true,
      parentComment.commentId,
      parentComment.songId,
    );

    // 답글을 스토어에 추가
    addRecommentComment(commentId, tempRecomment.data);
  };

  const handleOnPressMoreInfo = (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => {
    setIsModalVisible(true);
    setIsKeyboardVisible(false);
    setReportCommentId(reportCommentId);
    setReportSubjectMemberId(reportSubjectMemberId);
  };

  const handleOnPressRecommentLikeButton = async (
    commentId: number,
    recommentId: number,
  ) => {
    //좋아요가 눌린 commentId 이용하여 업데이트

    await postCommentLike(String(recommentId));

    // 해당 댓글이 답글인지, 원 댓글인지 확인하고 상태 업데이트
    updateIsLikedRecomment(commentId, recommentId, true); // 좋아요 상태를 true로 설정
    updateLikesRecomment(commentId, recommentId); // 좋아요 개수를 증가
  };

  const handleOnPressCommentLikeButton = async (commentId: number) => {
    //좋아요가 눌린 commentId 이용하여 업데이트
    console.log('commentId', commentId);
    await postCommentLike(String(commentId));

    // 해당 댓글이 답글인지, 원 댓글인지 확인하고 상태 업데이트
    updateIsLikedComment(commentId, true); // 좋아요 상태를 true로 설정
    updateLikesComment(commentId); // 좋아요 개수를 증가
  };

  return {
    recomments: recomments[commentId], // 특정 댓글의 답글들을 반환
    reportCommentId,
    reportSubjectMemberId,
    isModalVisible,
    isKeyboardVisible,
    setIsModalVisible,
    setIsKeyboardVisible,
    parentComment: comments[commentId], // 해당 댓글 정보를 반환
    handleOnPressSendButton,
    handleOnPressMoreInfo,
    handleOnPressCommentLikeButton,
    handleOnPressRecommentLikeButton,
  };
};

export default useRecomment;
