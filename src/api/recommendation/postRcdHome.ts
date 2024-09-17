import {RcdHomeResponse, TagProps} from '../../types';
import axiosInstance from '../axiosIns';

const postRcdHome = async (tags: TagProps) => {
  try {
    const response = await axiosInstance.post<RcdHomeResponse>(
      'v1/recommend/home',
      tags,
    );
    // console.log('data for recommend home response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommend home:', error);
    throw error;
  }
};
export default postRcdHome;
