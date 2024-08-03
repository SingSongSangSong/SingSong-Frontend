import {login, me} from '@react-native-kakao/user';
import {useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';

const useUserInfo = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const {memberInfo, setMemberInfo} = useMemberStore();

  const {setSecureValue, getIsValidToken} = TokenStore();

  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 시작
      setIsLoggedProcess(!isLoggedProcess); //true
      const result = await login();
      console.log('Login Result:', result);
      const profile = await me();
      console.log('Profile', profile);
      const data = await postMemberLogin(result, profile); //accessToken 받기, 설정해야됨
      console.log(data);
      //설정하기
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
      setIsLoggedProcess(!isLoggedProcess); //false
      // Alert.alert('Login Success', `Welcome ${profile.nickname}`);
    } catch (err) {
      console.error('Login Failed', err);
      // Alert.alert('Login Failed', err.message);
    }
  };

  const handleKakaoLogout = async () => {
    try {
      const result = await postMemberLogout();
      console.log('Logout Result:', result);
    } catch (err) {
      console.error('Logout Failed', err);
    }
  };

  const handleWithdraw = async () => {
    await postMemberWithdraw();
  };

  const getUserInfo = async () => {
    const result = await getMember();
    // setUserInfo(result.data);
    setMemberInfo(result.data);
    console.log('userInfo:', result.data);
  };

  return {
    memberInfo,
    isLoggedProcess,
    handleKakaoLogin,
    handleKakaoLogout,
    handleWithdraw,
    getIsValidToken,
    getUserInfo,
  };
};

export default useUserInfo;
