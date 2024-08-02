import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constants';
import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberWithdraw = async () => {
  try {
    const {getAccessToken, removeSecureValue} = TokenStore();
    const token = await getAccessToken();
    removeSecureValue(ACCESS_TOKEN);
    removeSecureValue(REFRESH_TOKEN);

    const response = await axiosInstance.post<DefaultResponse>(
      '/member/withdraw',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('data for recommend member withdraw response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member withdraw:', error);
    throw error;
  }
};
export default postMemberWithdraw;
