import {login} from '@react-native-kakao/user';
import {useEffect, useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {LoginResult} from '../types';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import PermissionStore from '../store/PermissionStore';
// import {Linking} from 'react-native';

const useLogin = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loginResult, setLoginResult] = useState<LoginResult>();
  const [step, setStep] = useState(1); // 현재 단계 (1: 입력, 2: 동의)
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');
  const {getPermissionValue, setPermissionValue} = PermissionStore();
  const [prValue, setPrValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPermissionValue();
      // console.log('data', data);
      if (data) {
        setPrValue(data);
      }
    };
    fetchData();
  }, []);

  const handleGenderToggle = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const {setSecureValue} = TokenStore();

  const handleKakaoLogin = async () => {
    try {
      setIsLoggedProcess(true); //true
      // console.log('isLoggedProcess', isLoggedProcess);
      const result = await login();
      // console.log('result', result);
      setLoginResult(result);
      setIsModalVisible(true);
    } catch (err) {
      console.error('Login Failed', err);
      setIsLoggedProcess(false);
      // console.log('isLoggedProcess', isLoggedProcess);
      Toast.show({
        type: 'selectedToast',
        text1:
          '카카오톡이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    }
  };

  const handleKakaoLogin2 = async () => {
    try {
      setIsLoggedProcess(true); //true
      // console.log('isLoggedProcess', isLoggedProcess);
      const result = await login();
      const data = await postMemberLogin(result); //accessToken 받기, 설정해야됨
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
      setIsLoggedProcess(!isLoggedProcess); //false
    } catch (err) {
      console.error('Login Failed', err);
      setIsLoggedProcess(false);
      // console.log('isLoggedProcess', isLoggedProcess);
      Toast.show({
        type: 'selectedToast',
        text1:
          '카카오톡이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    }
  };

  const _handleKakaoLogin = async () => {
    if (
      loginResult &&
      birthYear != '' &&
      gender != '' &&
      birthYear.length == 4
    ) {
      setIsModalVisible(false);
      const data = await postMemberLogin(loginResult, birthYear, gender); //accessToken 받기, 설정해야됨
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
      setIsLoggedProcess(!isLoggedProcess); //false
      return true;
    } else {
      let message = '모든 정보를 입력해주세요.';
      if (gender != '' && birthYear != '' && birthYear.length != 4) {
        message = '태어난 년도를 정확히 입력해주세요.';
      }
      Toast.show({
        type: 'selectedToast',
        text1: message,
        position: 'bottom',
      });
      return false;
    }
  };

  return {
    step,
    birthYear,
    setBirthYear,
    isLoggedProcess,
    handleKakaoLogin,
    isModalVisible,
    setIsModalVisible,
    _handleKakaoLogin,
    gender,
    prValue,
    handleGenderToggle,
    setStep,
    setPermissionValue,
    handleKakaoLogin2,
  };
};

export default useLogin;
