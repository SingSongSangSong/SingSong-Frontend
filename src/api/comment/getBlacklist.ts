import TokenStore from '../../store/TokenStore';
import {GetBlacklistResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getBlacklist = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetBlacklistResponse>(
      '/blacklist',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getBlacklist response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getBlacklist:', error);
    throw error;
  }
};

export default getBlacklist;
