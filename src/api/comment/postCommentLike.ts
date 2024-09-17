import TokenStore from '../../store/TokenStore';
import {PostCommentLikeResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postCommentLike = async (commentId: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<PostCommentLikeResponse>(
      `v1/comment/${commentId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postCommentLike response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postCommentLike:', error);
    throw error;
  }
};
export default postCommentLike;
