import TokenStore from '../../store/TokenStore';
import {ChartV2Response} from '../../types';
import axiosInstance from '../axiosIns';

const getV2Chart = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<ChartV2Response>('v2/chart', {
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

export default getV2Chart;
