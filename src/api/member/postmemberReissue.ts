import {LoginResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberReissue = async (accessToken: string, refreshToken: string) => {
  try {
    console.log('accessToken:', accessToken);
    console.log('refreshToken:', refreshToken);

    const response = await axiosInstance.post<LoginResponse>(
      '/member/reissue',
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    );
    console.log('Login reissue Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching reissue:', error);
    throw error;
  }
};
export default postMemberReissue;
