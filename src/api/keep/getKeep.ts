import TokenStore from '../../store/TokenStore';
import {KeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getKeep = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<KeepResponse>('/keep', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log('data for getKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getKeep:', error);
    throw error;
  }
};

export default getKeep;
