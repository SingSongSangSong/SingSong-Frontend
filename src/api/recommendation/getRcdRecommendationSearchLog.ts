import TokenStore from '../../store/TokenStore';
import {SearchLogResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getRcdRecommendationSearchLog = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<SearchLogResponse>(
      'v2/recommend/recommendation/searchLog',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log(
    //   'data for rcd recommendation search log response',
    //   response.data,
    // );
    return response.data;
  } catch (error) {
    console.error('Error fetching rcd recommendation search log:', error);
    throw error;
  }
};

export default getRcdRecommendationSearchLog;
