import TokenStore from '../../store/TokenStore';
import {KeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postKeep = async (songNumbers: number[]) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    // console.log(songNumbers);
    const response = await axiosInstance.post<KeepResponse>(
      '/keep',
      {songId: songNumbers},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postKeep:', error);
    throw error;
  }
};
export default postKeep;
