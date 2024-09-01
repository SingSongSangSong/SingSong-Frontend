import {LoginResponse, LoginResult} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberLogin = async (
  results: LoginResult,
  birthYear?: string,
  gender?: string,
) => {
  try {
    console.log('birthYear:', birthYear);
    console.log('gender', gender);
    const response = await axiosInstance.post<LoginResponse>('/member/login', {
      birthYear: birthYear,
      gender: gender,
      idToken: results.idToken,
      provider: 'KAKAO_KEY',
    });
    console.log('postLogin:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postLogin:', error);
    throw error;
  }
};
export default postMemberLogin;
