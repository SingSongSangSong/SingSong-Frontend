import {LoginResponse, LoginResult} from '../../types';
import axiosInstances from '../axios';

const {axiosInstance} = axiosInstances();

const postUserLogin = async (results: LoginResult) => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/user/login', {
      IdToken: results.idToken,
      Provider: 'KAKAO',
    });
    console.log('postLogin:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postLogin:', error);
    throw error;
  }
};
export default postUserLogin;
