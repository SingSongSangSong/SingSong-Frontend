import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import tw from 'twrnc';
import {
  HotTrendingModule,
  IconButton,
  SongCardModule,
  TaglistModule,
} from '../../components';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import SettingsIcon from '../../assets/svg/settings.svg';
import LogoIcon from '../../assets/svg/logo.svg';
import useHomeInfo from '../../hooks/useHomeInfo';
import SearchIcon from '../../assets/svg/search.svg';
import {logButtonClick} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const homeInfohandler = useHomeInfo();

  const handleOnTagPress = (tag: string) => {
    console.log('tag press!!');
    amplitude.track('Tag Press');
    logButtonClick('tag_button_click');
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  const handleOnPreviewTagPress = (tag: string) => {
    amplitude.track('Preview Tag Press');
    logButtonClick('preview_tag_button_click');
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  const handleOnSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album?: string,
  ) => {
    amplitude.track('Song Preview Press');
    logButtonClick('preview_song_button_click');
    navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album: album || '',
      },
    });
  };

  const handleOnHotTrendingSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album?: string,
  ) => {
    amplitude.track('Song Preview Press');
    logButtonClick('hot_trending_song_button_click');
    navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album: album || '',
      },
    });
  };

  const handleOnPressSetting = () => {
    amplitude.track('Setting Press');
    navigation.navigate(homeStackNavigations.SETTING);
  };

  const handleOnPressTotalButton = () => {
    amplitude.track('Tag Total Press');
    navigation.navigate(homeStackNavigations.TAG_DETAIL);
  };

  const handleOnPressSearch = () => {
    amplitude.track('Search Press');
    navigation.navigate(homeStackNavigations.SEARCH);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View
        style={tw` bg-black border-[${designatedColor.BACKGROUND}] border-b justify-between flex-row p-3 items-center`}>
        <LogoIcon />
        <View style={tw`flex-row`}>
          <View style={tw`mr-2`}>
            <IconButton
              Icon={SearchIcon}
              onPress={handleOnPressSearch}
              size={28}
            />
          </View>

          <IconButton
            Icon={SettingsIcon}
            onPress={handleOnPressSetting}
            size={28}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={tw`w-full flex-grow bg-black`}>
        <HotTrendingModule onPressSongButton={handleOnHotTrendingSongPress} />
        <TaglistModule
          onPressTagButton={handleOnTagPress}
          onPressTotalButton={handleOnPressTotalButton}
        />

        <SongCardModule
          onPressSongButton={handleOnSongPress}
          onPressTotalButton={handleOnPreviewTagPress}
        />
      </ScrollView>
      <Modal
        transparent={true}
        visible={homeInfohandler.loadingVisible}
        animationType="fade"
        // onRequestClose={onClose}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`flex-row`}>
            <ActivityIndicator size="small" color={designatedColor.PINK2} />
            <Text style={tw`text-white font-bold ml-2`}>
              잠시만 기다려주세요
            </Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
    // </GestureRecognizer>
  );
};

export default React.memo(HomeScreen);
