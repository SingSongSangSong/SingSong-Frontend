import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import CarouselItem from './CarouselItem'; // 사용자 정의 CarouselItem 컴포넌트
import tw from 'twrnc';
import {RcdExploreSong} from '../../types';

interface ICarousel {
  gap: number;
  offset: number;
  exploringSongs: RcdExploreSong[];
  pageWidth: number;
}

export default function Carousel({
  exploringSongs,
  pageWidth,
  gap,
  offset,
}: ICarousel) {
  const [page, setPage] = useState(1); // 첫 번째 아이템을 두 번째로 설정
  const flatListRef = useRef<FlatList>(null);

  const loopData = [
    exploringSongs[exploringSongs.length - 1], // 마지막 아이템을 첫 번째로 복제
    ...exploringSongs,
    exploringSongs[0], // 첫 번째 아이템을 마지막으로 복제
  ];

  useEffect(() => {
    // 페이지 이동을 제어하여 깜빡임을 방지
    if (page === 0) {
      setPage(loopData.length - 2);
      flatListRef.current?.scrollToIndex({
        index: loopData.length - 2,
        animated: false,
      });
    } else if (page === loopData.length - 1) {
      setPage(1);
      flatListRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
    }
  }, [page, loopData.length]);

  function renderItem({item}: {item: RcdExploreSong}) {
    return (
      <CarouselItem
        item={item}
        style={{width: pageWidth, marginHorizontal: gap / 2}}
      />
    );
  }

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <View style={tw`justify-center items-center my-4`}>
      <FlatList
        ref={flatListRef}
        data={loopData}
        horizontal
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum={true}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        onScroll={onScroll}
        pagingEnabled
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        decelerationRate={0.8}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        getItemLayout={(data, index) => ({
          length: pageWidth + gap,
          offset: (pageWidth + gap) * index,
          index,
        })}
        initialScrollIndex={1}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const newPage = Math.round(offsetX / (pageWidth + gap));

          if (newPage === 0) {
            flatListRef.current?.scrollToOffset({
              offset: (loopData.length - 2) * (pageWidth + gap),
              animated: false,
            });
          } else if (newPage === loopData.length - 1) {
            flatListRef.current?.scrollToOffset({
              offset: pageWidth + gap,
              animated: false,
            });
          }
        }}
      />
      <View style={tw`flex-row items-center justify-center my-4`}>
        {exploringSongs.map((_, i) => (
          <View
            key={`indicator_${i}`}
            style={[
              tw`m-1 w-1.5 h-1.5 rounded-full`,
              i === (page - 1 + exploringSongs.length) % exploringSongs.length
                ? tw`bg-gray-800`
                : tw`bg-gray-300`,
            ]}
          />
        ))}
      </View>
    </View>
  );
}
