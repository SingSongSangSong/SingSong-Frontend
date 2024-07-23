import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {Previewlist} from '../../components';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import useDataStore from '../../store/useDataStore';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {tags, tagWithSongs} = useDataStore();
  const isEmptyObject = (obj: Record<string, any>): boolean => {
    return Reflect.ownKeys(obj).length === 0;
  };

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
        {!isEmptyObject(tagWithSongs) && (
          <ScrollView contentContainerStyle={tw`flex-wrap flex-row`}>
            <View style={tw`justify-center items-center`}>
              <Text style={tw`text-white text-sm font-bold mt-10`}>
                {' '}
                싱송생송만의 노래 추천을 받아보세요
              </Text>
              <Text />
              <View style={tw`mt-5`}>
                {tags.map((tag, index) => (
                  <Previewlist
                    tag={tag}
                    key={index}
                    onArrowPress={handleOnArrowPress}
                    data={tagWithSongs[tag]}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </GestureRecognizer>
  );
}
