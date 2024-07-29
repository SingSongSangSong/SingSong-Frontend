import {LoginResponse, LoginResult} from '../types';
import axiosInstance from './axios';

const postLogin = async (results: LoginResult) => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/user/login', {
      IdToken: results.idToken,
      Provider: 'kakao',
    });
    console.log('Login Response22:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
};
export default postLogin;
