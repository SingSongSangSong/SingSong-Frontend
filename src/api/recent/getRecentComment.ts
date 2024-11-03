import {GetRecentCommentResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getRecentComment = async (size: number) => {
  try {
    const response = await axiosInstance.get<GetRecentCommentResponse>(
      'v1/recent/comment',
      {
        params: {
          size: size,
        },
      },
    );
    // console.log('data for getRecentComment response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getRecentComment:', error);
    throw error;
  }
};

export default getRecentComment;
