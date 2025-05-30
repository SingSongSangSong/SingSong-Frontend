import TokenStore from '../../store/TokenStore';
import {MemberInfoResponse} from '../../types';
import axiosInstance from '../axiosIns';

const getMember = async () => {
  try {
    const {getAccessToken} = TokenStore();
    const token = await getAccessToken();
    // console.log('token', token);
    const response = await axiosInstance.get<MemberInfoResponse>('v1/member', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log('data for get member info response', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching member info:', error);
    throw error;
  }
};
export default getMember;
