import {useEffect, useState} from 'react';
import getComment from '../api/comment/getComment';
// import {useKeyboard} from '@react-native-community/hooks';
import postComment from '../api/comment/postComment';
import postCommentLike from '../api/comment/postCommentLike';
import useCommentStore from '../store/useCommentStore';

const useComment = (songNumber: number, songId: number) => {
  // const [comments, setComments] = useState<Comment[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<number>(0);
  const [reportSubjectMemberId, setReportSubjectMemberId] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {
    comments,
    setComments,
    addComment,
    updateIsLikedComment,
    updateLikesComment,
    getRecommentCount,
  } = useCommentStore();

  // const keyboard = useKeyboard();

  useEffect(() => {
    console.log('comments loadding...');
    setInitComments();
    console.log('stored comments', comments);
  }, []);

  const setInitComments = async () => {
    console.log('songid', songId);
    setIsLoading(true);
    const tempComments = await getComment(String(songId));
    setComments(tempComments.data); //Comment[], comment 데이터 설정
    setIsLoading(false);
    console.log('comments', tempComments.data);
  };

  //like 버튼 눌렀을 때
  const handleOnPressLikeButton = async (commentId: number) => {
    await postCommentLike(String(commentId));
    updateLikesComment(commentId); //like 수 업데이트
    updateIsLikedComment(commentId, true); //like 상태 업데이트
  };

  //send 버튼 눌렀을 때
  const handleOnPressSendButton = async (content: string) => {
    const tempComment = await postComment(content, false, 0, songId);
    addComment(tempComment.data); // 댓글 추가
  };

  //더보기 버튼 눌렀을 때
  const handleOnPressMoreInfo = (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => {
    setIsModalVisible(true);
    setIsKeyboardVisible(false);
    setReportCommentId(reportCommentId);
    setReportSubjectMemberId(reportSubjectMemberId);
  };

  return {
    isLoading,
    comments,
    reportCommentId,
    reportSubjectMemberId,
    isModalVisible,
    setIsModalVisible,
    isKeyboardVisible,
    setIsKeyboardVisible,
    handleOnPressSendButton,
    handleOnPressMoreInfo,
    handleOnPressLikeButton,
    getRecommentCount,
  };
};

export default useComment;
