import TokenStore from '../../store/TokenStore';
import {SongInfoRelatedResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSongsRelated = async (
  songNumber: string,
  page: number,
  size: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<SongInfoRelatedResponse>(
      `/songs/${songNumber}/related`,
      {
        params: {page: page, size: size},
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getSongsRelated response', response.data);
    // console.log('data for getSongsRelated response', response.data.data.songs);
    return response.data;
  } catch (error) {
    console.error('Error fetching getSongsRelated:', error);
    throw error;
  }
};

export default getSongsRelated;
