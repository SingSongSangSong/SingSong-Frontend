import TokenStore from '../../store/TokenStore';
import {GetPostsCommentsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getPostsComments = async (
  postId: number,
  cursor: number,
  size: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    console.log('postId: ', postId);
    console.log('cursor: ', cursor);
    console.log('size: ', size);

    const params: {postId: number; cursor?: number; size: number} = {
      postId: postId,
      size: size,
    };
    if (cursor !== -1) {
      params.cursor = cursor;
    }

    const response = await axiosInstance.get<GetPostsCommentsResponse>(
      `v1/posts/${postId}/comments`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for getPostsComments response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getPostsComments:', error);
    throw error;
  }
};

export default getPostsComments;
