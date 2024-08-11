import {useEffect, useState} from 'react';
import {Comment} from '../types';
import getComment from '../api/comment/getComment';
import {useKeyboard} from '@react-native-community/hooks';
import postComment from '../api/comment/postComment';

const useComment = (songNumber: number, songId: number) => {
  const [comments, setComments] = useState<Comment[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<number>(0);
  const [reportSubjectMemberId, setReportSubjectMemberId] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const keyboard = useKeyboard();

  useEffect(() => {
    if (!comments) {
      console.log('comments loadding...');
      setInitComments();
    }
    console.log('stored comments', comments);
  }, [comments]);

  const setInitComments = async () => {
    console.log('songid', songId);
    const tempComments = await getComment(String(songId));
    if (!tempComments.data) {
      setComments([]);
    } else {
      setComments(tempComments.data);
    }

    console.log('comments', tempComments.data);
  };

  const handleOnPressSendButton = async (content: string) => {
    await postComment(content, false, 0, songId);
    // setComments(prev => [...(prev || []), ...(tempCommentData.data || [])]);
    //getComment
    const tempComments = await getComment(String(songId));
    setComments(tempComments.data);
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

  return {
    comments,
    reportCommentId,
    reportSubjectMemberId,
    isModalVisible,
    setIsModalVisible,
    isKeyboardVisible,
    setIsKeyboardVisible,
    handleOnPressSendButton,
    handleOnPressMoreInfo,
  };
};

export default useComment;
