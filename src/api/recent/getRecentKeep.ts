import {GetRecentKeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getRecentKeep = async (size: number) => {
  try {
    const response = await axiosInstance.get<GetRecentKeepResponse>(
      'v1/recent/keep',
      {
        params: {
          size: size,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching getRecentKeep:', error);
    throw error;
  }
};

export default getRecentKeep;
