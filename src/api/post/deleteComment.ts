import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const deleteComment = async (commentId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete<DefaultResponse>(
      `v1/comment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        //   data: {songIds: songNumbers},
      },
    );
    // console.log('data for deleteComment response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching deleteComment:', error);
    throw error;
  }
};
export default deleteComment;
