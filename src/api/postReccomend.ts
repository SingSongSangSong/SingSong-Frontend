import {RecommendResponse} from '../types';
import axiosInstance from './axios';

const postRecommend = async (songs: number[]) => {
  try {
    const response = await axiosInstance.post<RecommendResponse>('/recommend', {
      songs: songs,
    });
    console.log('data for recommend updated song response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommend:', error);
    throw error;
  }
};
export default postRecommend;
