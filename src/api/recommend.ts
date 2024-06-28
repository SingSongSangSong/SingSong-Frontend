import axios from 'axios';
import usePropertyStore from '../store/usePropertyStore';
import {SongsResponse} from '../types/songs';

// songs
const getSongs = async (): Promise<SongsResponse> => {
  const {energy, electronic, brightness, speed, danceability} =
    usePropertyStore.getState();

  const transformedData = {
    danceability: danceability / 10,
    energy: energy / 10,
    acousticness: electronic / 10,
    valence: brightness / 10,
    tempo: speed / 10,
  };

  const {data} = await axios.post<SongsResponse>(
    'http://localhost:8000/api/v1/similarity',
    transformedData,
  );

  return data;
};

export default getSongs;
