import axios from 'axios';
import {SongsResponse, TagsResponse} from '../types/songs';

// songs
const getSongs = async (props: TagsResponse): Promise<SongsResponse> => {
  //taglist로 보내주기
  const {tags} = props;

  const sendData = {tags: tags};

  const {data} = await axios.post<SongsResponse>(
    //'http://localhost:8000/api/v1/tags',
    'http://10.0.2.2:8000/api/v1/recommendation/ssss',
    sendData,
  );

  return data;
};

export default getSongs;
