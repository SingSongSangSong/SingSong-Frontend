import {create} from 'zustand';
import {MemberInfo} from '../types';

interface MemberState {
  memberInfo: MemberInfo;
  setMemberInfo: (memberInfo: MemberInfo) => void;
}

const useMemberStore = create<MemberState>(set => {
  const initState = {
    memberInfo: {},
  };

  return {
    ...initState,

    setMemberInfo: (memberInfo: MemberInfo) => {
      set(() => ({
        memberInfo: memberInfo,
      }));
    },
  };
});

export default useMemberStore;
