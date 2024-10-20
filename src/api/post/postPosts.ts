import TokenStore from '../../store/TokenStore';
import {PostPostsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postPosts = async (content: string, songIds: number[], title: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    console.log(content, songIds, title);
    const response = await axiosInstance.post<PostPostsResponse>(
      'v1/posts',
      {
        content: content,
        songIds: songIds,
        title: title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postPosts response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postPosts:', error);
    throw error;
  }
};
export default postPosts;
