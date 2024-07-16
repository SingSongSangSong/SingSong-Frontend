import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import CustomTextButton from '../../components/button/CustomTextButton';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {CustomButton} from '../../components';
import {MainStackParamList} from '../../types';
import {mainNavigations, playlistNavigations} from '../../constants';
import useCategory from '../../hooks/useCategory';

type HomeScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const categoryHandler = useCategory();

  const onSwipeRight = () => {
    navigation.navigate(playlistNavigations.PLAYLIST);
  };

  const handlePress = (tag: string) => {
    navigation.navigate(mainNavigations.RECOMMENDATION, {tag}); // 'TargetScreen'은 라우팅하려는 페이지 이름입니다.
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeRight}
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 80,
      }}
      style={tw`flex-1 bg-black`}>
      <View style={tw`items-end`}>
        <CustomTextButton
          title="플레이리스트"
          onPress={() => navigation.navigate(playlistNavigations.PLAYLIST)}
        />
      </View>
      <View style={tw`items-center justify-center`}>
        <Text style={tw`text-white text-sm font-bold mt-10`}>
          {' '}
          싱송생송만의 노래 추천을 받아보세요
        </Text>
        <View style={tw`mt-5`}>
          {categoryHandler.category.map(tag => (
            <CustomButton
              title={tag}
              color="black"
              onPress={() => handlePress(tag)}
              style="filled"
            />
          ))}
        </View>
      </View>
    </GestureRecognizer>
  );
}
