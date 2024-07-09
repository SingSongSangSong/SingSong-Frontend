// import axios from 'axios';
// import {Props, SongsResponse} from '../types/songs';

// const getTemp = async (props: Props): Promise<SongsResponse> => {
//   const {energy, electronic, brightness, speed, danceability} = props;

//   const transformedData = {
//     danceability: danceability / 10,
//     energy: energy / 10,
//     acousticness: electronic / 10,
//     valence: brightness / 10,
//     tempo: speed / 10,
//   };

//   const {data} = await axios.post<SongsResponse>(
//     // 'http://localhost:8000/api/v1/similarity',
//     'http://10.0.2.2:8000/api/v1/similarity',
//     transformedData,
//   );

//   return data;
// };

// export default getTemp;
