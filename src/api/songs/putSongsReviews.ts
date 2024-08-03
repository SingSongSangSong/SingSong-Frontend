import axios from 'axios';
import TokenStore from '../../store/TokenStore'; // TokenStore를 import해주세요.

const putSongReview = async (
  songNumber: string,
  songReviewOptionId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axios.put(
      `/songs/${songNumber}/reviews`,
      {songReviewOptionId: songReviewOptionId},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error putting song review:', error);
    throw error;
  }
};

export default putSongReview;
