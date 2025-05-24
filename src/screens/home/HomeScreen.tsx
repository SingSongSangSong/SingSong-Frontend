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
  RefreshControl,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import tw from 'twrnc';
import {
  HotTrendingModule,
  IconButton,
  LatestCommentModule,
  LlmModule,
  NewSongModule,
  RecentCommentSongModule,
  RecentKeepModule,
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
import {logButtonClick, logPageView, logTrack} from '../../utils';
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
// import {AppEventsLogger} from 'react-native-fbsdk-next';
// import {getTrackingStatus} from 'react-native-tracking-transparency';
import {RESULTS} from 'react-native-permissions';
import TrackingStore from '../../store/TrackingStore';
// import CuImageIcon from '../../assets/svg/cuImage.svg';
// import BannerIcon from '../../assets/svg/banner.svg';
import useRecord from '../../hooks/useRecord';

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
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const recordHandler = useRecord();

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     if (Platform.OS === 'android') {
  //       try {
  //         const grants = await PermissionsAndroid.requestMultiple([
  //           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         ]);

  //         console.log('write external storage', grants);

  //         if (
  //           grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
  //             PermissionsAndroid.RESULTS.GRANTED &&
  //           grants['android.permission.READ_EXTERNAL_STORAGE'] ===
  //             PermissionsAndroid.RESULTS.GRANTED &&
  //           grants['android.permission.RECORD_AUDIO'] ===
  //             PermissionsAndroid.RESULTS.GRANTED
  //         ) {
  //           console.log('Permissions granted');
  //         } else {
  //           console.log('All required permissions not granted');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     }
  //   };

  //   requestPermissions(); // 권한 요청 함수 실행
  // }, []); // 컴포넌트가 처음 마운트될 때만 실행됨

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 새로고침 로직
    // 예: API 호출, 상태 리셋 등
    setTimeout(() => {
      setRefreshing(false);
      // 홈 컴포넌트 전체 리렌더링을 위한 로직
      // 필요한 경우 상태 업데이트 등
    }, 500); // 새로고침 지연 시간
  }, []);

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
      // AppEventsLogger.logEvent('page_view', {
      //   screen: 'Home',
      // });
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
      // amplitude.track('tag_button_click');
      amplitude.track('tag_button_click', {
        tag_name: tag,
      });
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
    lyricsVideoId: string,
  ) => {
    amplitude.track('preview_song_button_click');
    logButtonClick('preview_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId: songId,
        songNumber: songNumber,
        songName: songName,
        singerName: singerName,
        album: album || '',
        melonLink: melonLink,
        isMr: isMr,
        isLive: isLive,
        lyricsVideoId: lyricsVideoId,
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
    lyricsVideoId: string,
  ) => {
    amplitude.track('comment_song_button_click');
    logButtonClick('comment_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongComment',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId: songId,
        songNumber: songNumber,
        songName: songName,
        singerName: singerName,
        album: album || '',
        melonLink: melonLink,
        isMr: isMr,
        isLive: isLive,
        lyricsVideoId: lyricsVideoId,
      },
    });
  };

  const handleOnPressNewSongTotalButton = () => {
    logTrack('new_song_total_button_click');
    props.navigation.navigate(homeStackNavigations.NEW_SONG);
  };

  const handleOnPressLoginButton = async () => {
    removeSecureValue(ACCESS_TOKEN);
    removeSecureValue(REFRESH_TOKEN);
    await setGuestState(false);
    clearMemberInfo();
    clearProvider();
    logTrack('in_guest_login_button_click');
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
    lyricsVideoId: string,
  ) => {
    amplitude.track('hot_trending_song_button_click');
    logButtonClick('hot_trending_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId: songId,
        songNumber: songNumber,
        songName: songName,
        singerName: singerName,
        album: album || '',
        melonLink: melonLink,
        isMr: isMr,
        isLive: isLive,
        lyricsVideoId: lyricsVideoId,
      },
    });
  };

  const handleOnPressRecentKeepSong = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
    lyricsVideoId: string,
  ) => {
    amplitude.track('recent_keep_song_button_click');
    logButtonClick('recent_keep_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId: songId,
        songNumber: songNumber,
        songName: songName,
        singerName: singerName,
        album: album || '',
        melonLink: melonLink,
        isMr: isMr,
        isLive: isLive,
        lyricsVideoId: lyricsVideoId,
      },
    });
  };

  const handleOnPressRecentCommentSong = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
    lyricsVideoId: string,
  ) => {
    amplitude.track('recent_comment_song_button_click');
    logButtonClick('recent_comment_song_button_click');
    props.navigation.navigate({
      key: 'MyUniqueKeyForSongDetail',
      name: homeStackNavigations.SONG_DETAIL,
      params: {
        songId: songId,
        songNumber: songNumber,
        songName: songName,
        singerName: singerName,
        album: album || '',
        melonLink: melonLink,
        isMr: isMr,
        isLive: isLive,
        lyricsVideoId: lyricsVideoId,
      },
    });
  };

  const handleOnPressSetting = () => {
    props.navigation.navigate(homeStackNavigations.SETTING);
  };

  // const handleOnPressSearch = () => {
  //   logButtonClick('search_button_click');
  //   props.navigation.navigate(homeStackNavigations.SEARCH);
  // };

  const handleOnPressLlm = () => {
    logButtonClick('llm_button_click');
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
            {/* <View style={tw`mr-2`}>
              <IconButton
                Icon={SearchIcon}
                onPress={handleOnPressSearch}
                size={28}
              />
            </View> */}

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
        {/* <TouchableOpacity
          onPress={recordHandler.handleStartRecord}
          style={tw`bg-white py-4`}>
          <CustomText>녹음 시작</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={recordHandler.handleStopRecord}
          style={tw`bg-white py-4`}>
          <CustomText>녹음 정지 및 MP3 변환</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={recordHandler.soundStart}
          style={tw`bg-white py-4`}>
          <CustomText>녹음 재생</CustomText>
        </TouchableOpacity> */}

        <ScrollView
          contentContainerStyle={tw`w-full flex-grow`}
          // onScrollBeginDrag={() => setIsScrollingHome(true)} // 스크롤이 시작될 때
          // onScrollEndDrag={() => setIsScrollingHome(false)} // 스크롤이 멈출 때
          onScrollBeginDrag={disableButton} // 스크롤 시작 시 버튼 비활성화
          // style={{
          //   paddingTop: guestHeight,
          // }}
          onScrollEndDrag={enableButton}
          scrollEventThrottle={16}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={designatedColor.VIOLET} // iOS 로딩 아이콘 색상
              colors={[designatedColor.VIOLET]} // Android 로딩 아이콘 색상 배열
            />
          }>
          {/* {!isGuest && ( */}
          <LatestCommentModule
            onPressCommentButton={handleOnCommentPress}
            refreshing={refreshing}
          />

          <TaglistModule
            onPressTagButton={handleOnTagPress}
            // onPressTotalButton={handleOnPressTotalButton}
          />
          {/* <LlmModule onPressSearch={handleOnPressLlm} refreshing={refreshing} /> */}
          {/* <TouchableOpacity
            style={tw`flex-row items-center justify-between bg-[${designatedColor.YELLOW}] mt-6`}
            onPress={() => {
              Linking.openURL('https://forms.gle/TXytjUW6Rfiqu7vw6');
            }}
            activeOpacity={1.0}>
            <View style={tw`pl-3`}>
              <BannerIcon width={screen.width * 0.7} height={100} />
            </View>
            <CuImageIcon width={screen.width * 0.25} height={100} />
          </TouchableOpacity> */}

          {/* <AiSongCardModule
            onPressTotalButton={handleOnPressAiTotalButton}
            onPressSongButton={handleOnSongPress}
            refreshing={refreshing}
          /> */}
          <HotTrendingModule
            onPressSongButton={handleOnHotTrendingSongPress}
            // isScrollingHome={isScrollingHome}
            isScrollingHome={touchableRef}
            refreshing={refreshing}
          />
          <NewSongModule
            onPressTotalButton={handleOnPressNewSongTotalButton}
            onPressSongButton={handleOnSongPress}
            refreshing={refreshing}
          />
          <RecentKeepModule
            onPressRecentKeepSong={handleOnPressRecentKeepSong}
            refreshing={refreshing}
          />
          <RecentCommentSongModule
            onPressRecentCommentSong={handleOnPressRecentCommentSong}
            refreshing={refreshing}
          />

          {/* )} */}

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
