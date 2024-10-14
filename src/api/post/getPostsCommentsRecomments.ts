import TokenStore from '../../store/TokenStore';
import {GetPostsCommentsRecommentsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getPostsCommentsRecomments = async (
  postCommentId: number,
  cursor: number,
  size: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response =
      await axiosInstance.get<GetPostsCommentsRecommentsResponse>(
        `v1/posts/comments/${postCommentId}/recomments`,
        {
          params: {cursor: cursor, size: size},
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    // console.log('data for getPostsCommentsRecomments response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching getPostsCommentsRecomments:', error);
    throw error;
  }
};

export default getPostsCommentsRecomments;
