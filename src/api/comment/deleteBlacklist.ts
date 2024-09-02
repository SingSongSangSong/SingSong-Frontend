import TokenStore from '../../store/TokenStore';
import axiosInstance from '../axiosIns';

const deleteBlacklist = async (memberIds: number[]) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete('/blacklist', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {memberIds: memberIds},
    });
    // console.log('data for deleteBlacklist response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching deleteBlacklist:', error);
    throw error;
  }
};
export default deleteBlacklist;
