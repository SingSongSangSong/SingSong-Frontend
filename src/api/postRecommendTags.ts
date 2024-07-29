import {RecommendTagsResponse, TagProps} from '../types';
import axiosInstance from './axios';

const postRecommendTags = async (tags: TagProps) => {
  try {
    const response = await axiosInstance.post<RecommendTagsResponse>(
      '/recommend/home',
      tags,
    );
    console.log('data for recommend song response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};
export default postRecommendTags;
