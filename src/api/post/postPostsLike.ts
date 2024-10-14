import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postPostsLike = async (postId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<DefaultResponse>(
      `v1/posts/${postId}/likes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postPostsLike response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postPostsLike:', error);
    throw error;
  }
};
export default postPostsLike;
