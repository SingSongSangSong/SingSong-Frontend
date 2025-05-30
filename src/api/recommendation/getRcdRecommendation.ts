import TokenStore from '../../store/TokenStore';
import {GetRcdRecommendationResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getRcdRecommendation = async (pageId: number) => {
  try {
    // console.log('pageId for rcd recommendation song:', pageId);
    // console.log('pageId for rcd recommendation song:', pageId);
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetRcdRecommendationResponse>(
      `v2/recommend/recommendation/${pageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for rcd recommendation song response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rcd recommendation song:', error);
    throw error;
  }
};

export default getRcdRecommendation;
