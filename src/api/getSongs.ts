import {SongWithTagsProps, SongsResponse} from '../types/songs';
import axiosInstance from './axios';

const getSongs = async (props: SongWithTagsProps): Promise<SongsResponse> => {
  const {songNumber, songTags, additionTags} = props;
  const requestTags = songTags.concat(additionTags);
  const {data} = await axiosInstance.post('/api/v1/recommendation', {
    song_number: songNumber,
    tags: requestTags,
  });

  return data;
};

export default getSongs;
