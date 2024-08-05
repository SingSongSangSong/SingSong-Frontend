import TokenStore from '../../store/TokenStore';
import axiosInstance from '../axiosIns';

const deleteSongsReviews = async (songNumber: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.delete(
      `/songs/${songNumber}/reviews`,
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
    console.error('Error deleting song review:', error);
    throw error;
  }
};

export default deleteSongsReviews;
