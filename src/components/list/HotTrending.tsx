// import React, {memo} from 'react';
// import {View, ScrollView, Dimensions} from 'react-native';
// import tw from 'twrnc';
// import {HotTrendingItem} from '../item/HotTrendingItem';
// import {designatedColor} from '../../constants';
// import useChartStore from '../../store/useChartStore';

// const HotTrending = memo(() => {
//   const itemsPerPage = 5;
//   const selectedCharts = useChartStore(state => state.selectedCharts);

//   const groupedCharts = [];
//   for (let i = 0; i < selectedCharts.length; i += itemsPerPage) {
//     groupedCharts.push(selectedCharts.slice(i, i + itemsPerPage));
//   }

//   const screenWidth = Dimensions.get('window').width;
//   const itemWidth = screenWidth * 0.85; // 각 항목이 화면의 85%를 차지하도록 설정
//   const spacing = (screenWidth - itemWidth) / 2; // 옆에 보이도록 패딩 설정

//   return (
//     <ScrollView
//       horizontal
//       pagingEnabled // 스크롤을 페이지 단위로 고정
//       showsHorizontalScrollIndicator={false}
//       contentContainerStyle={{
//         paddingHorizontal: spacing, // 양쪽에 패딩 추가
//       }}
//       snapToInterval={itemWidth + spacing / 2} // 스냅을 각 항목의 크기에 맞게 설정
//       decelerationRate="fast" // 스크롤 속도 조절
//       style={tw`bg-black`}>
//       {groupedCharts.map((group, index) => (
//         <View
//           key={`group-${index}`}
//           style={{
//             width: itemWidth, // 각 항목의 너비를 설정
//             marginRight: index === groupedCharts.length - 1 ? spacing : 0, // 마지막 그룹이면 오른쪽에 패딩 추가
//           }}>
//           {group.map((item, idx) => (
//             <View key={idx}>
//               {item.songId !== 0 ? (
//                 <HotTrendingItem
//                   artistName={item.artistName}
//                   isMr={item.isMr}
//                   isNew={item.new}
//                   ranking={item.ranking}
//                   rankingChange={item.rankingChange}
//                   songName={item.songName}
//                   songNumber={item.songNumber}
//                 />
//               ) : (
//                 <View
//                   style={tw`flex-row items-center p-2 mx-2 my-1 border border-[${designatedColor.GRAY4}] rounded-lg bg-[${designatedColor.GRAY5}] h-16`}
//                 />
//               )}
//             </View>
//           ))}
//         </View>
//       ))}
//     </ScrollView>
//   );
// });

// export {HotTrending};
import React, {useState} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {HotTrendingItem} from '../item/HotTrendingItem';
import {designatedColor} from '../../constants';
import useChartStore from '../../store/useChartStore';
import {logSwipe} from '../../utils';

const HotTrending = () => {
  const itemsPerPage = 5;
  const selectedCharts = useChartStore(state => state.selectedCharts);

  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가

  const groupedCharts = [];
  for (let i = 0; i < selectedCharts.length; i += itemsPerPage) {
    groupedCharts.push(selectedCharts.slice(i, i + itemsPerPage));
  }

  const screenWidth = Dimensions.get('window').width;

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    // setCurrentPage(index); // 스크롤 위치에 따라 현재 페이지 업데이트
    if (index !== currentPage) {
      setCurrentPage(index); // 스크롤 위치에 따라 현재 페이지 업데이트

      // 페이지 변경 시 일반 로그 호출
      logSwipe('hot_trending', index);
    }
  };

  return (
    <View style={tw`flex-1`}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={tw`bg-black`}
        onScroll={handleScroll}
        scrollEventThrottle={16} // 스크롤 이벤트 빈도 조절
      >
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
      <View style={tw`flex-row justify-center my-2`}>
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
