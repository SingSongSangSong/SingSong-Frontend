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
  // const [isNavigationReady, setIsNavigationReady] = useState<boolean>(false);
  // const deepLinkRef = useRef<string | null>(null); // 딥링크 URL 저장
  const setDeeplink = useDeeplinkStore(state => state.setDeeplink);
  const setIsDeepLinkReceived = useDeeplinkStore(
    state => state.setIsDeepLinkReceived,
  );
  const deeplink = useDeeplinkStore(state => state.deeplink);
  const isDeepLinkReceived = useDeeplinkStore(
    state => state.isDeepLinkReceived,
  );
  const loadingVisible = useSongStore(state => state.loadingVisible);

  async function onAppBootstrap() {
    await messaging().registerDeviceForRemoteMessages();
  }

  useEffect(() => {
    crashlytics().log('App started');
    onAppBootstrap();
  }, []);

  useEffect(() => {
    if (!loadingVisible && deeplink && isDeepLinkReceived) {
      console.log('deeplink:', deeplink);
      Linking.openURL(deeplink);
      setIsDeepLinkReceived(false);
    }
  }, [loadingVisible, deeplink, isDeepLinkReceived]);

  // 채널 만들기
  PushNotification.createChannel({
    channelId: 'rn-push-notification-channel-id-4-300', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  });

  const linking = {
    prefixes: ['singsongsangsong://'], // 딥링크 URL 스킴 설정
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

  const setTrackingStatus = TrackingStore().setTrackingStatus;
  const {getAccessToken} = TokenStore();

  PushNotification.configure({
    onNotification: function (notification: any) {
      if (notification.userInteraction && notification?.data?.deepLink) {
        handleOpenDeepLink(notification.data.deepLink);
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData); //알람 삭제
    },
  });

  //알람 수신시 처리하는 함수
  function onMessageReceived(message: any) {
    // 알림 채널을 통해 로컬 알림으로 표시
    PushNotification.localNotification({
      channelId: 'rn-push-notification-channel-id-4-300', // 생성한 채널 ID
      title: message.notification?.title, // 메시지의 제목
      message: message.notification?.body, // 메시지의 내용
      data: {...message.data, userInteraction: false},
      playSound: true, // 사운드 재생 여부
      soundName: 'default', // 사운드 이름
      importance: 'high', // 중요도
      // autoCancel: true, // 클릭 시 알림을 자동으로 제거
    });
  }

  const handleOpenDeepLink = async (deepLink: string) => {
    console.log('handleOpenDeepLink', deepLink);
    setDeeplink(deepLink);
    setIsDeepLinkReceived(true);
  };

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

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const timeoutRef = useRef<number | null>(null);
  const TIMEOUT_DURATION = 2 * 60 * 1000;

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
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    // AppState 이벤트 리스너 추가
    const listener = AppState.addEventListener('change', status => {
      if (Platform.OS === 'ios' && status === 'active') {
        request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
          .then(result => {
            setTrackingStatus(result); // 추적 상태 업데이트 (TrackingStore로 저장)
          })
          .catch(error => console.warn(error));
      }
    });

    // 리스너는 컴포넌트 언마운트 시 제거
    return () => {
      listener.remove(); // 리스너 제거
    };
  }, []);

  const FallBackComponent = () => {
    return (
      <SafeAreaView style={tw`flex-1`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            // onReady={() => setIsNavigationReady(true)}
            ref={navigationRef}
            linking={linking}
            fallback={<FallBackComponent />}>
            <AppStackNavigator />
            <CustomToast />
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
