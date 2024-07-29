import TokenStore from '../../store/TokenStore';
import {RecommendResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postRcdRefresh = async (tag: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<RecommendResponse>(
      '/recommend/refresh',
      {tag: tag},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for recommend song refresh response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching refresh:', error);
    throw error;
  }
};
export default postRcdRefresh;
