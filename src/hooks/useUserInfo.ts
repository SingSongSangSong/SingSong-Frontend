import {login, me} from '@react-native-kakao/user';
import {useEffect, useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';
import Toast from 'react-native-toast-message';
import {useQuery} from '@tanstack/react-query';
import {getCurrentVersion, isEmptyObject} from '../utils';
import remoteConfig from '@react-native-firebase/remote-config';
import {BackHandler, Linking} from 'react-native';
import VersionStore from '../store/VersionStore';

const useUserInfo = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const memberInfo = useMemberStore(state => state.memberInfo);
  const setMemberInfo = useMemberStore(state => state.setMemberInfo);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isInit, setIsInit] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isForced, setIsForced] = useState<boolean>(false);
  const [updateUrl, setUpdateUrl] = useState<string>('');
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const setCurrentVersion = VersionStore(state => state.setCurrentVersion);

  const forceUpdateMessage = {
    title: '업데이트 필요',
    message: '앱의 최신 버전으로 업데이트가 필요합니다.',
    buttonPositive: '업데이트',
    buttonNegative: '종료',
  };
  const optionalUpdateMessage = {
    title: '업데이트 알림',
    message: '새로운 기능이 추가된 버전이 있습니다. \n업데이트하시겠습니까?',
    buttonPositive: '업데이트',
    buttonNegative: '나중에',
  };

  const {setSecureValue, getIsValidToken} = TokenStore();

  const {
    data: tempMemberInfo,
    error: memberInfoError,
    isFetching: isFetchingMemberInfo,
  } = useQuery({
    queryKey: ['member'],
    queryFn: getMember,
    staleTime: 3600000,
    select: data => data.data,
  });

  useEffect(() => {
    if (isEmptyObject(memberInfo) && tempMemberInfo) {
      setMemberInfo(tempMemberInfo);
    }
  }, [tempMemberInfo, setMemberInfo, memberInfo]);

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
      Toast.show({
        type: 'selectedToast',
        text1: '로그아웃 되었습니다.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
      const result = await postMemberLogout();

      console.log('Logout Result:', result);
    } catch (err) {
      console.error('Logout Failed', err);
    }
  };

  const handleWithdraw = async () => {
    Toast.show({
      type: 'selectedToast',
      text1: '탈퇴가 완료되었습니다. 그동안 이용해 주셔서 감사합니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
    await postMemberWithdraw();
  };

  const setRemoteConfig = async () => {
    await remoteConfig().setDefaults({
      latestVersion: '1.0.0',
      forceUpdateVersion: '1.0.0',
      updateUrl:
        'https://play.google.com/store/apps/details?id=com.example.app',
    });

    // Remote Config 설정
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 0, // 1시간
    });
  };

  const versionCheck = async () => {
    try {
      await setRemoteConfig();

      const fetchedRemotely = await remoteConfig().fetchAndActivate();

      if (fetchedRemotely) {
        console.log(
          'Remote Config values were fetched from the server and activated.',
        );
      } else {
        console.log('Remote Config values were already up-to-date.');
      }

      // 로컬에서 현재 버전 정보 가져오기
      const currentVersion = await getCurrentVersion();
      setCurrentVersion(currentVersion);

      // Remote Config에서 최신 버전 정보 가져오기
      const latestVersion = remoteConfig().getString('latestVersion');
      const forceUpdateVersion = remoteConfig().getString('forceUpdateVersion');
      const updateUrl = remoteConfig().getString('updateUrl');
      setUpdateUrl(updateUrl);

      console.log('현재 버전:', currentVersion);
      console.log('최신 버전:', latestVersion);
      console.log('강제 업데이트 버전:', forceUpdateVersion);

      // 강제 업데이트가 필요할 경우
      if (currentVersion < forceUpdateVersion) {
        console.log('강제 업데이트가 필요합니다.');
        setIsForced(true);
        setIsModalVisible(true);

        return false; // 강제 업데이트가 필요하므로 false 반환
      } else if (currentVersion < latestVersion) {
        console.log('선택적 업데이트를 권장합니다.');
        setIsModalVisible(true);
        return false; // 선택적 업데이트일 경우 true 반환
      }

      return true; // 업데이트가 필요하지 않으면 true 반환
    } catch (error) {
      console.error('버전 체크 중 오류가 발생했습니다:', error);
      return true; // 오류 발생 시에도 앱을 계속 진행할 수 있도록 true 반환
    }
  };

  const handleOnConfirmButton = () => {
    Linking.openURL(updateUrl);
  };

  const handleOnCancelButton = () => {
    if (isForced) {
      BackHandler.exitApp();
      return;
    }
    setShouldStartAnimation(true);
    setIsModalVisible(false);
  };

  return {
    isInit,
    isEnabled,
    memberInfo,
    isLoggedProcess,
    handleKakaoLogin,
    handleKakaoLogout,
    handleWithdraw,
    getIsValidToken,
    versionCheck,
    forceUpdateMessage,
    optionalUpdateMessage,
    isForced,
    isModalVisible,
    handleOnConfirmButton,
    handleOnCancelButton,
    shouldStartAnimation,
    setShouldStartAnimation,
  };
};

export default useUserInfo;
