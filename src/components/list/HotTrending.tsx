import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import {HotTrendingItem} from '../item/HotTrendingItem';
import {Chart} from '../../types';
import {designatedColor} from '../../constants';

const groupData = (
  data: {[gender: string]: Chart[]},
  itemsPerPage: number,
  selectedGender: string | undefined,
) => {
  const groupedData: {[gender: string]: Chart[][]} = {};

  if (!selectedGender) {
    // selectedGender가 존재하지 않으면 빈 데이터를 채운 그룹을 만듦
    groupedData.empty = [
      Array(itemsPerPage).fill({
        songId: 0,
        songName: '',
        artistName: '',
        isMr: 0,
        rankingChange: 0,
        new: '',
      }),
    ];
  } else {
    Object.keys(data).forEach(gender => {
      const charts = data[gender];
      groupedData[gender] = [];
      for (let i = 0; i < charts.length; i += itemsPerPage) {
        const group = charts.slice(i, i + itemsPerPage);
        // 마지막 그룹이 itemsPerPage 미만일 경우, 빈 데이터를 추가
        while (group.length % itemsPerPage != 0) {
          group.push({
            songId: 0,
            songName: '',
            artistName: '',
            isMr: 0,
            rankingChange: 0,
            new: '',
          } as Chart); // 빈 객체를 추가, 필요한 데이터 형식을 따릅니다.
        }
        console.log('group:', group);
        groupedData[gender].push(group);
        console.log('groupedData:', groupedData);
      }
    });
  }

  return groupedData;
};

interface HotTrendingProps {
  data: {[gender: string]: Chart[]};
  selectedGender: string;
}

const HotTrending = ({data, selectedGender}: HotTrendingProps) => {
  const itemsPerPage = 5;
  const groupedCharts = groupData(data, itemsPerPage, selectedGender);
  console.log('groupedCharts:', groupedCharts);
  console.log('selectedGender:', selectedGender);

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={tw`bg-black`}>
      {groupedCharts[selectedGender || 'empty']?.map((group, index) => (
        <View
          key={`${selectedGender}-${index}`}
          style={[tw`w-full`, {width: Dimensions.get('window').width}]}>
          {group.map((item, idx) => (
            <View key={idx}>
              {item ? (
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
};

export {HotTrending};
