import TokenStore from '../../store/TokenStore';
import {SongInfoReviewResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSongsReviews = async (songNumber: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<SongInfoReviewResponse>(
      `/songs/${songNumber}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getSongsReviews response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getSongsReviews:', error);
    throw error;
  }
};

export default getSongsReviews;
