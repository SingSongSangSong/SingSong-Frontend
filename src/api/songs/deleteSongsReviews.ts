import axios from 'axios';
import TokenStore from '../../store/TokenStore'; // TokenStore를 import해주세요.

const deleteSongReview = async (songNumber: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axios.delete(`/songs/${songNumber}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting song review:', error);
    throw error;
  }
};

export default deleteSongReview;
