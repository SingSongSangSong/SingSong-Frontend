import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {Previewlist} from '../../components';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import useSongStore from '../../store/useSongStore';
import SettingsIcon from '../../assets/svg/settings.svg';
import Carousel from '../../components/carousel/Carousel';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const {tags, previewSongs, exploreSongs} = useSongStore();

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
      <SafeAreaView style={tw`flex-1`}>
        {/* 상단 바 */}
        <View
          style={tw` bg-black border-[${designatedColor.BACKGROUND}] border-b justify-between flex-row p-3 items-center`}>
          <Image
            source={require('../../assets/png/appIcon.png')}
            style={tw`w-10 h-10`}
          />
          <TouchableOpacity onPress={handleOnPressSetting} style={tw`p-2`}>
            <SettingsIcon width={28} height={28} />
          </TouchableOpacity>
        </View>

        {/* 스크롤 가능한 콘텐츠 */}
        <ScrollView contentContainerStyle={tw`w-full flex-grow bg-black`}>
          <View style={tw`h-100 justify-center items-center`}>
            {exploreSongs.length > 0 && (
              <Carousel
                exploringSongs={exploreSongs}
                gap={16}
                offset={36}
                pageWidth={
                  Math.round(Dimensions.get('window').width) - (16 + 36) * 2
                }
              />
            )}
          </View>
          {!isEmptyObject(previewSongs) && (
            <View
              style={tw`flex-wrap flex-row justify-center items-center mt-5`}>
              {tags.map((tag, index) => (
                <Previewlist
                  tag={tag}
                  key={index}
                  onArrowPress={handleOnArrowPress}
                  data={previewSongs[tag]}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
}
