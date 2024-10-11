import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  LatestCommentModule,
  LlmModule,
  NewSongModule,
  TaglistModule,
} from '../../components';
import {HomeStackParamList} from '../../types';
import {
  appStackNavigations,
  designatedColor,
  homeStackNavigations,
} from '../../constants';
import SettingsIcon from '../../assets/svg/settings.svg';
// import LogoIcon from '../../assets/svg/logo.svg';
import LogoIcon from '../../assets/svg/whiteLogo.svg';
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
import {AppEventsLogger} from 'react-native-fbsdk-next';
// import {getTrackingStatus} from 'react-native-tracking-transparency';
import {RESULTS} from 'react-native-permissions';
import TrackingStore from '../../store/TrackingStore';

type HomeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.RCD_HOME
>;

const HomeScreen = (props: HomeScreenProps) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  // const [guestHeight, setGuestHeight] = useState(0);
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
    setFbLogEvent();
  }, []);

  const initIsGuest = async () => {
    const tempIsGuest = await getGuestState();
    setIsGuest(tempIsGuest);
  };

  const setFbLogEvent = async () => {
    // const trackingStatus = await getTrackingStatus();
    // const trackingStatus = await request(
    //   PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    // );
    // if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    //   AppEventsLogger.logEvent('page_view', {
    //     screen: 'Home',
    //   });
    // }
    // 'RESULTS' 상수를 사용하여 비교
    const trackingStatus = await TrackingStore().getTrackingStatus();
    if (
      trackingStatus &&
      (trackingStatus === RESULTS.GRANTED ||
        trackingStatus === RESULTS.UNAVAILABLE)
    ) {
      AppEventsLogger.logEvent('page_view', {
        screen: 'Home',
      });
    }
    // else {
    //   console.warn('Tracking not authorized or unavailable');
    // }
  };

  const handleOnLayout = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  // const handleOnGuestLayout = (event: LayoutChangeEvent) => {
  //   const {height} = event.nativeEvent.layout;
  //   setGuestHeight(height);
  // };

  const handleOnTagPress = useCallback(
    (tag: string) => {
      amplitude.track('tag_button_click');
      logButtonClick('tag_button_click');
      props.navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
    },
    [props.navigation],
  );

  // const touchableRef = useRef(null);
  const touchableRef = useRef<View>(null);

  const disableButton = () => {
    if (touchableRef.current) {
      // console.log('disableButton');
      touchableRef.current.setNativeProps({
        pointerEvents: 'none',
        opacity: 0.5,
      });
    }
  };

  const enableButton = () => {
    if (touchableRef.current) {
      // console.log('enableButton');
      touchableRef.current.setNativeProps({pointerEvents: 'auto', opacity: 1});
    }
  };

  // const handleOnPreviewTagPress = (tag: string) => {
  //   amplitude.track('preview_tag_button_click');
  //   logButtonClick('preview_tag_button_click');
  //   props.navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  // };

  const handleOnSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
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
        isLive,
      },
    });
  };

  const handleOnCommentPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => {
    amplitude.track('comment_song_button_click');
    logButtonClick('comment_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongComment',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId,
        songNumber,
        songName,
        singerName,
        album: album || '',
        melonLink,
        isMr,
        isLive,
      },
    });
  };

  const handleOnPressAiTotalButton = () => {
    props.navigation.navigate(homeStackNavigations.AI_RECOMMENDATION);
    // console.log('AI 추천 전체보기 버튼 클릭');
  };

  const handleOnPressNewSongTotalButton = () => {
    props.navigation.navigate(homeStackNavigations.NEW_SONG);
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
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
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
        isLive,
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
        style={tw`border-[${designatedColor.BACKGROUND}] border-b`}
        onLayout={handleOnLayout}>
        <View style={tw`justify-between flex-row p-3 pl-0 items-center`}>
          <LogoIcon width={90} height={48} />
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
          <View
            style={tw`bg-[${designatedColor.GRAY5}] p-2 items-center py-4`}
            // onLayout={handleOnGuestLayout}
          >
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
        <ScrollView
          contentContainerStyle={tw`w-full flex-grow`}
          // onScrollBeginDrag={() => setIsScrollingHome(true)} // 스크롤이 시작될 때
          // onScrollEndDrag={() => setIsScrollingHome(false)} // 스크롤이 멈출 때
          onScrollBeginDrag={disableButton} // 스크롤 시작 시 버튼 비활성화
          // style={{
          //   paddingTop: guestHeight,
          // }}
          onScrollEndDrag={enableButton}
          scrollEventThrottle={16}>
          {/* {!isGuest && ( */}
          <LatestCommentModule onPressCommentButton={handleOnCommentPress} />
          <NewSongModule
            onPressTotalButton={handleOnPressNewSongTotalButton}
            onPressSongButton={handleOnSongPress}
          />

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
          <HotTrendingModule
            onPressSongButton={handleOnHotTrendingSongPress}
            // isScrollingHome={isScrollingHome}
            isScrollingHome={touchableRef}
          />
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
                tw`absolute top-0 left-0 w-full h-full bg-[${designatedColor.BACKGROUND_BLACK}] inset-x-0 bottom-0 justify-center items-center bg-opacity-70`,
                // {marginTop: headerHeight},
              ]}>
              <View style={tw`flex-row`}>
                <ActivityIndicator
                  size="small"
                  color={designatedColor.VIOLET}
                />
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
