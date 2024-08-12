import TokenStore from '../../store/TokenStore';
import {ChartResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getChart = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<ChartResponse>('/chart', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('data for getChart response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getChart:', error);
    throw error;
  }
};

export default getChart;
