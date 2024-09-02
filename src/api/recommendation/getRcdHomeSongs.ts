import {RcdExploreResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getRcdHomeSongs = async () => {
  try {
    const response = await axiosInstance.get<RcdExploreResponse>(
      '/recommend/home/songs',
    );
    // console.log('data for rcd home song response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching rcd home song:', error);
    throw error;
  }
};

export default getRcdHomeSongs;
