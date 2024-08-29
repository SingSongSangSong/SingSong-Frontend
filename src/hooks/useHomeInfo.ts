import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';

const useHomeInfo = () => {
  const handleKakaoLogout = async () => {
    try {
      const result = await postMemberLogout();
      console.log('Logout Result:', result);
    } catch (err) {
      console.error('Logout Failed', err);
    }
  };

  const handleWithdraw = async () => {
    try {
      await postMemberWithdraw();
    } catch (err) {
      console.error('Withdraw Failed', err);
    }
  };

  return {
    memberInfo: useMemberStore(state => state.memberInfo),
    handleKakaoLogout,
    handleWithdraw,
  };
};

export default useHomeInfo;
