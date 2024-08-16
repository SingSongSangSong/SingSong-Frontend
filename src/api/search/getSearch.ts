import TokenStore from '../../store/TokenStore';
import {GetSearchSongResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSearch = async (searchKeyword: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<GetSearchSongResponse>(
      `/search/${searchKeyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getSearch response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getSearch:', error);
    throw error;
  }
};

export default getSearch;
