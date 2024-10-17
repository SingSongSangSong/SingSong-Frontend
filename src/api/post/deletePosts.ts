import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const deletePosts = async (postId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete<DefaultResponse>(
      `v1/posts/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        //   data: {songIds: songNumbers},
      },
    );
    console.log('data for deleteKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching deletePosts:', error);
    throw error;
  }
};
export default deletePosts;
