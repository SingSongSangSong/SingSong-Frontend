import {RecommendTagsResponse, TagProps} from '../../types';
import axiosInstances from '../axios';

const {axiosInstance} = axiosInstances();

const postRcdHome = async (tags: TagProps) => {
  try {
    const response = await axiosInstance.post<RecommendTagsResponse>(
      '/recommend/home',
      tags,
    );
    console.log('data for recommend home response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommend home:', error);
    throw error;
  }
};
export default postRcdHome;
