import {login, logout, me} from '@react-native-kakao/user';
import {useState} from 'react';
import postLogin from '../api/postLogin';

const useUserInfo = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);

  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 시작
      setIsLoggedProcess(!isLoggedProcess); //true
      const result = await login();
      console.log('Login Result:', result);
      const data = await postLogin(result);
      console.log(data);

      setIsLoggedProcess(!isLoggedProcess); //false
      // 로그인 성공 후 사용자 프로필 가져오기
      // const profile = await getProfile();
      // console.log('Profile:', profile);
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
  };
};

export default useUserInfo;
