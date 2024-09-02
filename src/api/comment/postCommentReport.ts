import TokenStore from '../../store/TokenStore';
import {PostCommentReportResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postCommentReport = async (
  commentId: number,
  reason: string,
  subjectMemberId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<PostCommentReportResponse>(
      '/comment/report',
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
    // console.log('data for postCommentReport response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postCommentReport:', error);
    throw error;
  }
};
export default postCommentReport;
