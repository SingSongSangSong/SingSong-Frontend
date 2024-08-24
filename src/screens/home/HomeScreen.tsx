import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, Modal, SafeAreaView, Text, View} from 'react-native';
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
import SearchIcon from '../../assets/svg/search.svg';
import useMemberStore from '../../store/useMemberStore';
import {logButtonClick, logNavigationClick, logScreenView} from '../../utils';
import {useRoute} from '@react-navigation/native';
import * as amplitude from '@amplitude/analytics-react-native';
// import {firebase} from '@react-native-firebase/analytics';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  // const {memberInfo, getUserInfo} = useHomeInfo();
  // console.log('HomeScreen');
  // useEffect(() => {
  //   if (isEmptyObject(memberInfo)) {
  //     getUserInfo();
  //   }
  // }, []);

  // const navigation = useNavigation();
  const route = useRoute();
  const state = navigation.getState();
  console.log('Current Navigation State:', state);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log('route name', route.name);
  //     logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
  //   });

  //   return unsubscribe;
  // }, [navigation, route]);

  const homeInfohandler = useHomeInfo();
  const memberInfo = useMemberStore(state => state.memberInfo);

  const handleOnTagPress = (tag: string) => {
    console.log('tag press!!');
    amplitude.track('Tag Press');
    logButtonClick('tag_button');
    logNavigationClick(route.name, homeStackNavigations.RCD_DETAIL);
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  const handleOnPreviewTagPress = (tag: string) => {
    amplitude.track('Preview Tag Press');
    logButtonClick('tag_preview_button');
    logNavigationClick(route.name, homeStackNavigations.RCD_DETAIL);
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  const handleOnSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    amplitude.track('Song Preview Press');
    logButtonClick('song_preview_button');
    logNavigationClick(route.name, homeStackNavigations.SONG_DETAIL);
    navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album,
      },
    });

    // navigation.push(homeStackNavigations.SONG_DETAIL, {
    //   songId,
    //   songNumber,
    //   songName,
    //   singerName,
    //   album,
    // });
  };

  const handleOnPressSetting = () => {
    amplitude.track('Setting Press');
    navigation.navigate(homeStackNavigations.SETTING);
  };

  const handleOnPressTotalButton = () => {
    amplitude.track('Tag Total Press');
    logButtonClick('tag_total_button');
    logNavigationClick(route.name, homeStackNavigations.TAG_DETAIL);
    navigation.navigate(homeStackNavigations.TAG_DETAIL);
  };

  const handleOnPressSearch = () => {
    amplitude.track('Search Press');
    navigation.navigate(homeStackNavigations.SEARCH);
  };

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
          <HotTrendingModule />
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
    </GestureRecognizer>
  );
};

export default React.memo(HomeScreen);
