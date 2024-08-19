import getMember from '../api/member/getMember';
import useMemberStore from '../store/useMemberStore';
import postMemberLogout from '../api/member/postMemberLogout';
import postMemberWithdraw from '../api/member/postMemberWithdraw';
import getChart from '../api/songs/getChart';
import useChartStore from '../store/useChartStore';
import useSongStore from '../store/useSongStore';
import {useQuery} from '@tanstack/react-query';
import getTags from '../api/tags/getTags';
import postRcdHome from '../api/recommendation/postRcdHome';
import {useEffect} from 'react';
import {RcdHomeSongWithTags} from '../types';

const useHomeInfo = () => {
  const setMemberInfo = useMemberStore(state => state.setMemberInfo);
  const setCharts = useChartStore(state => state.setCharts);
  const setUserGender = useChartStore(state => state.setUserGender);
  const setSelectedGender = useChartStore(state => state.setSelectedGender);
  const setTime = useChartStore(state => state.setTime);

  const setTags = useSongStore(state => state.setTags);
  const setPreviewSongs = useSongStore(state => state.setPreviewSongs);

  const {
    data: tempTags,
    error: tagsError,
    isFetching: isFetchingTags,
  } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: 3600000, // 1시간 동안 캐시 유지
    select: data => data.data,
  });

  const {
    data: tempRcdHomeSongs,
    error: rcdHomeSongsError,
    isFetching: isFetchingRcdHomeSongs,
  } = useQuery({
    queryKey: ['rcdHomeSongs'],
    queryFn: () => postRcdHome({tags: tempTags || []}),
    enabled: !!tempTags && tempTags.length > 0,
    staleTime: 3600000,
    select: data => data.data,
  });

  const {
    data: tempCharts,
    error: chartsError,
    isFetching: isFetchingCharts,
  } = useQuery({
    queryKey: ['charts'],
    queryFn: getChart,
    staleTime: 3600000, // 1시간 동안 캐시 유지
    select: data => data.data,
  });

  // 차트 데이터를 상태에 저장
  useEffect(() => {
    if (tempCharts) {
      setCharts('FEMALE', tempCharts.female, 5); // chart 데이터 설정
      setCharts('MALE', tempCharts.male, 5);
      setTime(tempCharts.time);
      setUserGender(tempCharts.gender);
      console.log('userGender', tempCharts.gender);
    }
  }, [tempCharts]);

  // 태그 데이터를 상태에 저장
  useEffect(() => {
    if (tempTags) {
      console.log('tempTags:', tempTags);
      setTags(tempTags);
    }
  }, [tempTags]);

  // 추천 노래 데이터를 상태에 저장
  useEffect(() => {
    if (tempRcdHomeSongs) {
      console.log('tempRcdHomeSongs:', tempRcdHomeSongs);
      tempRcdHomeSongs.forEach((songWithTags: RcdHomeSongWithTags) => {
        setPreviewSongs(songWithTags.tag, songWithTags.songs);
      });
      console.log('setPreview Song completed!!!!!!!!!!!');
    }
  }, [tempRcdHomeSongs]);

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

  const getUserInfo = async () => {
    try {
      const result = await getMember();
      setMemberInfo(result.data);
      console.log('userInfo:', result.data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return {
    memberInfo: useMemberStore(state => state.memberInfo),
    handleKakaoLogout,
    handleWithdraw,
    getUserInfo,
    setSelectedGender,
    isFetchingRcdHomeSongs,
    tempRcdHomeSongs,
  };
};

export default useHomeInfo;
