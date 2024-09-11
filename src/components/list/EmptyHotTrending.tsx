import React, {memo} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

const EmptyHotTrending = memo(() => {
  const itemsPerPage = 5;

  // 빈 데이터로 5개의 빈 컴포넌트 생성
  const emptyCharts = new Array(itemsPerPage).fill(null);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={[tw`w-full`, {width: Dimensions.get('window').width}]}>
        {emptyCharts.map((_, idx) => (
          <View
            key={idx}
            style={tw`flex-row items-center p-2 mx-2 my-1 border border-[${designatedColor.GRAY4}] rounded-lg bg-[${designatedColor.HOT_TRENDING_COLOR}] h-16`}
          />
        ))}
      </View>
    </ScrollView>
  );
});

export {EmptyHotTrending};
