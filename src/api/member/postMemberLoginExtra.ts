import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberLoginExtra = async (birthYear: string, gender: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    // console.log('birthYear', birthYear);
    // console.log('gender', gender);
    // console.log(token);
    const response = await axiosInstance.post<DefaultResponse>(
      'v2/member/login/extra',
      {
        birthYear: birthYear,
        gender: gender,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for post member login extra response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member login extra:', error);
    throw error;
  }
};
export default postMemberLoginExtra;
