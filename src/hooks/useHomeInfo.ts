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

  const fetchChart = async () => {
    const chartData = await getChart();

    setCharts('FEMALE', chartData.data.female, 5); // chart 데이터 설정, 1번
    setCharts('MALE', chartData.data.male, 5); //1번
    setTime(chartData.data.time); //1번
    setUserGender(chartData.data.gender); //2번
  };

  const handleKakaoLogout = async () => {
    try {
      const result = await postMemberLogout();
      console.log('Logout Result:', result);
    } catch (err) {
      console.error('Logout Failed', err);
    }
  };

  const handleWithdraw = async () => {
    await postMemberWithdraw();
  };

  const getUserInfo = async () => {
    const result = await getMember();
    setMemberInfo(result.data);
    console.log('userInfo:', result.data);
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
