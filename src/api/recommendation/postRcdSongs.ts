import {RcdSongResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postRcdSongs = async (songs: number[]) => {
  try {
    const response = await axiosInstance.post<RcdSongResponse>(
      '/recommend/songs',
      {
        songs: songs,
      },
    );
    // console.log('data for recommend song response', response.data);s
    return response.data;
  } catch (error) {
    console.error('Error fetching recommend song:', error);
    throw error;
  }
};
export default postRcdSongs;
