import {login} from '@react-native-kakao/user';
import {useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {LoginResult} from '../types';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
// import {Linking} from 'react-native';

const useLogin = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loginResult, setLoginResult] = useState<LoginResult>();
  const [step, setStep] = useState(1); // 현재 단계 (1: 입력, 2: 동의)
  const [birthYear, setBirthYear] = useState('');
  const [gender, setGender] = useState('');

  const handleGenderToggle = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const {setSecureValue} = TokenStore();

  const handleKakaoLogin = async () => {
    try {
      setIsLoggedProcess(true); //true
      console.log('isLoggedProcess', isLoggedProcess);
      const result = await login();
      console.log('result', result);
      setLoginResult(result);
      setIsModalVisible(true);
    } catch (err) {
      console.error('Login Failed', err);
      setIsLoggedProcess(false);
      console.log('isLoggedProcess', isLoggedProcess);
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
    if (loginResult && birthYear != '' && gender != '') {
      console.log('loginResult', loginResult);
      console.log('birthYear', birthYear);
      console.log('gender', gender);
      const data = await postMemberLogin(loginResult, birthYear, gender); //accessToken 받기, 설정해야됨
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
      setIsLoggedProcess(!isLoggedProcess); //false
    } else {
      Toast.show({
        type: 'selectedToast',
        text1: '모든 정보를 입력해주세요.',
        position: 'bottom',
      });
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
    handleGenderToggle,
    setStep,
  };
};

export default useLogin;
