import TokenStore from '../../store/TokenStore';
import axiosInstance from '../axiosIns';

const putSongReviews = async (
  songNumber: string,
  songReviewOptionId: number,
) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.put(

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

export default putSongReviews;