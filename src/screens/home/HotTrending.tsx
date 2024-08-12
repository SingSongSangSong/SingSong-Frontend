import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';

const data = [
  {
    id: 1,
    rank: 1,
    movement: '-',
    title: '우주를줄게',
    number: '11112',
    artist: '볼빨간사춘기',
    tags: ['MV'],
  },
  {
    id: 2,
    rank: 2,
    movement: '▲',
    title: '걱정말아요 그대(응...',
    number: '22222',
    artist: '이적',
    tags: ['MV', 'OST'],
  },
  {
    id: 3,
    rank: 3,
    movement: '▼',
    title: '눈의 꽃(미안하다 사랑한...',
    number: '22222',
    artist: '박효신',
    tags: ['MV', 'OST'],
  },
  {
    id: 4,
    rank: 4,
    movement: '-',
    title: '걱정말아요 그대(응답하...',
    number: '22222',
    artist: '이적',
    tags: ['MV', 'OST'],
  },
  {
    id: 5,
    rank: 5,
    movement: '-',
    title: '눈의 꽃(미안하다 사랑한...',
    number: '22222',
    artist: '박효신',
    tags: ['MV', 'OST'],
  },
  {
    id: 6,
    rank: 6,
    movement: '-',
    title: '사랑에 빠졌죠',
    number: '33333',
    artist: '박효신',
    tags: ['MV'],
  },
  {
    id: 7,
    rank: 7,
    movement: '▲',
    title: '널 사랑하겠어',
    number: '44444',
    artist: '이적',
    tags: ['OST'],
  },
  {
    id: 8,
    rank: 8,
    movement: '▼',
    title: '그날의 너',
    number: '55555',
    artist: '볼빨간사춘기',
    tags: ['MV', 'OST'],
  },
  {
    id: 9,
    rank: 9,
    movement: '▲',
    title: '바람이 불어오는 곳',
    number: '66666',
    artist: '이적',
    tags: ['MV', 'OST'],
  },
  {
    id: 10,
    rank: 10,
    movement: '-',
    title: '너의 모든 순간',
    number: '77777',
    artist: '성시경',
    tags: ['MV', 'OST'],
  },
];

const SongItem = ({rank, movement, title, number, artist, tags}) => (
  <View style={tw`flex-row items-center p-3 border-b border-gray-700`}>
    <Text style={tw`text-orange-500 text-xl w-10 text-center`}>{rank}</Text>
    <Text style={tw`text-red-500 text-xl w-8 text-center`}>{movement}</Text>
    <View style={tw`flex-1 pl-2`}>
      <View style={tw`flex-row mb-1`}>
        {tags.map((tag, index) => (
          <Text
            key={index}
            style={tw`bg-${
              tag === 'MV' ? 'orange-500' : 'purple-500'
            } text-white text-xs px-2 py-1 rounded mr-2`}>
            {tag}
          </Text>
        ))}
      </View>
      <Text style={tw`text-white text-lg mb-1`}>{title}</Text>
      <Text style={tw`text-purple-500 text-lg`}>{number}</Text>
      <Text style={tw`text-white text-base`}>{artist}</Text>
    </View>
  </View>
);

const HotTrending = () => {
  // 데이터를 5개씩 나눈 그룹
  const firstHalf = data.slice(0, 5);
  const secondHalf = data.slice(5, 10);

  return (
    <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
      <View style={[tw`w-full`, {width: Dimensions.get('window').width}]}>
        {firstHalf.map(item => (
          <SongItem
            key={item.id}
            rank={item.rank}
            movement={item.movement}
            title={item.title}
            number={item.number}
            artist={item.artist}
            tags={item.tags}
          />
        ))}
      </View>
      <View style={[tw`w-full`, {width: Dimensions.get('window').width}]}>
        {secondHalf.map(item => (
          <SongItem
            key={item.id}
            rank={item.rank}
            movement={item.movement}
            title={item.title}
            number={item.number}
            artist={item.artist}
            tags={item.tags}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default HotTrending;
