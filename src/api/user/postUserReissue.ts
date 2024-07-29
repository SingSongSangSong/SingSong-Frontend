import {LoginResponse} from '../../types';
import axiosInstances from '../axios';

const {axiosInstance} = axiosInstances();

const postUserReissue = async (accessToken: string, refreshToken: string) => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/user/reissue', {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    console.log('Login refresh Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching login:', error);
    throw error;
  }
};
export default postUserReissue;
