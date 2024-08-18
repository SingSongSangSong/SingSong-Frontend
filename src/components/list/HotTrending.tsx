import React, {memo} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {HotTrendingItem} from '../item/HotTrendingItem';
import {designatedColor} from '../../constants';
import useChartStore from '../../store/useChartStore';

const HotTrending = memo(() => {
  const itemsPerPage = 5;
  // const {selectedCharts} = useChartStore();
  const selectedCharts = useChartStore(state => state.selectedCharts);

  const groupedCharts = [];
  for (let i = 0; i < selectedCharts.length; i += itemsPerPage) {
    groupedCharts.push(selectedCharts.slice(i, i + itemsPerPage));
  }

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={tw`bg-black`}>
      {groupedCharts.map((group, index) => (
        <View
          key={`group-${index}`}
          style={[tw`w-full`, {width: Dimensions.get('window').width}]}>
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
  );
});

export {HotTrending};

// import React, {memo} from 'react';
// import {View, Text, ScrollView, Dimensions} from 'react-native';
// import tw from 'twrnc';
// import {HotTrendingItem} from '../item/HotTrendingItem';
// import {designatedColor} from '../../constants';
// import {ToggleButton} from '../button/ToggleButton';
// import useChartStore from '../../store/useChartStore';
// import {formatDateString} from '../../utils';

// const HotTrending = memo(() => {
//   const {selectedCharts, selectedGender, setSelectedGender, time} =
//     useChartStore();
//   console.log('Hot Trending');

//   const changeGender = () => {
//     //성별 변경
//     if (selectedGender == 'FEMALE') {
//       setSelectedGender('MALE');
//     } else {
//       setSelectedGender('FEMALE');
//     }
//   };

//   const toggleSwitch = () => {
//     changeGender();
//   };

//   const itemsPerPage = 5;

//   const groupedCharts = [];
//   for (let i = 0; i < selectedCharts.length; i += itemsPerPage) {
//     groupedCharts.push(selectedCharts.slice(i, i + itemsPerPage));
//   }

//   return (
//     <View style={tw`bg-black my-6`}>
//       {/* Header Section */}
//       <View style={tw`flex-row justify-between mx-4 my-2`}>
//         <View style={tw`flex-row items-end mb-2`}>
//           <Text style={tw`text-[${designatedColor.PINK}] font-bold text-xl`}>
//             HOT TRENDING
//           </Text>
//           {time && (
//             <Text style={tw`text-[${designatedColor.PINK2}] text-[10px] mx-3`}>
//               {formatDateString(time)}
//             </Text>
//           )}
//         </View>
//         <View style={tw`flex-row items-center`}>
//           <Text style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
//             {selectedGender === 'FEMALE' ? '여자' : '남자'}
//           </Text>
//           <ToggleButton toggleSwitch={toggleSwitch} />
//         </View>
//       </View>

//       {/* Chart Section */}
//       <ScrollView
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         style={tw`bg-black`}>
//         {groupedCharts.map((group, index) => (
//           <View
//             key={`group-${index}`}
//             style={[tw`w-full`, {width: Dimensions.get('window').width}]}>
//             {group.map((item, idx) => (
//               <View key={idx}>
//                 {item.songId !== 0 ? (
//                   <HotTrendingItem
//                     artistName={item.artistName}
//                     isMr={item.isMr}
//                     isNew={item.new}
//                     ranking={item.ranking}
//                     rankingChange={item.rankingChange}
//                     songName={item.songName}
//                     songNumber={item.songNumber}
//                   />
//                 ) : (
//                   <View
//                     style={tw`flex-row items-center p-2 mx-2 my-1 border border-[${designatedColor.GRAY4}] rounded-lg bg-[${designatedColor.GRAY5}] h-16`}
//                   />
//                 )}
//               </View>
//             ))}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// });

// export {HotTrending};
