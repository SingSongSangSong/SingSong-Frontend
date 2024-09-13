import React, {useState, useEffect} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {HotTrendingItem} from '../item/HotTrendingItem';
import {designatedColor} from '../../constants';
import useChartStore from '../../store/useChartStore';
import {logSwipe} from '../../utils';

interface HotTrendingProps {
  onPressSongButton: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    isMr: boolean,
  ) => void;
}

const HotTrending = ({onPressSongButton}: HotTrendingProps) => {
  const itemsPerPage = 5;
  const selectedCharts = useChartStore(state => state.selectedCharts);
  const [currentPage, setCurrentPage] = useState(0);

  const groupedCharts = [];
  for (let i = 0; i < selectedCharts.length; i += itemsPerPage) {
    groupedCharts.push(selectedCharts.slice(i, i + itemsPerPage));
  }

  const screenWidth = Dimensions.get('window').width;

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    if (index !== currentPage) {
      setCurrentPage(index); // 스크롤 위치에 따라 현재 페이지 업데이트
      logSwipe('hot_trending', index); // 로그 기록
    }
  };

  useEffect(() => {
    // 성별 변경 시 currentPage를 0으로 초기화
    setCurrentPage(0);
  }, [selectedCharts]);

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {groupedCharts.map((group, index) => (
          <View
            key={`group-${index}`}
            style={[tw`w-full`, {width: screenWidth}]}>
            {group.map((item, idx) => (
              <View key={idx}>
                {item.songId !== 0 ? (
                  <HotTrendingItem
                    artistName={item.artistName}
                    isMr={item.isMr}
                    isNew={item.new}
                    ranking={item.ranking}
                    rankingChange={item.rankingChange}
                    songName={item.songName}
                    songNumber={item.songNumber}
                    onPress={() => {
                      onPressSongButton(
                        item.songNumber,
                        item.songId,
                        item.songName,
                        item.artistName,
                        item.isMr == 1 ? true : false,
                      );
                    }}
                  />
                ) : (
                  <View
                    style={tw`flex-row items-center p-2 mx-2 my-1 border border-[${designatedColor.GRAY4}] rounded-lg bg-[${designatedColor.GRAY5}] h-16`}
                  />
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* 페이지 인디케이터 */}
      <View style={tw`flex-row justify-center my-4`}>
        {groupedCharts.map((_, index) => (
          <View
            key={index}
            style={[
              tw`h-2 w-2 mx-1 rounded-full`,
              {
                backgroundColor:
                  index === currentPage
                    ? designatedColor.PINK
                    : designatedColor.GRAY4,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export {HotTrending};
