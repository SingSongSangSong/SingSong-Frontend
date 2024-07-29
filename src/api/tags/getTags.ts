import {TagsResponse} from '../../types';
import axiosInstances from '../axios';

const {axiosInstance} = axiosInstances();

const getTags = async () => {
  try {
    const response = await axiosInstance.get<TagsResponse>('/tags');
    console.log('data for tag response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export default getTags;
