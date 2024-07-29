import {RecommendResponse} from '../types';
import axiosInstance from './axios';

const postRefresh = async (tag: string) => {
  try {
    const response = await axiosInstance.post<RecommendResponse>(
      '/recommend/refresh',
      {tag: tag},
    );
    console.log('data for recommend song refresh response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching refresh:', error);
    throw error;
  }
};
export default postRefresh;
