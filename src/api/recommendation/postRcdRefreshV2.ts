import TokenStore from '../../store/TokenStore';
import {RcdRefreshV2Response} from '../../types';
import axiosInstance from '../axiosIns';

const postRcdRefreshV2 = async (page: number, tag: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    console.log(page);
    console.log(tag);
    const response = await axiosInstance.post<RcdRefreshV2Response>(
      'v2/recommend/refresh',
      {page: page, tag: tag},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for recommend song refresh response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching refresh:', error);
    throw error;
  }
};
export default postRcdRefreshV2;
