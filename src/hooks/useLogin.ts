import {login} from '@react-native-kakao/user';
import {useState} from 'react';
// import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, appStackNavigations, REFRESH_TOKEN} from '../constants';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
// import PermissionStore from '../store/PermissionStore';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import useMemberStore from '../store/useMemberStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from '../types';
import GuestStore from '../store/GuestStore';
import postMemberLoginV2 from '../api/member/postMemberLoginV2';
import {logTrack} from '../utils';
import useKeepV2Store from '../store/useKeepV2Store';

type UseLoginProps = {
  navigation: StackNavigationProp<
    AppStackParamList,
    typeof appStackNavigations.LOGIN
  >;
};

const useLogin = ({navigation}: UseLoginProps) => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const {setGuestState} = GuestStore();
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const [idToken, setIdToken] = useState<string>();
  // const [step, setStep] = useState(1); // 현재 단계 (1: 입력, 2: 동의)
  // const [birthYear, setBirthYear] = useState('');
  // const [gender, setGender] = useState('');
  // const {getPermissionValue} = PermissionStore();
  // const [prValue, setPrValue] = useState('');
  const {setProvider} = useMemberStore();
  const {setSecureValue} = TokenStore();
  const setIsInitialized = useKeepV2Store(state => state.setIsInitialized);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getPermissionValue();
  //     // console.log('data', data);
  //     if (data) {
  //       setPrValue(data);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const handleGenderToggle = (selectedGender: string) => {
  //   setGender(selectedGender);
  // };

  //회원가입인 경우
  const handleKakaoLogin = async () => {
    setIsInitialized(false);
    setProvider('KAKAO_KEY');
    try {
      setIsLoggedProcess(true); //true
      const result = await login();
      const tempData = await postMemberLoginV2(
        result.idToken || '',
        'KAKAO_KEY',
      );
      setSecureValue(ACCESS_TOKEN, tempData.data.accessToken);
      setSecureValue(REFRESH_TOKEN, tempData.data.refreshToken);
      setIsLoggedProcess(false);
      if (tempData.data.isInfoRequired) {
        navigation.replace(appStackNavigations.TERMS);
        logTrack('kakao_login_button_click');
      } else {
        navigation.replace(appStackNavigations.MAIN);
        logTrack('kakao_login_button_click');
      }
    } catch (err) {
      console.error('Login Failed', err);
      setIsLoggedProcess(false);
      Toast.show({
        type: 'selectedToast',
        text1:
          '카카오톡이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    }
  };

  // //그냥 로그인인 경우
  // const handleKakaoLogin2 = async () => {
  //   setProvider('KAKAO_KEY');
  //   try {
  //     setIsLoggedProcess(true); //true
  //     const result = await login();
  //     if (result.idToken) {
  //       const data = await postMemberLogin(result.idToken, 'KAKAO_KEY'); //accessToken 받기, 설정해야됨
  //       setSecureValue(ACCESS_TOKEN, data.data.accessToken);
  //       setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
  //       setIsLoggedProcess(!isLoggedProcess); //false
  //       navigation.replace(appStackNavigations.MAIN);
  //     } else {
  //       Toast.show({
  //         type: 'selectedToast',
  //         text1:
  //           '카카오톡이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
  //         position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
  //         visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
  //       });
  //       setIsLoggedProcess(!isLoggedProcess); //false
  //     }
  //   } catch (err) {
  //     console.error('Login Failed', err);
  //     setIsLoggedProcess(false);
  //     Toast.show({
  //       type: 'selectedToast',
  //       text1:
  //         '카카오톡이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
  //       position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
  //       visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
  //     });
  //   }
  // };

  //회원가입인 경우
  const handleAppleLogin = async () => {
    setIsInitialized(false);
    setProvider('APPLE_KEY');
    try {
      setIsLoggedProcess(true); //true

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const {identityToken} = appleAuthRequestResponse;

      const tempData = await postMemberLoginV2(
        identityToken || '',
        'APPLE_KEY',
      );

      setSecureValue(ACCESS_TOKEN, tempData.data.accessToken);
      setSecureValue(REFRESH_TOKEN, tempData.data.refreshToken);
      setIsLoggedProcess(false);
      if (tempData.data.isInfoRequired) {
        navigation.replace(appStackNavigations.TERMS);
        logTrack('apple_login_button_click');
      } else {
        navigation.replace(appStackNavigations.MAIN);
        logTrack('apple_login_button_click');
      }
      // navigation.replace(appStackNavigations.TERMS, {
      //   provider: 'APPLE_KEY',
      //   idToken: identityToken || '',
      // });
    } catch (err) {
      console.error('Login Failed', err);
      setIsLoggedProcess(false);
      // console.log('isLoggedProcess', isLoggedProcess);
      Toast.show({
        type: 'selectedToast',
        text1:
          'Apple이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    }
  };

  // //회원가입이 아닌 그냥 로그인인 경우
  // const handleAppleLogin2 = async () => {
  //   setProvider('APPLE_KEY');
  //   try {
  //     setIsLoggedProcess(true); //true
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });

  //     const {identityToken} = appleAuthRequestResponse;

  //     const data = await postMemberLogin(identityToken!, 'APPLE_KEY'); //accessToken 받기, 설정해야됨

  //     setSecureValue(ACCESS_TOKEN, data.data.accessToken);
  //     setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
  //     setIsLoggedProcess(!isLoggedProcess); //false
  //     navigation.replace(appStackNavigations.MAIN);
  //   } catch (err) {
  //     console.error('Login Failed', err);
  //     setIsLoggedProcess(false);
  //     Toast.show({
  //       type: 'selectedToast',
  //       text1:
  //         'Apple이 계정에 연결되어 있지 않습니다. \n연결 후 다시 시도해주세요.',
  //       position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
  //       visibilityTime: 10000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
  //     });
  //   }
  // };

  const handleGuestLogin = async () => {
    setIsInitialized(false);
    setGuestState(true);
    setIsLoggedProcess(true);
    const data = await postMemberLoginV2('', 'Anonymous');
    setSecureValue(ACCESS_TOKEN, data.data.accessToken);
    setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
    setIsLoggedProcess(false);
    logTrack('guest_login_button_click');
    navigation.replace(appStackNavigations.MAIN);
  };

  //모달에서 완료 버튼 클릭
  // const _handleLogin = async () => {
  //   if (idToken && birthYear != '' && gender != '' && birthYear.length == 4) {
  //     setIsModalVisible(false);
  //     const data = await postMemberLogin(idToken, provider!, birthYear, gender); //accessToken 받기, 설정해야됨
  //     setSecureValue(ACCESS_TOKEN, data.data.accessToken);
  //     setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
  //     setIsLoggedProcess(!isLoggedProcess); //false
  //     return true;
  //   } else {
  //     let message = '모든 정보를 입력해주세요.';
  //     if (gender != '' && birthYear != '' && birthYear.length != 4) {
  //       message = '태어난 년도를 정확히 입력해주세요.';
  //     }
  //     Toast.show({
  //       type: 'selectedToast',
  //       text1: message,
  //       position: 'bottom',
  //     });
  //     return false;
  //   }
  // };

  return {
    isLoggedProcess,
    // prValue,
    handleKakaoLogin,
    // handleKakaoLogin2,
    handleAppleLogin,
    // handleAppleLogin2,
    handleGuestLogin,
  };
};

export default useLogin;
