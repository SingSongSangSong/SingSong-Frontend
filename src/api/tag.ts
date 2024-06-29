import axios from 'axios';
import {Props, TagsResponse} from '../types/songs';

// songs
const getTags = async (props: Props): Promise<TagsResponse> => {
  const {energy, electronic, brightness, speed, danceability} = props;

  const transformedData = {
    danceability: danceability / 10,
    energy: energy / 10,
    acousticness: electronic / 10,
    valence: brightness / 10,
    tempo: speed / 10,
  };

  const {data} = await axios.post<TagsResponse>(
    'http://localhost:8000/api/v1/tags',
    transformedData,
  );

  return data;
};

export default getTags;
