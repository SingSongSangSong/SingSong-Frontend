import TokenStore from '../../store/TokenStore';
import {GetPostsCommentsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getPostsComments = async (
  postId: number,
  cursor: number,
  size: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetPostsCommentsResponse>(
      `v1/posts/${postId}/comments`,
      {
        params: {cursor: cursor, size: size},
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for getPostsComments response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getPostsComments:', error);
    throw error;
  }
};

export default getPostsComments;
