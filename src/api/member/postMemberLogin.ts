import {LoginResponse, LoginResult, ProfileResult} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberLogin = async (
  results: LoginResult,
  profile: ProfileResult,
) => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/member/login', {
      birthYear: profile.birthyear,
      gender: profile.gender,
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
