import TokenStore from '../../store/TokenStore';
import {MemberInfoResponse} from '../../types';
import axiosInstance from '../axiosIns';

const patchMemberNickname = async (nickname: string) => {
  try {
    const {getAccessToken} = TokenStore();
    const accessToken = await getAccessToken();

    const response = await axiosInstance.patch<MemberInfoResponse>(
      'v1/member/nickname',
      {
        nickname: nickname,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    // console.log('data for recommend member logout response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member nickname:', error);
    throw error;
  }
};
export default patchMemberNickname;
