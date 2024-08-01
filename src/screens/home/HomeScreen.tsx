import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {Previewlist} from '../../components';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import useDataStore from '../../store/useSongStore';
import SettingsIcon from '../../assets/svg/settings.svg';
type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {tags, previewSongs} = useDataStore();

  const isEmptyObject = (obj: Record<string, any>): boolean => {
    return Reflect.ownKeys(obj).length === 0;
  };

  const handleOnArrowPress = (tag: string) => {
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  const handleOnPressSetting = () => {
    navigation.navigate(homeStackNavigations.SETTING);
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
        <View
          style={tw`w-full bg-black border-[${designatedColor.BACKGROUND}] border-b justify-between flex-row p-3 items-center`}>
          <Image
            source={require('../../assets/png/appIcon.png')}
            style={tw`w-10 h-10`}
          />
          <TouchableOpacity onPress={handleOnPressSetting} style={tw`p-2`}>
            <SettingsIcon width={28} height={28} />
          </TouchableOpacity>
        </View>
        {!isEmptyObject(previewSongs) && (
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
                    data={previewSongs[tag]}
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
