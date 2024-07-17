import {SongsResponse, TagsResponse} from '../types/songs';
import axiosInstance from './axios';

const getInitSongs = async (props: TagsResponse): Promise<SongsResponse> => {
  const {tags} = props;

  console.log('waiting init song...', tags);
  const {data} = await axiosInstance.post('/api/v1/recommendation/ssss', {
    tags: tags,
  });
  console.log(data);

  //save tag songs
  // const jsonFilePath = `../assets/data/${tags[0]}.json`;
  // await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
  // console.log(`Data has been saved to ${jsonFilePath} in JSON format.`);

  return data;
};

export default getInitSongs;
