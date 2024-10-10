import TokenStore from '../../store/TokenStore';
import {GetSongsNewResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSongsNew = async (cursor: number, size: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();

    // cursor가 -1이면 params에서 cursor를 제외
    const params: {cursor?: number; size: number} = {size: size};
    if (cursor !== -1) {
      params.cursor = cursor;
    }

    const response = await axiosInstance.get<GetSongsNewResponse>(
      'v1/songs/new',
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching getSongsNew:', error);
    throw error;
  }
};

export default getSongsNew;
