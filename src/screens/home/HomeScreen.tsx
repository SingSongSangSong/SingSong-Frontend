import React, {useCallback, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  View,
  LayoutChangeEvent,
  Platform,
  Dimensions,
} from 'react-native';
import tw from 'twrnc';
import {
  AiSongCardModule,
  HotTrendingModule,
  IconButton,
  SongCardModule,
  TaglistModule,
} from '../../components';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import SettingsIcon from '../../assets/svg/settings.svg';
import LogoIcon from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search.svg';
import {logButtonClick} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import useSongStore from '../../store/useSongStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GuestStore from '../../store/GuestStore';
import CustomText from '../../components/text/CustomText';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const loadingVisible = useSongStore(state => state.loadingVisible);
  const isGuest = GuestStore(state => state.isGuest);
  const screen = Dimensions.get('window');

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  const handleOnTagPress = useCallback(
    (tag: string) => {
      amplitude.track('tag_button_click');
      logButtonClick('tag_button_click');
      navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
    },
    [navigation],
  );

  const handleOnPreviewTagPress = (tag: string) => {
    amplitude.track('preview_tag_button_click');
    logButtonClick('preview_tag_button_click');
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  const handleOnSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    isMr: boolean,
  ) => {
    amplitude.track('preview_song_button_click');
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
        isMr,
      },
    });
  };

  const handleOnPressAiTotalButton = () => {
    navigation.navigate(homeStackNavigations.AI_RECOMMENDATION);
    console.log('AI 추천 전체보기 버튼 클릭');
  };

  const handleOnHotTrendingSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    isMr: boolean,
  ) => {
    amplitude.track('hot_trending_song_button_click');
    logButtonClick('hot_trending_song_button_click');
    navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album,
        isMr,
      },
    });
  };

  const handleOnPressSetting = () => {
    navigation.navigate(homeStackNavigations.SETTING);
  };

  const handleOnPressSearch = () => {
    navigation.navigate(homeStackNavigations.SEARCH);
  };

  // const handleOnPressTotalButton = useCallback(() => {
  //   navigation.navigate(homeStackNavigations.TAG_DETAIL);
  // }, [navigation]);

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        {height: screen.height},
        Platform.OS === 'ios' && {
          paddingTop: insets.top,
          // paddingBottom: 80,
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View
        style={tw`border-[${designatedColor.BACKGROUND}] border-b  `}
        onLayout={handleOnLayout}>
        <View style={tw`justify-between flex-row p-3 items-center`}>
          <LogoIcon />
          <View style={tw`flex-row`}>
            {isGuest ? (
              <View style={tw`py-6`} />
            ) : (
              <>
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
              </>
            )}
          </View>
        </View>
        {/* <View style={tw`bg-[${designatedColor.PINK}] p-2 items-center py-3`}>
          <Text style={tw`text-black font-bold`}>
            로그인 후 사용하시면 더욱 멋진 경험을 할 수 있습니다
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{name: appStackNavigations.LOGIN}],
                }),
              )
            }>
            <Text>로그인하러 가기</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <View style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`w-full flex-grow`}>
          {/* {!isGuest && ( */}
          <HotTrendingModule onPressSongButton={handleOnHotTrendingSongPress} />
          {/* )} */}

          <TaglistModule
            onPressTagButton={handleOnTagPress}
            // onPressTotalButton={handleOnPressTotalButton}
          />
          <AiSongCardModule
            onPressTotalButton={handleOnPressAiTotalButton}
            onPressSongButton={handleOnSongPress}
          />
          <SongCardModule
            onPressSongButton={handleOnSongPress}
            onPressTotalButton={handleOnPreviewTagPress}
          />
        </ScrollView>
        {loadingVisible && (
          <Modal
            transparent={true}
            visible={loadingVisible}
            animationType="fade">
            <View
              style={[
                tw`absolute bg-black inset-x-0 bottom-0 justify-center items-center bg-opacity-50`,
                {top: headerHeight},
              ]}>
              <View style={tw`flex-row`}>
                <ActivityIndicator size="small" color={designatedColor.PINK2} />
                <CustomText style={tw`text-white font-bold ml-2`}>
                  잠시만 기다려주세요
                </CustomText>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
};

export default React.memo(HomeScreen);
