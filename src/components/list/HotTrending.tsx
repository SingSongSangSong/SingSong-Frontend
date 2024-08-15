import React, {memo} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {HotTrendingItem} from '../item/HotTrendingItem';
import {Chart} from '../../types';
import {designatedColor} from '../../constants';

interface HotTrendingProps {
  selectedCharts: Chart[];
}

const HotTrending = memo(({selectedCharts}: HotTrendingProps) => {
  const itemsPerPage = 5;

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
