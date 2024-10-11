import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constants';
// import PermissionStore from '../../store/PermissionStore';
import TokenStore from '../../store/TokenStore';
import {DefaultResponse} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberWithdraw = async () => {
  try {
    const {getAccessToken, removeSecureValue, getSecureValue} = TokenStore();
    // const {deletePermissionValue} = PermissionStore();
    const accessToken = await getAccessToken();
    const refreshToken = await getSecureValue(REFRESH_TOKEN);

    removeSecureValue(ACCESS_TOKEN);
    removeSecureValue(REFRESH_TOKEN);
    // deletePermissionValue();

    const response = await axiosInstance.post<DefaultResponse>(
      'v1/member/withdraw',
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
    // console.log('data for recommend member withdraw response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member withdraw:', error);
    throw error;
  }
};
export default postMemberWithdraw;
