import {login, logout, me} from '@react-native-kakao/user';
import {useState} from 'react';
import postUserLogin from '../api/user/postUserLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

const useUserInfo = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const {getSecureValue, setSecureValue, isValidToken} = TokenStore();

  const getIsValidToken = async (): Promise<boolean> => {
    const accessToken = await getSecureValue(ACCESS_TOKEN);
    if (!accessToken) {
      return false;
    }
    isValidToken();
    return true;
  };

  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 시작
      setIsLoggedProcess(!isLoggedProcess); //true
      const result = await login();
      console.log('Login Result:', result);
      const data = await postUserLogin(result); //accessToken 받기, 설정해야됨
      console.log(data);
      //설정하기
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);

      setIsLoggedProcess(!isLoggedProcess); //false
      const profile = await me();
      console.log('Profile', profile);

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
