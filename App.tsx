import {NavigationContainer} from '@react-navigation/native';
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
import {Alert, AppState, AppStateStatus, Platform} from 'react-native';
import TrackingStore from './src/store/TrackingStore';
import CodePush from 'react-native-code-push';
import {navigationRef} from './src/navigations/rootNavigation';
import TokenStore from './src/store/TokenStore';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  homeStackNavigations,
  playgroundStackNavigations,
} from './src/constants';

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
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
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
  function onMessageReceived(message) {
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

  const linking = {
    prefixes: ['singsongsangsong://app'], // 딥링크 URL 스킴 설정
    config: {
      screens: {
        [homeStackNavigations.RCD_HOME]: 'home',
        [homeStackNavigations.SONG_DETAIL]: 'song/:songId', // songId라는 파라미터를 받는 SongScreen 설정
        [playgroundStackNavigations.PLAYGROUND]: 'playground',
        [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]:
          'playground/:playgroundId',
      },
    },
  };

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
    // In-App Messaging 활성화
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    crashlytics().log('App started');
    onAppBootstrap();
    // messaging().setMessagesDisplaySuppressed(false);
    // messaging().setAutomaticDataCollectionEnabled(true);
  }, []);

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
        {/* <SafeAreaView style={{flex: 1}}> */}
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef}>
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
  // checkFrequency: CodePush.InstallMode.ON_NEXT_RESTART,
  // // updateDialog: {
  // //   title: '...',
  // //   optionalUpdateMessage: '...',
  // //   optionalInstallButtonLabel: '업데이트',
  // //   optionalIgnoreButtonLabel: '아니요.',
  // // },
  // // installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  // installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_START, // 앱 시작 시 한 번만 확인
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
};

export default CodePush(codePushOptions)(App);
// export default App;
