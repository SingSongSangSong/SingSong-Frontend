import {useEffect} from 'react';
import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';
import Toast from 'react-native-toast-message';
import {useQuery} from '@tanstack/react-query';
import {isEmptyObject} from '../utils';

const useSetting = () => {
  const memberInfo = useMemberStore(state => state.memberInfo);
  const setMemberInfo = useMemberStore(state => state.setMemberInfo);

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

  const handleKakaoLogout = async () => {
    try {
      Toast.show({
        type: 'selectedToast',
        text1: '로그아웃 되었습니다.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
      const result = await postMemberLogout();

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
  };

  return {
    memberInfo,
    handleKakaoLogout,
    handleWithdraw,
  };
};

export default useSetting;
