import TokenStore from '../../store/TokenStore';
import {SongInfoResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSongs = async (songNumber: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<SongInfoResponse>(
      `/songs/${songNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getSongs response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getSongs:', error);
    throw error;
  }
};

export default getSongs;
