import {GetRecentSearchResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getRecentSearch = async (size: number) => {
  try {
    const response = await axiosInstance.get<GetRecentSearchResponse>(
      'v1/recent/search',
      {
        params: {
          size: size,
        },
      },
    );
    // console.log('data for getRecentSearch response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getRecentKeep:', error);
    throw error;
  }
};

export default getRecentSearch;
