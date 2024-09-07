import {create} from 'zustand';
import {MemberInfo} from '../types';

interface MemberState {
  memberInfo: MemberInfo;
  setMemberInfo: (memberInfo: MemberInfo) => void;
  provider: string;
  setProvider: (provider: string) => void;
}

const useMemberStore = create<MemberState>(set => {
  const initState = {
    memberInfo: {},
    provider: 'KAKAO_KEY',
  };

  return {
    ...initState,

    setMemberInfo: (memberInfo: MemberInfo) => {
      set(() => ({
        memberInfo: memberInfo,
      }));
    },

    setProvider: (provider: string) => {
      set(() => ({
        provider: provider,
      }));
    },
  };
});

export default useMemberStore;
