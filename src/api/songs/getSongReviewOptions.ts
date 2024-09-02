import {GetSongReviewOptionsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getSongReviewOptions = async () => {
  const response = await axiosInstance.get<GetSongReviewOptionsResponse>(
    '/song-review-options',
  );
  // console.log('data for tag response', response.data);
  return response.data;
};

export default getSongReviewOptions;
