import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
// import MainTabNavigator from './src/navigations/tab/MainTabNavigator';
import AppStackNavigator from './src/navigations/stack/AppStackNavigator';
import {CustomToast} from './src/components';
import queryClient from './src/api/queryClient';
import crashlytics from '@react-native-firebase/crashlytics';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'react-native-reanimated'; // 꼭 추가하세요.
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {request, PERMISSIONS} from 'react-native-permissions';
import {AppState, AppStateStatus, Linking, Platform} from 'react-native';
import TrackingStore from './src/store/TrackingStore';
import CodePush from 'react-native-code-push';
import {navigationRef} from './src/navigations/rootNavigation';
import TokenStore from './src/store/TokenStore';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  deepLinkNavigations,
  homeStackNavigations,
  playgroundStackNavigations,
} from './src/constants';
import {
  AppStackParamList,
  HomeStackParamList,
  PlaygroundStackParamList,
} from './src/types';

function App(): React.JSX.Element {
  PushNotification.createChannel(
    {
      channelId: 'rn-push-notification-channel-id-4-300', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    // created => console.log(`createChannel returned '${created}'`),
  );

  // const onSwipeRight = {navigation}: SplashScreenProps => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };

  // function onMessageReceived(message) {
  //   notifee.displayNotification(JSON.parse(message.notification));
  // }

  // // messaging().onMessage(onMessageReceived);
  // messaging().setBackgroundMessageHandler(onMessageReceived);

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);

  //   // 알림 표시
  //   // notifee.displayNotification({
  //   //   title: remoteMessage.notification?.title || 'Default Title',
  //   //   body: remoteMessage.notification?.body || 'Default Body',
  //   //   android: {
  //   //     channelId: 'default-channel-id', // 알림 채널 ID 설정
  //   //     importance: AndroidImportance.HIGH,
  //   //     smallIcon: 'ic_notification', // 아이콘 설정 필요
  //   //   },
  //   // });
  // });

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);
  // });
  const setTrackingStatus = TrackingStore().setTrackingStatus;
  const {getAccessToken} = TokenStore();
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  function onMessageReceived(message: any) {
    // 알림 채널을 통해 로컬 알림으로 표시
    PushNotification.localNotification({
      channelId: 'rn-push-notification-channel-id-4-300', // 생성한 채널 ID
      title: message.notification?.title, // 메시지의 제목
      message: message.notification?.body, // 메시지의 내용
      playSound: true, // 사운드 재생 여부
      soundName: 'default', // 사운드 이름
      importance: 'high', // 중요도
    });
  }

  const linking: LinkingOptions<
    AppStackParamList | HomeStackParamList | PlaygroundStackParamList
  > = {
    prefixes: ['singsongsangsong://app'], // 딥링크 URL 스킴 설정
    config: {
      screens: {
        [homeStackNavigations.RCD_HOME]: 'home',
        [homeStackNavigations.SONG_DETAIL]:
          'song/:songId/:songNumber/:songName/:singerName/:album/:melonLink/:isMr/:isLive', // songId라는 파라미터를 받는 SongScreen 설정
        [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]:
          'playground/:postId/:title/:content/:createdAt/:nickname/:likes/:commentCount', // postId라는 파라미터를 받는 PlaygroundPostScreen 설정
      },
    },
  };

  useEffect(() => {
    const handleDeepLink = (url: string) => {
      const route = url.replace(/.*?:\/\//g, '');
      const [screen, params] = route.split('/');

      // 딥링크가 `song` 경로라면 Home을 스택에 추가 후 SongScreen으로 이동
      if (screen === deepLinkNavigations.SONG) {
        const songParams = {
          songId: params[0],
          songNumber: params[1],
          songName: params[2],
          singerName: params[3],
          album: params[4],
          melonLink: params[5],
          isMr: params[6] === 'true',
          isLive: params[7] === 'true',
        };

        navigationRef.reset({
          index: 1,
          routes: [
            {name: homeStackNavigations.RCD_HOME}, // Home 화면을 스택에 추가
            {name: homeStackNavigations.SONG_DETAIL, params: songParams},
          ],
        });
      }

      // 딥링크가 `playground` 경로라면 Playground를 스택에 추가 후 PlaygroundPostDetail로 이동
      else if (screen === deepLinkNavigations.PLAYGROUND) {
        const playgroundParams = {
          postId: params[0],
          title: params[1],
          content: params[2],
          createdAt: params[3],
          nickname: params[4],
          likes: parseInt(params[5]),
          commentCount: parseInt(params[6]),
        };

        navigationRef.reset({
          index: 1,
          routes: [
            {name: playgroundStackNavigations.PLAYGROUND}, // Playground 화면을 스택에 추가
            {
              name: playgroundStackNavigations.PLAYGROUND_POST_DETAIL,
              params: playgroundParams,
            },
          ],
        });
      }
    };

    // 앱 시작 시 초기 URL을 처리
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // 앱이 실행 중일 때 딥링크 이벤트를 수신하여 처리
    const subscription = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, [navigationRef]);

  // 포그라운드에서 메시지를 수신할 때
  messaging().onMessage(onMessageReceived);

  // 백그라운드와 종료 상태에서 메시지를 수신할 때
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    onMessageReceived(remoteMessage);
  });

  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log('Token:', token);
  }

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    crashlytics().log('App started');
    onAppBootstrap();
    // messaging().setMessagesDisplaySuppressed(false);
    // messaging().setAutomaticDataCollectionEnabled(true);
  }, []);

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const timeoutRef = useRef<number | null>(null);
  const TIMEOUT_DURATION = 2 * 60 * 1000;

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef} linking={linking}>
            <AppStackNavigator />
            <CustomToast />
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START, // 앱 시작 시 한 번만 확인
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
};

export default CodePush(codePushOptions)(App);

// useEffect(() => {
//   const tempStatus = setInitTracking();
//   console.log('tempStatus:', tempStatus);
//   const listener = AppState.addEventListener('change', status => {
//     if (!tempStatus && Platform.OS === 'ios' && status === 'active') {
//       request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
//         .then(result => setTrackingStatus(result))
//         .catch(error => console.warn(error));
//     }
//   });

//   return () => {
//     listener.remove();
//   };
// }, []);
// const setInitTracking = async () => {
//   const trackingStatus = await TrackingStore().getTrackingStatus();
//   return trackingStatus;
// };
