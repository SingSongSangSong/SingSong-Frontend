import TokenStore from '../../store/TokenStore';
import {GetPostsCommentsRecommentsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getPostsCommentsRecomments = async (
  postCommentId: number,
  cursor: number,
  size: number,
) => {
  try {
    // console.log('postCommentId for getPostsCommentsRecomments', postCommentId);
    // console.log('cursor for getPostsCommentsRecomments', cursor);
    // console.log('size for getPostsCommentsRecomments', size);
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const params: {cursor?: number; size: number} = {size: size};
    if (cursor !== -1) {
      params.cursor = cursor;
    }

    const response =
      await axiosInstance.get<GetPostsCommentsRecommentsResponse>(
        `v1/posts/comments/${postCommentId}/recomments`,
        {
          params: params,
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
