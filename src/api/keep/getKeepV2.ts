import TokenStore from '../../store/TokenStore';
import {GetKeepResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getKeepV2 = async (filter: string, cursor: number, size: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    console.log('token for getKeepV2', token);

    const params: {filter: string; cursor?: number; size: number} = {
      filter: filter,
      size: size,
    };
    if (cursor !== -1) {
      params.cursor = cursor;
    }

    const response = await axiosInstance.get<GetKeepResponse>('v2/keep', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('data for getKeepV2 response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getKeep:', error);
    throw error;
  }
};

export default getKeepV2;
