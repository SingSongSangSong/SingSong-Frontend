import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constants';
import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberLogout = async () => {
  try {
    const {getAccessToken, removeSecureValue, getSecureValue} = TokenStore();
    const accessToken = await getAccessToken();
    const refreshToken = await getSecureValue(REFRESH_TOKEN);

    removeSecureValue(ACCESS_TOKEN);
    removeSecureValue(REFRESH_TOKEN);

    const response = await axiosInstance.post<DefaultResponse>(
      '/member/logout',
      {
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for recommend member logout response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member logout:', error);
    throw error;
  }
};
export default postMemberLogout;
