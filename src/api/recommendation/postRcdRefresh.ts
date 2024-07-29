import {RecommendResponse} from '../../types';
import axiosInstances from '../axios';

const {axiosAuthInstance} = axiosInstances();
const postRcdRefresh = async (tag: string) => {
  try {
    const response = await axiosAuthInstance.post<RecommendResponse>(
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
export default postRcdRefresh;
