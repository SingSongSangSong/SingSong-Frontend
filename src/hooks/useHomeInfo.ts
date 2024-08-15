import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';
import getChart from '../api/songs/getChart';
import useChartStore from '../store/useChartStore';

const useHomeInfo = () => {
  const {memberInfo, setMemberInfo} = useMemberStore();
  const {setCharts, setUserGender, setSelectedGender, setTime, isEmptyChart} =
    useChartStore();

  const fetchChart = () => {
    return getChart()
      .then(chartData => {
        setCharts('FEMALE', chartData.data.female, 5); // chart 데이터 설정
        setCharts('MALE', chartData.data.male, 5);
        setTime(chartData.data.time);
        setUserGender(chartData.data.gender);
      })
      .catch(error => {
        console.error('Error fetching chart:', error);
      });
  };

  const handleKakaoLogout = () => {
    return postMemberLogout()
      .then(result => {
        console.log('Logout Result:', result);
      })
      .catch(err => {
        console.error('Logout Failed', err);
      });
  };

  const handleWithdraw = () => {
    return postMemberWithdraw().catch(err => {
      console.error('Withdraw Failed', err);
    });
  };

  const getUserInfo = () => {
    return getMember()
      .then(result => {
        setMemberInfo(result.data);
        console.log('userInfo:', result.data);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  };

  return {
    memberInfo,
    fetchChart,
    handleKakaoLogout,
    handleWithdraw,
    getUserInfo,
    setSelectedGender,
    isEmptyChart,
  };
};

export default useHomeInfo;
