import TokenStore from '../../store/TokenStore';
import axiosInstance from '../axiosIns';

const postBlacklist = async (memberId: number) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();

    const response = await axiosInstance.post(
      'v1/blacklist',
      {
        memberId: memberId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for postBlacklist response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postBlacklist:', error);
    throw error;
  }
};
export default postBlacklist;
