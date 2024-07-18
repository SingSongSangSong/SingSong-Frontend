import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {Previewlist} from '../../components';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations, tags} from '../../constants';
import usePreview from '../../hooks/usePreview';
import {ScrollView} from 'react-native-gesture-handler';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const previewHandler = usePreview();

  const handleOnArrowPress = (tag: string) => {
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  return (
    <GestureRecognizer
      // onSwipeLeft={onSwipeRight}
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 80,
      }}
      style={tw`flex-1 bg-black`}>
      <SafeAreaView style={tw`justify-center items-center`}>
        <ScrollView contentContainerStyle={tw`flex-wrap flex-row`}>
          <View style={tw`justify-center items-center`}>
            <Text style={tw`text-white text-sm font-bold mt-10`}>
              {' '}
              싱송생송만의 노래 추천을 받아보세요
            </Text>
            <View style={tw`mt-5`}>
              {tags.map((tag, index) => (
                <Previewlist
                  tag={tag}
                  index={index}
                  onArrowPress={handleOnArrowPress}
                  data={previewHandler.previewSongs[tag]}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
}
