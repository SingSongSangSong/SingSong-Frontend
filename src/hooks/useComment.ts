import {useEffect, useState} from 'react';
import {Comment} from '../types';
import getComment from '../api/comment/getComment';
import {useKeyboard} from '@react-native-community/hooks';

const useComment = (songNumber: number) => {
  const [comments, setComments] = useState<Comment[]>();
  const keyboard = useKeyboard();

  useEffect(() => {
    if (!comments) {
      console.log('comments loadding...');
      setInitComments();
    }
  }, []);

  const setInitComments = async () => {
    const tempComments = await getComment(String(songNumber));
    setComments(tempComments.data);
    console.log(tempComments.data);
  };
  return {comments};
};

export default useComment;
