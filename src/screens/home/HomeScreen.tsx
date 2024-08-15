import React, {useEffect, useCallback} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {
  HotTrendingModule,
  IconButton,
  SongCardModule,
  TaglistModule,
} from '../../components';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {ScrollView} from 'react-native-gesture-handler';
import SettingsIcon from '../../assets/svg/settings.svg';
import LogoIcon from '../../assets/svg/logo.svg';
import useHomeInfo from '../../hooks/useHomeInfo';
import {isEmptyObject} from '../../utils';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {fetchChart, isEmptyChart, memberInfo, getUserInfo} = useHomeInfo();
  console.log('HomeScreen');
  useEffect(() => {
    if (isEmptyObject(memberInfo)) {
      getUserInfo();
    }
    if (isEmptyChart()) {
      fetchChart();
    }
  }, []);

  const handleOnArrowPress = useCallback(
    (tag: string) => {
      navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
    },
    [navigation],
  );

  const handleOnSongPress = useCallback(
    (
      songNumber: number,
      songId: number,
      songName: string,
      singerName: string,
      album: string,
    ) => {
      navigation.navigate(homeStackNavigations.SONG_DETAIL, {
        songId,
        songNumber,
        songName,
        singerName,
        album,
      });
    },
    [navigation],
  );

  const handleOnPressSetting = useCallback(() => {
    navigation.navigate(homeStackNavigations.SETTING);
  }, [navigation]);

  const handleOnPressTotalButton = useCallback(() => {
    navigation.navigate(homeStackNavigations.TAG_DETAIL);
  }, [navigation]);

  return (
    <GestureRecognizer
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 80,
      }}
      style={tw`flex-1 bg-black`}>
      <SafeAreaView style={tw`flex-1 bg-black`}>
        <View
          style={tw` bg-black border-[${designatedColor.BACKGROUND}] border-b justify-between flex-row p-3 items-center`}>
          <LogoIcon />
          <IconButton
            Icon={SettingsIcon}
            onPress={handleOnPressSetting}
            size={28}
          />
        </View>
        <ScrollView contentContainerStyle={tw`w-full flex-grow bg-black`}>
          <HotTrendingModule />
          <TaglistModule
            onPressTagButton={handleOnArrowPress}
            onPressTotalButton={handleOnPressTotalButton}
          />
          <SongCardModule
            onPressSongButton={handleOnSongPress}
            onPressTotalButton={handleOnArrowPress}
          />
        </ScrollView>
      </SafeAreaView>
    </GestureRecognizer>
  );
};

export default React.memo(HomeScreen);
