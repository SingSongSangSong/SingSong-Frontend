import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import useChartStore from '../../store/useChartStore';
import {formatDateString, logToggleClick} from '../../utils';
import {designatedColor} from '../../constants';
import {ToggleButton} from '../button/ToggleButton';
import {HotTrending} from '..';
import {EmptyHotTrending} from '..';
import {useQuery} from '@tanstack/react-query';
import getChart from '../../api/songs/getChart';

interface HotTrendingModuleProps {
  onPressSongButton: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album?: string,
  ) => void;
}
const HotTrendingModule = ({onPressSongButton}: HotTrendingModuleProps) => {
  const selectedGender = useChartStore(state => state.selectedGender);
  const setSelectedGender = useChartStore(state => state.setSelectedGender);
  const time = useChartStore(state => state.time);
  const setCharts = useChartStore(state => state.setCharts);
  const setTime = useChartStore(state => state.setTime);
  const setUserGender = useChartStore(state => state.setUserGender);

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

  useEffect(() => {
    if (tempCharts) {
      setCharts('FEMALE', tempCharts.female, 5); // chart 데이터 설정
      setCharts('MALE', tempCharts.male, 5);
      setTime(tempCharts.time);
      setUserGender(tempCharts.gender);
      // console.log('userGender', tempCharts.gender);
    }
  }, [tempCharts]);

  const changeGender = () => {
    if (selectedGender === 'FEMALE') {
      setSelectedGender('MALE');
    } else {
      setSelectedGender('FEMALE');
    }
  };

  const toggleSwitch = () => {
    logToggleClick('hot_trending');
    changeGender();
  };

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
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
            {selectedGender === 'FEMALE' ? '여자' : '남자'}
          </Text>
          <ToggleButton toggleSwitch={toggleSwitch} />
        </View>
      </View>

      {/* Trending Content */}

      <View>
        {selectedGender != '' ? (
          <HotTrending onPressSongButton={onPressSongButton} />
        ) : (
          <EmptyHotTrending />
        )}
      </View>
    </View>
  );
};

export {HotTrendingModule};
