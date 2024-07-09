import axios from 'axios';
import {TagsResponse} from '../types/songs';

// tags
const getTags = async (): Promise<TagsResponse> => {
  const {data} = await axios.get<TagsResponse>(
    'http://10.0.2.2:8000/api/v1/tags/ssss',
  );

  return data;
};

export default getTags;
