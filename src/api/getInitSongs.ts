import {SongsResponse, TagsResponse} from '../types/songs';
import axiosInstance from './axios';

const getInitSongs = async (props: TagsResponse): Promise<SongsResponse> => {
  const {tags} = props;
  console.log('waiting init song...', tags);
  const {data} = await axiosInstance.post('/api/v1/recommendation/ssss', {
    tags: tags,
  });
  console.log(data);
  return data;
};

export default getInitSongs;
