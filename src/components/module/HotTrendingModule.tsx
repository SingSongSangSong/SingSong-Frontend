import React, {useEffect, useState} from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import useChartStore from '../../store/useChartStore';
import {formatDateString, logToggleClick} from '../../utils';
import {designatedColor} from '../../constants';
import {ToggleButton} from '../button/ToggleButton';
import {HotTrending, HotTrendingV2} from '..';
import {EmptyHotTrending} from '..';
import {useQuery} from '@tanstack/react-query';
// import getChart from '../../api/songs/getChart';
import getV2Chart from '../../api/songs/getV2Chart';
import useChartV2Store from '../../store/useChartV2Store';

interface HotTrendingModuleProps {
  onPressSongButton: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    // album?: string,
    isMr: boolean,
  ) => void;
}

const HotTrendingModule = ({onPressSongButton}: HotTrendingModuleProps) => {
  // const selectedGender = useChartStore(state => state.selectedGender);
  // const setSelectedGender = useChartStore(state => state.setSelectedGender);
  // const time = useChartStore(state => state.time);
  // const setCharts = useChartStore(state => state.setCharts);
  // const setTime = useChartStore(state => state.setTime);
  // const setUserGender = useChartStore(state => state.setUserGender);
  const selectedGender = useChartV2Store(state => state.selectedGender);
  const setSelectedGender = useChartV2Store(state => state.setSelectedGender);
  const time = useChartV2Store(state => state.time);
  const setCharts = useChartV2Store(state => state.setCharts);
  const setTime = useChartV2Store(state => state.setTime);
  const setUserGender = useChartV2Store(state => state.setUserGender);
  const setUserAgeGroup = useChartV2Store(state => state.setUserAgeGroup);
  const setInitCharts = useChartV2Store(state => state.setInitChart);
  const setSelectedCharts = useChartV2Store(state => state.setSelectedCharts);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // const {
  //   data: tempCharts,
  //   error: chartsError,
  //   isFetching: isFetchingCharts,
  // } = useQuery({
  //   queryKey: ['charts'],
  //   queryFn: getChart,
  //   staleTime: 3600000, // 1시간 동안 캐시 유지
  //   select: data => data.data,
  // });

  const {
    data: tempCharts,
    error: chartsError,
    isFetching: isFetchingCharts,
  } = useQuery({
    queryKey: ['chartsV2'],
    queryFn: getV2Chart,
    staleTime: 3600000, // 1시간 동안 캐시 유지
    select: data => data.data,
  });

  // useEffect(() => {
  //   if (tempCharts) {
  //     setCharts('FEMALE', tempCharts.female, 5);
  //     setCharts('MALE', tempCharts.male, 5);
  //     setTime(tempCharts.time);
  //     setUserGender(tempCharts.gender);
  //     // console.log('userGender', tempCharts.gender);
  //   }
  // }, [tempCharts]);

  useEffect(() => {
    if (tempCharts) {
      setInitCharts(tempCharts.charts, 5);
      setUserAgeGroup(tempCharts.ageGroup);
      setTime(tempCharts.time);
      setUserGender(tempCharts.gender);
      setSelectedCharts(tempCharts.gender, tempCharts.ageGroup);
    }
  }, [tempCharts]);

  // const changeGender = () => {
  //   if (selectedGender === 'FEMALE') {
  //     setSelectedGender('MALE');
  //   } else {
  //     setSelectedGender('FEMALE');
  //   }
  // };

  // const toggleSwitch = () => {
  //   logToggleClick('hot_trending');
  //   changeGender();
  // };

  return (
    <View style={tw`flex-1`}>
      {/* Header Section */}
      <View style={tw`flex-row justify-between mx-4 mt-6`}>
        <View style={tw`flex-row items-end mb-2`}>
          <Text style={tw`text-[${designatedColor.PINK}] font-bold text-xl`}>
            HOT TRENDING
          </Text>
          {time && (
            <Text style={tw`text-[${designatedColor.PINK2}] text-[10px] mx-3`}>
              {formatDateString(time)}
            </Text>
          )}
        </View>
        {/* <View style={tw`flex-row items-center`}>
          <Text style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
            {selectedGender === 'FEMALE' ? '여자' : '남자'}
          </Text>
          <ToggleButton toggleSwitch={toggleSwitch} />
        </View> */}
      </View>
      {/* Trending Content */}
      <View>
        {selectedGender != '' ? (
          // <HotTrending
          //   key={selectedGender} // 성별이 바뀔 때마다 컴포넌트 재마운트
          //   onPressSongButton={onPressSongButton}
          // />
          <HotTrendingV2
            key={selectedGender} // 성별이 바뀔 때마다 컴포넌트 재마운트
            onPressSongButton={onPressSongButton}
          />
        ) : (
          <EmptyHotTrending />
        )}
      </View>
      {/* <Modal
        animationType={'slide'}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
          console.log('modal appearance');
        }}>
        <Text>Modal is appearance!</Text>
        <TouchableOpacit
          onPress={() => {
            console.log('모달이 나타남');
          }}>
          <Text>View Alert!</Text>
        </TouchableOpacity>
      </Modal> */}
    </View>
  );
};

export {HotTrendingModule};
