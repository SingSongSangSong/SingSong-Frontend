import {login, me} from '@react-native-kakao/user';
import {useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {LoginResult, ProfileResult} from '../types';

const useLogin = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loginResult, setLoginResult] = useState<LoginResult>();
  const [profile, setProfile] = useState<ProfileResult>();

  const {setSecureValue} = TokenStore();

  const handleKakaoLogin = async () => {
    try {
      setIsLoggedProcess(!isLoggedProcess); //true
      const result = await login();
      setLoginResult(result);

      const profile = await me();
      setProfile(profile);

      setIsModalVisible(true);
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const _handleKakaoLogin = async () => {
    if (loginResult && profile) {
      const data = await postMemberLogin(loginResult, profile); //accessToken 받기, 설정해야됨
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
      setIsLoggedProcess(!isLoggedProcess); //false
    }
  };

  return {
    isLoggedProcess,
    handleKakaoLogin,
    isModalVisible,
    setIsModalVisible,
    _handleKakaoLogin,
  };
};

export default useLogin;
