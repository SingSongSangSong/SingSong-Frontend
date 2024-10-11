import TokenStore from '../../store/TokenStore';
import {GetCommentLatestResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getCommentLatest = async (size: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetCommentLatestResponse>(
      'v1/comment/latest',
      {
        params: {
          size: size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for getCommentLatest response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getCommentLatest:', error);
    throw error;
  }
};

export default getCommentLatest;
