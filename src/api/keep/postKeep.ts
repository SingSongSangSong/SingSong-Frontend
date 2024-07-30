import {RecommendResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postKeep = async (token: string, songNumbers: number[]) => {
  try {
    const response = await axiosInstance.post<RecommendResponse>(
      '/keep',
      {songNumbers: songNumbers},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for postKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postKeep:', error);
    throw error;
  }
};
export default postKeep;
