import TokenStore from '../../store/TokenStore';
import {PostPostsCommentsResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postPostsComments = async (
  content: string,
  isRecomment: boolean,
  parentCommentId: number,
  postId: number,
  songIds: number[],
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    // console.log(content, isRecomment, parentCommentId, songId);
    console.log('content_hi~: ', content);
    const response = await axiosInstance.post<PostPostsCommentsResponse>(
      'v1/posts/comments',
      {
        content: content,
        isRecomment: isRecomment,
        parentCommentId: parentCommentId,
        postId: postId,
        songIds: songIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for postPostsComments response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postPostsComments:', error);
    throw error;
  }
};
export default postPostsComments;
