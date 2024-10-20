import {TagsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getTags = async () => {
  const response = await axiosInstance.get<TagsResponse>('v2/tags');
  // console.log('data for tag response', response.data);
  return response.data;
};

export default getTags;
