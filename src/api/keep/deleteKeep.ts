import {DeleteKeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const deleteKeep = async (token: string, songNumbers: number[]) => {
  try {
    const response = await axiosInstance.delete<DeleteKeepResponse>('/keep', {
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
