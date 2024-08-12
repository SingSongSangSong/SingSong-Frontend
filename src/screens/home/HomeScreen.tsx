import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {HotTrending, Previewlist} from '../../components';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import SettingsIcon from '../../assets/svg/settings.svg';
// import Carousel from '../../components/carousel/Carousel';
import useUserInfo from '../../hooks/useUserInfo';
import LogoIcon from '../../assets/svg/logo.svg';
import {formatDateString} from '../../utils';
import {ToggleButton} from '../../components/button/ToggleButton';
// import HotTrending from './HotTrending';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const userInfoHandler = useUserInfo();

  useEffect(() => {
    if (isEmptyObject(userInfoHandler.memberInfo)) {
      userInfoHandler.getUserInfo();
    }
    console.log('userInfoHandler of chart', userInfoHandler.charts);
    if (isEmptyObject(userInfoHandler.charts)) {
      userInfoHandler.fetchChart();
    }
  }, []);

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
          {/* <Image
            source={require('../../assets/png/appIcon.png')}
            style={tw`w-10 h-10`}
          /> */}
          <LogoIcon />
          <TouchableOpacity onPress={handleOnPressSetting} style={tw`p-2`}>
            <SettingsIcon width={28} height={28} />
          </TouchableOpacity>
        </View>
        {/* 스크롤 가능한 콘텐츠 */}
        <ScrollView contentContainerStyle={tw`w-full flex-grow bg-black`}>
          {/* <View style={tw`h-100 justify-center items-center`}>
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
          </View> */}
          <View style={tw`bg-black`}>
            <View style={tw`flex-row justify-between m-3`}>
              <View style={tw`flex-row items-end`}>
                <Text
                  style={tw`text-[${designatedColor.PINK}] font-bold text-xl `}>
                  HOT TRENDING
                </Text>
                {userInfoHandler.time && (
                  <Text
                    style={tw`text-[${designatedColor.PINK2}] text-[10px] mx-3`}>
                    {formatDateString(userInfoHandler.time)}
                  </Text>
                )}
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
                  {userInfoHandler.selectedGender &&
                  userInfoHandler.selectedGender == 'FEMALE'
                    ? '여'
                    : '남'}
                </Text>
                <ToggleButton
                  isEnabled={userInfoHandler.isEnabled}
                  toggleSwitch={userInfoHandler.toggleSwitch}
                />
              </View>
            </View>

            <HotTrending
              data={userInfoHandler.charts}
              selectedGender={userInfoHandler.selectedGender}
            />
          </View>
          {!isEmptyObject(userInfoHandler.previewSongs) && (
            <View
              style={tw`flex-wrap flex-row justify-center items-center mt-5`}>
              {userInfoHandler.tags.map((tag, index) => (
                <Previewlist
                  tag={tag}
                  key={index}
                  onArrowPress={handleOnArrowPress}
                  data={userInfoHandler.previewSongs[tag]}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
}
