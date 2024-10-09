import TokenStore from '../../store/TokenStore';
import {LlmSongResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postRcdRecommendationLlm = async (userInput: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.post<LlmSongResponse>(
      'v1/recommend/recommendation/functionCalling',
      {userInput: userInput},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for recommend song llm response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching llm:', error);
    throw error;
  }
};
export default postRcdRecommendationLlm;
