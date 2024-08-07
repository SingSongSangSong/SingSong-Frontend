import TokenStore from '../../store/TokenStore';
import {PostCommentResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postComment = async (
  content: string,
  isRecomment: boolean,
  parentCommentId: number,
  songInfoId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<PostCommentResponse>(
      '/comment',
      {
        content: content,
        isRecomment: isRecomment,
        parentCommentId: parentCommentId,
        songInfoId: songInfoId,
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
