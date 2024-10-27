import TokenStore from '../../store/TokenStore';
import axiosInstance from '../axiosIns';

const deleteComment = async (commentId: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete(`v1/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log('data for deleteBlacklist response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching deleteBlacklist:', error);
    throw error;
  }
};
export default deleteComment;
