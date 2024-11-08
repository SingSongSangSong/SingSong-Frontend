import {LoginV2Response} from '../../types';
import axiosInstance from '../axiosIns';

const postMemberLoginV2 = async (
  token: string,
  idToken: string,
  provider: string,
) => {
  try {
    const response = await axiosInstance.post<LoginV2Response>(
      'v2/member/login',
      {
        deviceToken: token,
        idToken: idToken,
        provider: provider,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching postLoginV2:', error);
    throw error;
  }
};
export default postMemberLoginV2;
