import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postPostsCommentsReport = async (
  commentId: number,
  reason: string,
  subjectMemberId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<DefaultResponse>(
      'v1/posts/comments/report',
      {
        commentId: commentId,
        reason: reason,
        subjectMemberId: subjectMemberId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postPostsCommentReport response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postPostsCommentsReport:', error);
    throw error;
  }
};
export default postPostsCommentsReport;
