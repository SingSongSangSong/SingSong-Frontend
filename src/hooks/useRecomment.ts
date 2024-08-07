import {useEffect, useState} from 'react';
import {Comment} from '../types';
import {useKeyboard} from '@react-native-community/hooks';
import postComment from '../api/comment/postComment';

const useRecomment = (comment: Comment) => {
  const [recomments, setRecomments] = useState<Comment[]>([]);
  const [parentComment, setParentComment] = useState<Comment>();
  const keyboard = useKeyboard();

  useEffect(() => {
    if (!parentComment) {
      console.log('parent comments loadding...');
      setInitRecomments();
    }
  }, [recomments]);

  const setInitRecomments = async () => {
    setParentComment(comment);
    setRecomments(comment.recomments);
  };

  const handleOnPressSendButton = async (content: string) => {
    const tempRecomment = await postComment(
      content,
      true,
      comment.commentId,
      comment.songId,
    );
    setRecomments(prev => [...prev, tempRecomment.data]);
  };
  return {recomments, parentComment, handleOnPressSendButton};
};

export default useRecomment;
