import React, {RefObject, useEffect, useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
// import useChartStore from '../../store/useChartStore';
import {formatDateString} from '../../utils';
import {designatedColor} from '../../constants';
// import {ToggleButton} from '../button/ToggleButton';
import {HotTrendingV2} from '..';
import {EmptyHotTrending} from '..';
import {useQuery} from '@tanstack/react-query';
// import getChart from '../../api/songs/getChart';
import getV2Chart from '../../api/songs/getV2Chart';
import useChartV2Store from '../../store/useChartV2Store';
import ArrowBottomIcon from '../../assets/svg/arrowBottom.svg';
// import CheckIcon from '../../assets/svg/check.svg';
import CheckFilled2Icon from '../../assets/svg/CheckFilled2.svg';
import CustomText from '../text/CustomText';
interface HotTrendingModuleProps {
  onPressSongButton: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
  ) => void;
  isScrollingHome: RefObject<View>;
}

const HotTrendingModule = ({
  onPressSongButton,
  isScrollingHome,
}: HotTrendingModuleProps) => {
  // const selectedGender = useChartStore(state => state.selectedGender);
  // const setSelectedGender = useChartStore(state => state.setSelectedGender);
  // const time = useChartStore(state => state.time);
  // const setCharts = useChartStore(state => state.setCharts);
  // const setTime = useChartStore(state => state.setTime);
  // const setUserGender = useChartStore(state => state.setUserGender);
  const selectedGender = useChartV2Store(state => state.selectedGender);
  const setSelectedGender = useChartV2Store(state => state.setSelectedGender);
  const setSelectedAgeGroup = useChartV2Store(
    state => state.setSelectedAgeGroup,
  );
  const time = useChartV2Store(state => state.time);
  // const setCharts = useChartV2Store(state => state.setCharts);
  const setTime = useChartV2Store(state => state.setTime);
  const setUserGender = useChartV2Store(state => state.setUserGender);
  const setUserAgeGroup = useChartV2Store(state => state.setUserAgeGroup);
  const setInitCharts = useChartV2Store(state => state.setInitChart);
  const setSelectedCharts = useChartV2Store(state => state.setSelectedCharts);
  const genders = useChartV2Store(state => state.genders);
  // const ageGroups = useChartV2Store(state => state.ageGroups);
  // const userGender = useChartV2Store(state => state.userGender);
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
      // console.log('ageGroup:', tempCharts.ageGroup);
      setTime(tempCharts.time);
      if (tempCharts.gender === 'Unknown') {
        setSelectedGender('MIXED');
        setUserGender('MIXED');
        setSelectedCharts('MIXED', tempCharts.ageGroup);
      } else {
        setSelectedGender(tempCharts.gender);
        setUserGender(tempCharts.gender);
        setSelectedCharts(tempCharts.gender, tempCharts.ageGroup);
      }
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

  const showGender = (gender: string) => {
    switch (gender) {
      case 'MIXED':
        return '전체';
      case 'FEMALE':
        return '여자';
      case 'MALE':
        return '남자';
      default:
        return gender; // 다른 값은 그대로 반환
    }
  };
  const handleOnPressGender = () => {
    // console.log('성별 변경');
    setIsModalVisible(true);
  };

  const handleOnPressChangeGender = (gender: string) => {
    //성별 변경을 했을 시
    setSelectedGender(gender);
    setSelectedAgeGroup('ALL');
  };

  return (
    <View
      style={tw`flex-1 pb-15 pt-5 mt-5 border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
      {/* Header Section */}
      <View style={tw`flex-row justify-between mx-4 mt-6`}>
        <View style={tw`flex-row items-end mb-2`}>
          <CustomText
            style={tw`text-[${designatedColor.VIOLET2}] font-bold text-xl`}>
            HOT TRENDING
          </CustomText>
          {time && (
            <CustomText
              style={tw`text-[${designatedColor.VIOLET}] text-[10px] mx-3`}>
              {formatDateString(time)}
            </CustomText>
          )}
        </View>
        <TouchableOpacity
          style={tw`flex-row items-center rounded-lg bg-[${designatedColor.GRAY5}] px-2`}
          activeOpacity={0.8}
          onPress={handleOnPressGender}>
          <CustomText style={tw`text-white text-[10px]`}>
            {showGender(selectedGender)}
          </CustomText>
          <View style={tw`ml-2`}>
            <ArrowBottomIcon width={12} height={12} />
          </View>
        </TouchableOpacity>
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
            isScrollingHome={isScrollingHome}
          />
        ) : (
          <EmptyHotTrending />
        )}
      </View>
      <Modal
        animationType="fade" // 애니메이션 없이 즉시 사라지도록 설정
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}>
        {/* 모달 바깥을 클릭하면 닫히도록 설정 */}
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)] justify-end`}>
            {/* 모달 안쪽 영역만 따로 터치 가능하도록 분리 */}
            <TouchableWithoutFeedback>
              <View style={tw`bg-black p-6 rounded-t-xl`}>
                {/* 상단 헤더 */}
                <View style={tw`flex-row justify-between items-center`}>
                  <CustomText style={tw`text-white text-lg font-bold`}>
                    성별 변경
                  </CustomText>
                  {/* <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Text style={tw`text-white text-lg`}>✕</Text>
                  </TouchableOpacity> */}
                </View>

                {/* 정보 */}
                <View style={tw`mt-4`}>
                  {/* <Text style={tw`text-[pink] text-sm`}>11112 김민석</Text> */}
                  <View style={tw`mt-4`}>
                    {genders.map(gender => (
                      <View
                        key={gender}
                        // style={tw`flex-row justify-between mt-2 mx-2`}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            handleOnPressChangeGender(gender);
                          }}
                          style={tw`flex-row justify-between mt-2 mx-2 p-2`}
                          activeOpacity={0.8}>
                          <CustomText
                            style={[
                              tw`text-sm`,
                              gender === selectedGender
                                ? tw`text-[${designatedColor.VIOLET2}] font-bold` // userGender가 'FEMALE'이면 핑크색과 굵은 폰트
                                : tw`text-white`, // 그 외에는 기본 흰색
                            ]}>
                            {showGender(gender)}
                          </CustomText>
                          {gender === selectedGender ? (
                            <CheckFilled2Icon width={16} height={16} />
                          ) : (
                            // <CheckIcon width={16} height={16} />
                            <></>
                          )}
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                {/* 닫기 버튼 */}
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  style={tw`py-4 mt-2 border-t-[0.4px] border-[${designatedColor.GRAY5}]`}>
                  <CustomText style={tw`text-center text-white`}>
                    닫기
                  </CustomText>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export {HotTrendingModule};
