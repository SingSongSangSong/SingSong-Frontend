import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const deletePostComment = async (postCommentId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete<DefaultResponse>(
      `v1/posts/comments/${postCommentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for deleteComment response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching deletePostComment:', error);
    throw error;
  }
};
export default deletePostComment;
