import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postPostsCommentsLike = async (postCommentId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    // console.log(content, isRecomment, parentCommentId, songId);
    const response = await axiosInstance.post<DefaultResponse>(
      `v1/posts/comments/${postCommentId}/like`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postPostsCommentsLike response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postPostsCommentsLike:', error);
    throw error;
  }
};
export default postPostsCommentsLike;
