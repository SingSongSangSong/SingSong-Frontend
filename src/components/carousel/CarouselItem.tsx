import React, {useEffect, useRef} from 'react';
import {RcdExploreSong} from '../../types';
import {Image, Text, View, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
import {LargeButton} from '../button/LargeButton';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

export default function CarouselItem({
  item,
  style,
}: {
  item: RcdExploreSong;
  style: any;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // 페이드 인/아웃을 위한 애니메이션 값
  const scaleAnim = useRef(new Animated.Value(1)).current; // 스케일 애니메이션을 위한 값

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <Animated.View
      style={[
        tw`bg-blue-500 justify-center items-center rounded-3xl overflow-hidden`,
        style,
        {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
      ]}>
      <Image source={{uri: item.album}} style={tw`w-full h-full rounded-3xl`} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0.3,0.9)']}
        style={tw`absolute inset-0 rounded-3xl`}
      />
      <View
        style={tw`absolute bottom-0 w-full p-4 justify-center items-center`}>
        <CustomText style={tw`text-white mb-2 text-xl`}>
          {item.songName} - {item.singerName}
        </CustomText>
        <View style={tw`w-full`}>
          <LargeButton
            title="탐색하기"
            onPress={() => {}}
            color={designatedColor.LIGHT_BLUE}
          />
        </View>
      </View>
    </Animated.View>
  );
}
