import {TagsResponse} from '../types/songs';
import axiosInstance from './axios';

const getTags = async (): Promise<TagsResponse> => {
  const {data} = await axiosInstance.get('/api/v1/tags/ssss');

  return data;
};

export default getTags;
