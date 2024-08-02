import TokenStore from '../../store/TokenStore';
import {MemberInfoResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getMember = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    const response = await axiosInstance.get<MemberInfoResponse>('/member', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('data for recommend member info response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member info:', error);
    throw error;
  }
};
export default getMember;
