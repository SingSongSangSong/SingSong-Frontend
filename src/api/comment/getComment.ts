import TokenStore from '../../store/TokenStore';
import {GetCommentResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getComment = async (songId: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetCommentResponse>(
      `/comment/${songId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getComment response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getComment:', error);
    throw error;
  }
};

export default getComment;
