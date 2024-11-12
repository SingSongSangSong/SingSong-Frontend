import {useEffect} from 'react';
import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';
import Toast from 'react-native-toast-message';
// import {useQuery} from '@tanstack/react-query';
import {isEmptyObject} from '../utils';
import useKeepV2Store from '../store/useKeepV2Store';
// import messaging from '@react-native-firebase/messaging';
// import NotificationStore from '../store/NotificationStore';

const useSetting = () => {
  const memberInfo = useMemberStore(state => state.memberInfo);
  const setMemberInfo = useMemberStore(state => state.setMemberInfo);
  const provider = useMemberStore(state => state.provider);
  const clearMemberInfo = useMemberStore(state => state.clearMemberInfo);
  const clearProvider = useMemberStore(state => state.clearProvider);
  const resetKeepList = useKeepV2Store(state => state.resetKeepList);
  const setIsInitalized = useKeepV2Store(state => state.setIsInitialized);
  // const getNotificationStatus = NotificationStore().getNotificationStatus;

  // const {
  //   data: tempMemberInfo,
  //   error: memberInfoError,
  //   isFetching: isFetchingMemberInfo,
  // } = useQuery({
  //   queryKey: ['member'],
  //   queryFn: getMember,
  //   staleTime: 3600000,
  //   select: data => data.data,
  // });

  useEffect(() => {
    if (isEmptyObject(memberInfo)) {
      initMemberInfo();
    }
  }, []);

  const initMemberInfo = async () => {
    try {
      const result = await getMember();
      setMemberInfo(result.data);
    } catch (err) {
      console.error('Get Member Failed', err);
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
      clearMemberInfo();
      clearProvider();
      resetKeepList();
      // setIsInitalized(true);

      // console.log('Logout Result:', result);
    } catch (err) {
      console.error('Logout Failed', err);
    }
  };

  const handleWithdraw = async () => {
    Toast.show({
      type: 'selectedToast',
      text1: '탈퇴가 완료되었습니다. \n그동안 이용해 주셔서 감사합니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
    await postMemberWithdraw();
    clearMemberInfo();
    clearProvider();
    resetKeepList();
    // setIsInitalized(true);
  };

  return {
    memberInfo,
    provider,
    handleKakaoLogout,
    handleWithdraw,
    clearMemberInfo,
    clearProvider,
    resetKeepList,
    setIsInitalized,
  };
};

export default useSetting;
