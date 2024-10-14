import TokenStore from '../../store/TokenStore';
import {GetPostsDetailedResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getPostsDetailed = async (postId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetPostsDetailedResponse>(
      `v1/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for getPostsDetailed response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getPostsDetailed:', error);
    throw error;
  }
};

export default getPostsDetailed;
