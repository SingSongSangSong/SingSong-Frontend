import {RcdHomeResponse, TagProps} from '../../types';
import axiosInstance from '../axiosIns';

const postRcdHome = async (tags: TagProps) => {
  try {
    console.log('tags!!!!!!!!!!!', tags);
    const response = await axiosInstance.post<RcdHomeResponse>(
      '/recommend/home',
      tags,
    );
    console.log('data for recommend home response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommend home:', error);
    throw error;
  }
};
export default postRcdHome;
