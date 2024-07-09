import axios from 'axios';
import {SongWithTagsProps, SongsResponse} from '../types/songs';

// songs
const getSongs = async (props: SongWithTagsProps): Promise<SongsResponse> => {
  //taglist로 보내주기
  const {songNumber, tags} = props;

  const sendData = {song_number: songNumber, tags: tags};

  const {data} = await axios.post<SongsResponse>(
    //'http://localhost:8000/api/v1/tags',
    'http://10.0.2.2:8000/api/v1/recommendation',
    sendData,
  );

  return data;
};

export default getSongs;
