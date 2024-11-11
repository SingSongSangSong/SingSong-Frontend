import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import AppStackNavigator from './src/navigations/stack/AppStackNavigator';
import {CustomToast} from './src/components';
import queryClient from './src/api/queryClient';
import crashlytics from '@react-native-firebase/crashlytics';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-reanimated'; // 꼭 추가하세요.
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {request, PERMISSIONS} from 'react-native-permissions';
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Linking,
  Platform,
  SafeAreaView,
} from 'react-native';
import TrackingStore from './src/store/TrackingStore';
import CodePush from 'react-native-code-push';
import {navigationRef} from './src/navigations/rootNavigation';
import TokenStore from './src/store/TokenStore';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {
  appStackNavigations,
  deepLinkNavigations,
  homeStackNavigations,
  mainTabNavigations,
  playgroundStackNavigations,
} from './src/constants';
import tw from 'twrnc';
import useDeeplinkStore from './src/store/useDeeplinkStore';
import useSongStore from './src/store/useSongStore';

function App(): React.JSX.Element {
  const setDeeplink = useDeeplinkStore(state => state.setDeeplink);
  const setIsDeepLinkReceived = useDeeplinkStore(
    state => state.setIsDeepLinkReceived,
  );
  const deeplink = useDeeplinkStore(state => state.deeplink);
  const isDeepLinkReceived = useDeeplinkStore(
    state => state.isDeepLinkReceived,
  );
  const loadingVisible = useSongStore(state => state.loadingVisible);
  const setTrackingStatus = TrackingStore().setTrackingStatus;
  const {getAccessToken} = TokenStore();
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const timeoutRef = useRef<number | null>(null);
  const TIMEOUT_DURATION = 10 * 60 * 1000;

  useEffect(() => {
    messaging().registerDeviceForRemoteMessages();
    crashlytics().log('App started');
    // messaging().setMessagesDisplaySuppressed(false);
    // messaging().setAutomaticDataCollectionEnabled(true);
  }, []);

  //알림 수신 후 딥링크 처리
  useEffect(() => {
    if (!loadingVisible && deeplink && isDeepLinkReceived) {
      Linking.openURL(deeplink);
      setIsDeepLinkReceived(false);
    }
  }, [loadingVisible, deeplink, isDeepLinkReceived]);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  //알림 채널 생성
  PushNotification.createChannel({
    channelId: 'rn-push-notification-channel-id-4-300',
    channelName: 'My channel',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  });

  // 알림 로컬 클릭 시 딥링크 처리
  PushNotification.configure({
    onNotification: function (notification: any) {
      if (notification.userInteraction && notification?.data?.deepLink) {
        handleOpenDeepLink(notification.data.deepLink);
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData); //알람 삭제
    },
  });

  // 딥링크 이동
  const handleOpenDeepLink = async (deepLink: string) => {
    console.log('handleOpenDeepLink', deepLink);
    setDeeplink(deepLink);
    setIsDeepLinkReceived(true);
  };

  //딥링크 설정
  const linking = {
    prefixes: ['singsongsangsong://'],
    config: {
      screens: {
        [appStackNavigations.MAIN]: {
          screens: {
            [mainTabNavigations.HOME]: {
              path: deepLinkNavigations.HOME,
              initialRouteName: homeStackNavigations.RCD_HOME,
              screens: {
                [homeStackNavigations.RCD_HOME]: {
                  path: '',
                },
                [homeStackNavigations.SONG_DETAIL]: {
                  path: deepLinkNavigations.SONG,
                  parse: {
                    songId: (songId: string) => Number(songId),
                    songName: (songName: string) =>
                      decodeURIComponent(songName),
                    singerName: (singerName: string) =>
                      decodeURIComponent(singerName),
                    album: (album: string) => decodeURIComponent(album),
                    melonLink: (melonLink: string) =>
                      decodeURIComponent(melonLink),
                    isMr: (isMr: string) => isMr === 'true',
                    isLive: (isLive: string) => isLive === 'true',
                  },
                },
              },
            },
            [mainTabNavigations.PLAYGROUND]: {
              path: deepLinkNavigations.PLAYGROUND,
              initialRouteName: playgroundStackNavigations.PLAYGROUND,
              screens: {
                [playgroundStackNavigations.PLAYGROUND]: {
                  path: '',
                },
                [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]: {
                  path: deepLinkNavigations.POST,
                  parse: {
                    postId: (postId: string) => Number(postId),
                    title: (title: string) => decodeURIComponent(title),
                    content: (content: string) => decodeURIComponent(content),
                    createdAt: (createdAt: string) =>
                      decodeURIComponent(createdAt),
                    nickname: (nickname: string) =>
                      decodeURIComponent(nickname),
                    likes: (likes: string) => Number(likes),
                    commentCount: (commentCount: string) =>
                      Number(commentCount),
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  //foreground 시 알람 표시
  function onMessageReceived(message: any) {
    // 알림 채널을 통해 로컬 알림으로 표시
    PushNotification.localNotification({
      channelId: 'rn-push-notification-channel-id-4-300',
      title: message.notification?.title,
      message: message.notification?.body,
      data: {...message.data, userInteraction: false},
      playSound: true,
      soundName: 'default',
      importance: 'high',
      // autoCancel: true, // 클릭 시 알림을 자동으로 제거
    });
  }

  // 백그라운드에서 포그라운드로 돌아올 때 타임아웃 검사
  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'background') {
      // 백그라운드로 전환될 때 시간 기록
      timeoutRef.current = Date.now();
    } else if (appState.current === 'background' && nextAppState === 'active') {
      // 포그라운드로 돌아올 때 즉시 타임아웃 검사
      const timeDiff = Date.now() - (timeoutRef.current ?? Date.now());
      if (timeDiff > TIMEOUT_DURATION) {
        // 타임아웃이 지난 경우 토큰 받기
        getAccessToken();
      }
    }
    appState.current = nextAppState;
  };

  useEffect(() => {
    // AppState 이벤트 리스너 추가
    const listener = AppState.addEventListener('change', status => {
      if (Platform.OS === 'ios' && status === 'active') {
        request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
          .then(result => {
            setTrackingStatus(result); // 추적 상태 업데이트 (TrackingStore로 저장)
            // TrackingStore().setTrackingStatus(result); // 추적 상태 저장
            return messaging().requestPermission();
          })
          .then(authStatus => {
            const enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
              console.log('Authorization status:', authStatus);
            }
          })
          .catch(error => console.warn(error));
      }
    });

    // 리스너는 컴포넌트 언마운트 시 제거
    return () => {
      listener.remove(); // 리스너 제거
    };
  }, []);

  // const setInitTracking = async () => {
  //   const trackingStatus = await TrackingStore().getTrackingStatus();
  //   return trackingStatus;
  // };
  //알람 수신시 처리
  useEffect(() => {
    // 포그라운드에서 메시지 수신 시
    messaging().onMessage(onMessageReceived);

    // 앱이 종료된 상태에서 알림을 클릭했을 때의 초기 URL 처리
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const deepLink = remoteMessage.data?.deepLink;
          if (typeof deepLink === 'string') {
            handleOpenDeepLink(deepLink);
          } else {
            console.warn('Invalid deep link:', deepLink);
          }
        }
      });

    // 백그라운드에서 알림을 클릭했을 때의 딥링크 처리
    messaging().onNotificationOpenedApp(remoteMessage => {
      const deepLink = remoteMessage?.data?.deepLink;
      if (typeof deepLink === 'string') {
        handleOpenDeepLink(deepLink);
      } else {
        console.warn('Invalid deep link:', deepLink);
      }
    });
  }, []);

  //fallback component 정의
  const FallBackComponent = () => {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-black`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        {/* <SafeAreaView style={{flex: 1}}> */}
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallBackComponent />}>
            <AppStackNavigator />
            <CustomToast />
          </NavigationContainer>
        </QueryClientProvider>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START, // 앱 시작 시 한 번만 확인
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
