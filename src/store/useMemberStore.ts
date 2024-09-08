import {create} from 'zustand';
import {MemberInfo} from '../types';

interface MemberState {
  memberInfo: MemberInfo;
  setMemberInfo: (memberInfo: MemberInfo) => void;
  clearMemberInfo: () => void;
  provider: string;
  setProvider: (provider: string) => void;
  clearProvider: () => void;
}

const useMemberStore = create<MemberState>(set => {
  const initState = {
    memberInfo: {} as MemberInfo,
    provider: '',
  };

  return {
    ...initState,

    setMemberInfo: (memberInfo: MemberInfo) => {
      set(() => ({
        memberInfo: memberInfo,
      }));
    },

    clearMemberInfo: () => {
      set(() => ({
        memberInfo: {},
      }));
    },

    setProvider: (provider: string) => {
      set(() => ({
        provider: provider,
      }));
    },

    clearProvider: () => {
      set(() => ({
        provider: '',
      }));
    },
  };
});

export default useMemberStore;
