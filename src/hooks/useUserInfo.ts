import {login, logout, me} from '@react-native-kakao/user';
import {useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

const useUserInfo = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const {
    // getSecureValue,
    setSecureValue,
    // isValidAccessToken,
    // isValidRefreshToken,
    getIsValidToken,
  } = TokenStore();

  // const isValidAccessToken = async () => {
  //   const accessToken = await getSecureValue(ACCESS_TOKEN);
  //   const refreshToken = await getSecureValue(REFRESH_TOKEN);
  //   if (accessToken && isExpiredToken(accessToken)) {
  //     console.log('Token expired');
  //     const reissueData = await postMemberReissue(accessToken, refreshToken);
  //     setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
  //     setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
  //   }
  // };

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
      const result = await logout();
      console.log('Logout Result:', result);
    } catch (err) {
      console.error('Logout Failed', err);
    }
  };

  return {
    isLoggedProcess,
    handleKakaoLogin,
    handleKakaoLogout,
    getIsValidToken,
  };
};

export default useUserInfo;
