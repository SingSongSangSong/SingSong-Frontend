import React, {useCallback, useEffect, useState} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import {
  AiSongCardModule,
  HotTrendingModule,
  IconButton,
  LlmModule,
  SongCardModule,
  TaglistModule,
} from '../../components';
import {HomeStackParamList} from '../../types';
import {
  appStackNavigations,
  designatedColor,
  homeStackNavigations,
} from '../../constants';
import SettingsIcon from '../../assets/svg/settings.svg';
import LogoIcon from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search.svg';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import useSongStore from '../../store/useSongStore';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GuestStore from '../../store/GuestStore';
import CustomText from '../../components/text/CustomText';
import {CommonActions} from '@react-navigation/native';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../constants';
import TokenStore from '../../store/TokenStore';
import useMemberStore from '../../store/useMemberStore';
import {KeywordModule} from '../../components/module/KeywordModule';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

const HomeScreen = (props: HomeScreenProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const loadingVisible = useSongStore(state => state.loadingVisible);
  // const isGuest = GuestStore(state => state.isGuest);
  const {setGuestState, getGuestState} = GuestStore();
  // const isGuest = getGuestState();
  const screen = Dimensions.get('window');
  const {removeSecureValue} = TokenStore();
  const [isGuest, setIsGuest] = useState();
  const clearMemberInfo = useMemberStore(state => state.clearMemberInfo);
  const clearProvider = useMemberStore(state => state.clearProvider);

  useEffect(() => {
    initIsGuest();
    logPageView(props.route.name);
  }, []);

  const initIsGuest = async () => {
    const tempIsGuest = await getGuestState();
    setIsGuest(tempIsGuest);
  };

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  const handleOnTagPress = useCallback(
    (tag: string) => {
      amplitude.track('tag_button_click');
      logButtonClick('tag_button_click');
      props.navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
    },
    [props.navigation],
  );

  // const handleOnPreviewTagPress = (tag: string) => {
  //   amplitude.track('preview_tag_button_click');
  //   logButtonClick('preview_tag_button_click');
  //   props.navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  // };

  const handleOnSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
  ) => {
    amplitude.track('preview_song_button_click');
    logButtonClick('preview_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album: album || '',
        melonLink,
        isMr,
      },
    });
  };

  const handleOnPressAiTotalButton = () => {
    props.navigation.navigate(homeStackNavigations.AI_RECOMMENDATION);
    // console.log('AI 추천 전체보기 버튼 클릭');
  };

  const handleOnPressLoginButton = async () => {
    removeSecureValue(ACCESS_TOKEN);
    removeSecureValue(REFRESH_TOKEN);
    await setGuestState(false);
    clearMemberInfo();
    clearProvider();
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  const handleOnHotTrendingSongPress = (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
  ) => {
    amplitude.track('hot_trending_song_button_click');
    logButtonClick('hot_trending_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album,
        melonLink,
        isMr,
      },
    });
  };

  const handleOnPressSetting = () => {
    props.navigation.navigate(homeStackNavigations.SETTING);
  };

  const handleOnPressSearch = () => {
    props.navigation.navigate(homeStackNavigations.SEARCH);
  };

  const handleOnPressLlm = () => {
    props.navigation.navigate(homeStackNavigations.AI_LLM);
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
        {isGuest && (
          <View style={tw`bg-[${designatedColor.GRAY5}] p-2 items-center py-4`}>
            <Text style={tw`text-white`}>
              로그인 후 사용하시면 더욱 멋진 경험을 할 수 있습니다
            </Text>
            <TouchableOpacity
              onPress={handleOnPressLoginButton}
              style={tw`mt-2 p-2 border-[1px] border-[${designatedColor.WHITE}] rounded-full px-6`}
              activeOpacity={0.8}>
              <View style={tw`flex-row items-center`}>
                <CustomText
                  style={tw`text-[${designatedColor.WHITE}] font-bold`}>
                  로그인하러 가기
                </CustomText>
                <ArrowRightIcon width={16} height={16} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`w-full flex-grow`}>
          {/* {!isGuest && ( */}
          <LlmModule onPressSearch={handleOnPressLlm} />
          <KeywordModule />
          <AiSongCardModule
            onPressTotalButton={handleOnPressAiTotalButton}
            onPressSongButton={handleOnSongPress}
          />
          {/* )} */}
          <TaglistModule
            onPressTagButton={handleOnTagPress}
            // onPressTotalButton={handleOnPressTotalButton}
          />
          <HotTrendingModule onPressSongButton={handleOnHotTrendingSongPress} />
          {/* <SongCardModule
            onPressSongButton={handleOnSongPress}
            onPressTotalButton={handleOnPreviewTagPress}
          /> */}
        </ScrollView>
        {loadingVisible && (
          <Modal
            transparent={true}
            visible={loadingVisible}
            animationType="fade">
            <View
              // bg-opacity-20
              style={[
                tw`absolute bg-[${designatedColor.BACKGROUND_BLACK}] inset-x-0 bottom-0 justify-center items-center bg-opacity-80`,
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
