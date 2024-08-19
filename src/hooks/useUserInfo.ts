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
import {isEmptyObject} from '../utils';

const useUserInfo = () => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const memberInfo = useMemberStore(state => state.memberInfo);
  const setMemberInfo = useMemberStore(state => state.setMemberInfo);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [isInit, setIsInit] = useState<boolean>(false);

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

  return {
    isInit,
    isEnabled,
    memberInfo,
    isLoggedProcess,
    handleKakaoLogin,
    handleKakaoLogout,
    handleWithdraw,
    getIsValidToken,
  };
};

export default useUserInfo;
