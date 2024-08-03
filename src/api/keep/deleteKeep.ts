import TokenStore from '../../store/TokenStore';
import {KeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const deleteKeep = async (songNumbers: number[]) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete<KeepResponse>('/keep', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {songNumbers: songNumbers},
    });
    console.log('data for postKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postKeep:', error);
    throw error;
  }
};
export default deleteKeep;
