import React, {RefObject, useState} from 'react';
import {View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {HotTrendingItem} from '../item/HotTrendingItem';
import {designatedColor} from '../../constants';
import useChartV2Store from '../../store/useChartV2Store';
import ErrorIcon from '../../assets/svg/error.svg';
import CustomText from '../text/CustomText';

interface HotTrendingV2Props {
  onPressSongButton: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
    lyricsVideoId: string,
  ) => void;
  isScrollingHome: RefObject<View>;
}

const HotTrendingV2 = ({
  onPressSongButton,
  isScrollingHome,
}: HotTrendingV2Props) => {
  // console.log('hi!!22');
  const itemsPerPage = 5; // 페이지 당 항목 수
  const selectedCharts = useChartV2Store(state => state.selectedCharts);
  // const [currentPage, setCurrentPage] = useState(0);
  // const userAgeGroup = useChartV2Store(state => state.userAgeGroup);
  const selectedAgeGroup = useChartV2Store(state => state.selectedAgeGroup);
  const selectedGender = useChartV2Store(state => state.selectedGender);
  const [currentAgeGroup, setCurrentAgeGroup] = useState(selectedAgeGroup); // 연령대
  // const userGender = useChartV2Store(state => state.userGender);
  const setSelectedCharts = useChartV2Store(state => state.setSelectedCharts);
  const [isScrolling, setIsScrolling] = useState(false); // 스크롤 여부를 저장하는 상태

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth * 0.9; // 각 항목이 화면의 90% 차지
  const itemSpacing = screenWidth * 0.05; // 좌우 여백

  const ageGroups = ['ALL', '10', '20', '30', '40+'];

  // 페이지 변경 시 currentPage를 0으로 초기화
  // useEffect(() => {
  //   // setCurrentAgeGroup('ALL');
  //   setCurrentPage(0);
  //   console.log('change!!');
  // }, [currentAgeGroup]);

  const showAgeGroup = (ageGroup: string) => {
    switch (ageGroup) {
      case 'ALL':
        return '전체';
      case '10':
        return '10대';
      case '20':
        return '20대';
      case '30':
        return '30대';
      case '40+':
        return '40대 이상';
      default:
        return ageGroup; // 다른 값은 그대로 반환
    }
  };

  // 연령대 버튼 클릭 시 연령대 데이터 로드
  const handleAgeGroupChange = (ageGroup: string) => {
    // const index = ageGroups.indexOf(ageGroup);
    // setCurrentPage(index);
    setCurrentAgeGroup(ageGroup);
    // console.log('ageGroup:', ageGroup);
    setSelectedCharts(selectedGender, ageGroup);
    // console.log('selectedChart: ', selectedGender, ageGroup);
  };

  // 연령대 별 데이터를 5개씩 끊어서 보여줌
  const groupedCharts = [];
  for (let i = 0; i < selectedCharts.length; i += itemsPerPage) {
    groupedCharts.push(selectedCharts.slice(i, i + itemsPerPage));
  }

  return (
    <View>
      {/* 연령대 인디케이터 */}
      <View
        style={tw`flex-row justify-between py-2 px-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
        {ageGroups.map((ageGroup, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAgeGroupChange(ageGroup)}
            activeOpacity={0.8}
            style={[
              tw`py-2 justify-center items-center px-4`,
              // {
              //   width: screenWidth * 0.17,
              // },
              {
                borderBottomWidth: currentAgeGroup === ageGroup ? 2 : 0,
                borderBottomColor: designatedColor.VIOLET2,
              },
            ]}>
            <CustomText
              style={[
                tw`text-sm font-bold`,
                {
                  color:
                    currentAgeGroup === ageGroup
                      ? designatedColor.VIOLET2
                      : designatedColor.GRAY4,
                },
              ]}>
              {showAgeGroup(ageGroup)}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView //ios 버전
        horizontal
        pagingEnabled={false} // pagingEnabled를 false로 설정합니다.
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={screenWidth * 0.94} // 화면 크기만큼 스와이프되도록 설정
        snapToAlignment="center" // 페이지를 중앙에 맞추도록 설정
        contentContainerStyle={{
          paddingRight: 0, // padding이나 margin을 조정하여 다음 컴포넌트가 보이지 않도록 합니다.
        }}
        onScrollBeginDrag={() => setIsScrolling(true)} // 스크롤 시작 시 스크롤 상태 활성화
        onScrollEndDrag={() => setIsScrolling(false)} // 스크롤 종료 시 스크롤 상태 비활성화
        key={currentAgeGroup}
        style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
        {/* <ScrollView //android 버전
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{
          paddingRight: itemSpacing, // 오른쪽에만 여백을 추가
        }}
        onScrollBeginDrag={() => setIsScrolling(true)} // 스크롤 시작 시 스크롤 상태 활성화
        onScrollEndDrag={() => setIsScrolling(false)} // 스크롤 종료 시 스크롤 상태 비활성화
        key={currentAgeGroup}
        style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}> */}
        {groupedCharts.length > 0 ? (
          groupedCharts.map((group, index) => (
            <View
              key={`group-${index}`}
              style={[
                tw`mr-[${itemSpacing / 2}px]`, // 오른쪽 여백만 설정
                {width: itemWidth}, // 항목 너비를 화면보다 조금 작게 설정
              ]}>
              {group.length > 0 ? (
                group.map((item, idx) => (
                  <View key={idx}>
                    {item.songId !== 0 ? (
                      <HotTrendingItem
                        artistName={item.artistName}
                        isMr={item.isMr}
                        isNew={item.isNew}
                        isLive={item.isLive}
                        album={item.album}
                        melonLink={item.melonLink}
                        ranking={item.ranking}
                        rankingChange={item.rankingChange}
                        songName={item.songName}
                        songNumber={item.songNumber}
                        disabled={isScrolling}
                        onPress={() => {
                          onPressSongButton(
                            item.songId,
                            item.songNumber,
                            item.songName,
                            item.artistName,
                            item.album,
                            item.melonLink,
                            item.isMr,
                            item.isLive,
                            item.lyricsVideoId || '',
                          );
                        }}
                        isScrollingHome={isScrollingHome}
                      />
                    ) : (
                      <View
                        style={tw`flex-row items-center p-2 mx-2 my-1 rounded-lg bg-[${designatedColor.HOT_TRENDING_COLOR}] h-16`}
                      />
                    )}
                  </View>
                ))
              ) : (
                <View
                  style={[
                    tw`justify-center items-center h-[91]`,
                    {width: itemWidth},
                  ]}>
                  <ErrorIcon width={36} height={36} />
                  <CustomText style={tw`text-[${designatedColor.GRAY3}] mt-2`}>
                    곧 업데이트 예정이에요
                  </CustomText>
                </View>
              )}
            </View>
          ))
        ) : (
          <View
            style={[
              tw`justify-center items-center h-[91] `,
              {width: itemWidth},
            ]}>
            <ErrorIcon width={36} height={36} />
            <CustomText style={tw`text-[${designatedColor.GRAY3}] mt-2`}>
              곧 업데이트 예정이에요
            </CustomText>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export {HotTrendingV2};
