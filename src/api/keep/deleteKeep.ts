import TokenStore from '../../store/TokenStore';
import {KeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const deleteKeep = async (songNumbers: number[]) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete<KeepResponse>('v1/keep', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {songIds: songNumbers},
    });
    // console.log('data for deleteKeep response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postKeep:', error);
    throw error;
  }
};
export default deleteKeep;
