import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postPostsReport = async (
  postId: number,
  reason: string,
  subjectMemberId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<DefaultResponse>(
      `v1/posts/${postId}/reports`,
      {
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
    // console.log('data for postPostsReport response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postPostsReport:', error);
    throw error;
  }
};
export default postPostsReport;
