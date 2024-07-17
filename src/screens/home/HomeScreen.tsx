import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {Previewlist} from '../../components';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations, tags} from '../../constants';
// import useCategory from '../../hooks/useCategory';
import usePreview from '../../hooks/usePreview';
import {ScrollView} from 'react-native-gesture-handler';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  // const categoryHandler = useCategory();
  const previewHandler = usePreview();

  // const onSwipeRight = () => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };

  // const handlePress = (tag: string) => {
  //   navigation.navigate(mainNavigations.RECOMMENDATION, {tag}); // 'TargetScreen'은 라우팅하려는 페이지 이름입니다.
  // };

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
      {/* <View style={tw`items-end`}>
        <CustomTextButton
          title="플레이리스트"
          onPress={() => navigation.navigate(playlistNavigations.PLAYLIST)}
        />
      </View> */}
      <SafeAreaView style={tw`justify-center items-center`}>
        <ScrollView contentContainerStyle={tw`flex-wrap flex-row`}>
          <View style={tw`justify-center items-center`}>
            <Text style={tw`text-white text-sm font-bold mt-10`}>
              {' '}
              싱송생송만의 노래 추천을 받아보세요
            </Text>
            <View style={tw`mt-5`}>
              {/* {categoryHandler.category.map(tag => (
            <CustomButton
              title={tag}
              color="black"
              onPress={() => handlePress(tag)}
              style="filled"
            />
          ))} */}
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
