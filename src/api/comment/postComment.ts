import TokenStore from '../../store/TokenStore';
import {PostCommentResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postComment = async (
  content: string,
  isRecomment: boolean,
  parentCommentId: number,
  songId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    console.log(content, isRecomment, parentCommentId, songId);
    const response = await axiosInstance.post<PostCommentResponse>(
      '/comment',
      {
        content: content,
        isRecomment: isRecomment,
        parentCommentId: parentCommentId,
        songId: songId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for postComment response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postComment:', error);
    throw error;
  }
};
export default postComment;
