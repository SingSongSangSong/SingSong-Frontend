import {LoginResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberLogin = async (
  idToken: string,
  provider: string,
  birthYear?: string,
  gender?: string,
) => {
  try {
    console.log('birthYear:', birthYear);
    console.log('gender', gender);
    console.log('idToken:', idToken);
    console.log('provider:', provider);
    const response = await axiosInstance.post<LoginResponse>('/member/login', {
      birthYear: birthYear,
      gender: gender,
      idToken: idToken,
      provider: provider,
    });
    // console.log('postLogin:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching postLogin:', error);
    throw error;
  }
};
export default postMemberLogin;
