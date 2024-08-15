import {useState} from 'react';
import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';
import getChart from '../api/songs/getChart';
import useChartStore from '../store/useChartStore';
import useSongStore from '../store/useSongStore';

const useHomeInfo = () => {
  const {memberInfo, setMemberInfo} = useMemberStore();
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  //   const [isInit, setIsInit] = useState<boolean>(false);
  const {
    setCharts,
    selectedCharts,
    userGender,
    setUserGender,
    selectedGender,
    setSelectedGender,
    time,
    setTime,
    isEmptyChart,
  } = useChartStore();
  const {tags, previewSongs} = useSongStore();

  //   const [selectedGender, setSelectedGender] = useState<string>();

  // useEffect(() => {
  //   setSelectedGender(gender);
  // }, [gender]);

  const fetchChart = () => {
    console.log('fetchChart request!!!!!!!!!!!!!!!!');
    getChart()
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

  const changeGender = () => {
    //성별 변경
    if (selectedGender == 'FEMALE') {
      setSelectedGender('MALE');
    } else {
      setSelectedGender('FEMALE');
    }
  };

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    changeGender();
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
    // setUserInfo(result.data);
    setMemberInfo(result.data);
    console.log('userInfo:', result.data);
  };

  return {
    tags,
    previewSongs,
    time,
    userGender,
    selectedCharts,
    selectedGender,
    isEnabled,
    toggleSwitch,
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
