import {RecommendResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getKeep = async (token: string) => {
  try {
    const response = await axiosInstance.get<RecommendResponse>('/keep', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('data for getKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getKeep:', error);
    throw error;
  }
};

export default getKeep;
