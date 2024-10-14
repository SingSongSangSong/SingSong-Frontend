import TokenStore from '../../store/TokenStore';
import {GetPostsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getPosts = async (cursor: number, size: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const params: {cursor?: number; size: number} = {size: size};
    if (cursor !== -1) {
      params.cursor = cursor;
    }

    const response = await axiosInstance.get<GetPostsResponse>('v1/posts', {
      params,
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   'Content-Type': 'application/json',
      // },
    });
    console.log('data for getPosts response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getPosts:', error);
    throw error;
  }
};

export default getPosts;
