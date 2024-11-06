import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
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
import {AppState, AppStateStatus, Linking, Platform} from 'react-native';
import TrackingStore from './src/store/TrackingStore';
import {navigationRef} from './src/navigations/rootNavigation';
import TokenStore from './src/store/TokenStore';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  appStackNavigations,
  deepLinkNavigations,
  homeStackNavigations,
  mainTabNavigations,
  playgroundStackNavigations,
} from './src/constants';
import {
  AppStackParamList,
  HomeStackParamList,
  PlaygroundStackParamList,
} from './src/types';

function App(): React.JSX.Element {
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

  // 딥링크 설정
  // const linking: LinkingOptions<
  //   AppStackParamList | HomeStackParamList | PlaygroundStackParamList
  // > = {
  //   prefixes: ['singsongsangsong://'], // 딥링크 URL 스킴 설정
  //   config: {
  //     screens: {
  //       [homeStackNavigations.RCD_HOME]: 'home',
  //       [homeStackNavigations.SONG_DETAIL]:
  //         'song/:songId/:songName/:singerName/:album/:melonLink/:isMr/:isLive', // songNumber 삭제
  //       [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]:
  //         'playground/:postId/:title/:content/:createdAt/:nickname/:likes/:commentCount', // postId라는 파라미터를 받는 PlaygroundPostScreen 설정
  //     },
  //   },
  // };
  const linking = {
    prefixes: ['singsongsangsong://'], // 딥링크 URL 스킴 설정
    config: {
      screens: {
        [appStackNavigations.MAIN]: {
          screens: {
            [mainTabNavigations.HOME]: {
              screens: {
                [homeStackNavigations.SONG_DETAIL]: {
                  // 'song/:songId/:songName/:singerName/:album/:melonLink/:isMr/:isLive',
                  // path: 'song',
                  path: 'song',
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
          },
        },
        // [homeStackNavigations.RCD_HOME]: 'home',
        // [homeStackNavigations.SONG_DETAIL]: 'song/:songId',
      },
      // screens: {
      //   // MainTabNavigator
      //   [mainTabNavigations.HOME]: {
      //     path: 'home',
      //     screens: {
      //       // HomeStackNavigator 안의 화면들 정의
      //       [homeStackNavigations.RCD_HOME]: '',
      //       [homeStackNavigations.SONG_DETAIL]: {
      //         path: 'song/:songId/:songName/:singerName/:album/:melonLink/:isMr/:isLive',
      //       },
      //     },
      //   },
      //   [mainTabNavigations.PLAYGROUND]: {
      //     path: 'playground',
      //     screens: {
      //       [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]: {
      //         path: 'playground/:postId/:title/:content/:createdAt/:nickname/:likes/:commentCount',
      //       },
      //     },
      //   },
      // },
    },
  };

  // const linking = {
  //   prefixes: ['singsongsangsong://'],
  //   config: {
  //     screens: {
  //       // 최상위 네비게이터 (AppStackNavigator) 레벨
  //       [appStackNavigations.MAIN]: {
  //         path: 'main',
  //         screens: {
  //           // MainTabNavigator 안의 각 탭 정의
  //           [mainTabNavigations.HOME]: {
  //             path: 'home',
  //             screens: {
  //               // HomeStackNavigator 안의 화면 정의
  //               [homeStackNavigations.RCD_HOME]: '', // 기본 화면
  //               [homeStackNavigations.SONG_DETAIL]:
  //                 // 'song/:songId/:songName/:singerName/:album/:melonLink/:isMr/:isLive',
  //                 '/song/:songId',
  //             },
  //           },
  //           // [mainTabNavigations.SEARCH]: {
  //           //   path: 'search',
  //           //   screens: {
  //           //     [searchStackNavigations.SEARCH_SONG_DETAIL]: 'searchSong/:songId',
  //           //   },
  //           // },
  //           // [mainTabNavigations.KEEP]: {
  //           //   path: 'keep',
  //           //   screens: {
  //           //     [keepStackNavigations.KEEP_SONG_DETAIL]: 'keepSong/:songId',
  //           //   },
  //           // },
  //           // [mainTabNavigations.PLAYGROUND]: {
  //           //   path: 'playground',
  //           //   screens: {
  //           //     [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]:
  //           //       'playground/:postId',
  //           //   },
  //           // },
  //         },
  //       },
  //       // [appStackNavigations.LOGIN]: 'login',
  //       // [appStackNavigations.TERMS]: 'terms',
  //     },
  //   },
  // };

  // const handleDeepLink = (url: string) => {
  //   console.log('handle deep link');

  //   // URL에서 "singsongsangsong://app/" 부분을 제거
  //   const route = url.replace(/^singsongsangsong:\/\/app\//, '');

  //   // 첫 번째 부분은 screen, 그 외의 부분은 params로 파싱
  //   const [screen, ...params] = route.split('/');

  //   // 딥링크가 `song` 경로라면 Home을 스택에 추가 후 SongScreen으로 이동
  //   if (screen === deepLinkNavigations.SONG) {
  //     const songParams = {
  //       songId: params[0],
  //       songName: params[1],
  //       singerName: params[2],
  //       album: params[3],
  //       melonLink: params[4],
  //       isMr: params[5] === 'true',
  //       isLive: params[6] === 'true',
  //     };

  //     navigationRef.reset({
  //       index: 1,
  //       routes: [
  //         {name: homeStackNavigations.RCD_HOME}, // Home 화면을 스택에 추가
  //         {name: homeStackNavigations.SONG_DETAIL, params: songParams},
  //       ],
  //     });
  //   }

  //   // 딥링크가 `playground` 경로라면 Playground를 스택에 추가 후 PlaygroundPostDetail로 이동
  //   else if (screen === deepLinkNavigations.PLAYGROUND) {
  //     const playgroundParams = {
  //       postId: params[0],
  //       title: params[1],
  //       content: params[2],
  //       createdAt: params[3],
  //       nickname: params[4],
  //       likes: parseInt(params[5]),
  //       commentCount: parseInt(params[6]),
  //     };

  //     navigationRef.reset({
  //       index: 1,
  //       routes: [
  //         {name: playgroundStackNavigations.PLAYGROUND}, // Playground 화면을 스택에 추가
  //         {
  //           name: playgroundStackNavigations.PLAYGROUND_POST_DETAIL,
  //           params: playgroundParams,
  //         },
  //       ],
  //     });
  //   } else if (screen === deepLinkNavigations.HOME) {
  //     console.log('home!!!');
  //     navigationRef.reset({
  //       index: 0,
  //       routes: [
  //         {name: homeStackNavigations.RCD_HOME}, // Home 화면을 스택에 추가
  //       ],
  //     });
  //   }
  // };

  const setTrackingStatus = TrackingStore().setTrackingStatus;
  const {getAccessToken} = TokenStore();

  //알람 수신시 처리하는 함수
  function onMessageReceived(message: any) {
    // const deepLink = message.data?.deepLink; // deepLink 추출

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
            Linking.openURL(deepLink);
            // handleDeepLink(deepLink);
          } else {
            console.warn('Invalid deep link:', deepLink);
          }
        }
      });

    // 백그라운드에서 알림을 클릭했을 때의 딥링크 처리
    messaging().onNotificationOpenedApp(remoteMessage => {
      const deepLink = remoteMessage?.data?.deepLink;
      console.log('deepLink:', deepLink);
      if (typeof deepLink === 'string') {
        console.log('deepLink22:', deepLink);
        Linking.openURL(deepLink);
        // handleDeepLink(deepLink);
      } else {
        console.warn('Invalid deep link:', deepLink);
      }
    });
  }, []);

  // useEffect(() => {
  //   // 앱 시작 시 초기 URL을 처리
  //   Linking.getInitialURL().then(url => {
  //     console.log('getInitUrl:', url);
  //     if (url) {
  //       console.log('url:', url);
  //       handleDeepLink(url);
  //     }
  //   });

  //   // 앱이 실행 중일 때 딥링크 이벤트를 수신하여 처리
  //   const subscription = Linking.addEventListener('url', ({url}) => {
  //     console.log('url2:', url);
  //     handleDeepLink(url);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [navigationRef]);

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

export default App;

// import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
// import React, {useEffect, useRef} from 'react';
// import {QueryClientProvider} from '@tanstack/react-query';
// // import MainTabNavigator from './src/navigations/tab/MainTabNavigator';
// import AppStackNavigator from './src/navigations/stack/AppStackNavigator';
// import {CustomToast} from './src/components';
// import queryClient from './src/api/queryClient';
// import crashlytics from '@react-native-firebase/crashlytics';
// import {SafeAreaProvider} from 'react-native-safe-area-context';
// import 'react-native-reanimated'; // 꼭 추가하세요.
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {request, PERMISSIONS} from 'react-native-permissions';
// import {AppState, AppStateStatus, Linking, Platform} from 'react-native';
// import TrackingStore from './src/store/TrackingStore';
// import CodePush from 'react-native-code-push';
// import {navigationRef} from './src/navigations/rootNavigation';
// import TokenStore from './src/store/TokenStore';
// import messaging from '@react-native-firebase/messaging';
// import {PermissionsAndroid} from 'react-native';
// import PushNotification, {Importance} from 'react-native-push-notification';
// import {
//   deepLinkNavigations,
//   homeStackNavigations,
//   playgroundStackNavigations,
// } from './src/constants';
// import {
//   AppStackParamList,
//   HomeStackParamList,
//   PlaygroundStackParamList,
// } from './src/types';

// function App(): React.JSX.Element {
//   // 채널 만들기
//   PushNotification.createChannel(
//     {
//       channelId: 'rn-push-notification-channel-id-4-300', // (required)
//       channelName: 'My channel', // (required)
//       channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//       playSound: false, // (optional) default: true
//       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     // created => console.log(`createChannel returned '${created}'`),
//   );

//   // 딥링크 설정
//   const linking: LinkingOptions<
//     AppStackParamList | HomeStackParamList | PlaygroundStackParamList
//   > = {
//     prefixes: ['singsongsangsong://app'], // 딥링크 URL 스킴 설정
//     config: {
//       screens: {
//         [homeStackNavigations.RCD_HOME]: 'home',
//         [homeStackNavigations.SONG_DETAIL]:
//           'song/:songId/:songName/:singerName/:album/:melonLink/:isMr/:isLive', // songNumber 삭제
//         [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]:
//           'playground/:postId/:title/:content/:createdAt/:nickname/:likes/:commentCount', // postId라는 파라미터를 받는 PlaygroundPostScreen 설정
//       },
//     },
//   };

//   const setTrackingStatus = TrackingStore().setTrackingStatus;
//   const {getAccessToken} = TokenStore();
//   // useEffect(() => {
//   //   const unsubscribe = messaging().onMessage(async remoteMessage => {
//   //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   //   });

//   //   return unsubscribe;
//   // }, []);

//   //알람 수신시 처리하는 함수
//   function onMessageReceived(message: any) {
//     // const deepLink = message.data?.deepLink; // deepLink 추출

//     // 알림 채널을 통해 로컬 알림으로 표시
//     PushNotification.localNotification({
//       channelId: 'rn-push-notification-channel-id-4-300', // 생성한 채널 ID
//       title: message.notification?.title, // 메시지의 제목
//       message: message.notification?.body, // 메시지의 내용
//       playSound: true, // 사운드 재생 여부
//       soundName: 'default', // 사운드 이름
//       importance: 'high', // 중요도
//     });

//     // if (deepLink) {
//     //   Linking.openURL(deepLink);
//     // }
//   }

//   useEffect(() => {
//     // 포그라운드에서 메시지 수신 시
//     messaging().onMessage(onMessageReceived);

//     // 앱이 종료된 상태에서 알림을 클릭했을 때의 초기 URL 처리
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           const deepLink = remoteMessage.data?.deepLink;
//           if (typeof deepLink === 'string') {
//             Linking.openURL(deepLink);
//           } else {
//             console.warn('Invalid deep link:', deepLink);
//           }
//           // if (deepLink) {

//           //   Linking.openURL(deepLink);
//           // }
//         }
//       });

//     // 백그라운드에서 알림을 클릭했을 때의 딥링크 처리
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       const deepLink = remoteMessage?.data?.deepLink;
//       if (typeof deepLink === 'string') {
//         Linking.openURL(deepLink);
//       } else {
//         console.warn('Invalid deep link:', deepLink);
//       }
//       // if (deepLink) {
//       //   Linking.openURL(deepLink);
//       // }
//     });
//   }, []);

//   useEffect(() => {
//     const handleDeepLink = (url: string) => {
//       const route = url.replace(/.*?:\/\//g, '');
//       const [screen, params] = route.split('/');

//       // 딥링크가 `song` 경로라면 Home을 스택에 추가 후 SongScreen으로 이동
//       if (screen === deepLinkNavigations.SONG) {
//         const songParams = {
//           songId: params[0],
//           songName: params[1],
//           singerName: params[2],
//           album: params[3],
//           melonLink: params[4],
//           isMr: params[5] === 'true',
//           isLive: params[6] === 'true',
//         };

//         navigationRef.reset({
//           index: 1,
//           routes: [
//             {name: homeStackNavigations.RCD_HOME}, // Home 화면을 스택에 추가
//             {name: homeStackNavigations.SONG_DETAIL, params: songParams},
//           ],
//         });
//       }

//       // 딥링크가 `playground` 경로라면 Playground를 스택에 추가 후 PlaygroundPostDetail로 이동
//       else if (screen === deepLinkNavigations.PLAYGROUND) {
//         const playgroundParams = {
//           postId: params[0],
//           title: params[1],
//           content: params[2],
//           createdAt: params[3],
//           nickname: params[4],
//           likes: parseInt(params[5]),
//           commentCount: parseInt(params[6]),
//         };

//         navigationRef.reset({
//           index: 1,
//           routes: [
//             {name: playgroundStackNavigations.PLAYGROUND}, // Playground 화면을 스택에 추가
//             {
//               name: playgroundStackNavigations.PLAYGROUND_POST_DETAIL,
//               params: playgroundParams,
//             },
//           ],
//         });
//       }
//     };

//     // 앱 시작 시 초기 URL을 처리
//     Linking.getInitialURL().then(url => {
//       if (url) {
//         handleDeepLink(url);
//       }
//     });

//     // 앱이 실행 중일 때 딥링크 이벤트를 수신하여 처리
//     const subscription = Linking.addEventListener('url', ({url}) => {
//       handleDeepLink(url);
//     });

//     return () => {
//       subscription.remove();
//     };
//   }, [navigationRef]);

//   // // 포그라운드에서 메시지를 수신할 때
//   // messaging().onMessage(onMessageReceived);

//   // // 백그라운드와 종료 상태에서 메시지를 수신할 때
//   // messaging().setBackgroundMessageHandler(async remoteMessage => {
//   //   onMessageReceived(remoteMessage);
//   // });

//   async function onAppBootstrap() {
//     // Register the device with FCM
//     await messaging().registerDeviceForRemoteMessages();

//     // Get the token
//     const token = await messaging().getToken();
//     console.log('Token:', token);
//   }

//   useEffect(() => {
//     PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//     );
//     crashlytics().log('App started');
//     onAppBootstrap();
//     // messaging().setMessagesDisplaySuppressed(false);
//     // messaging().setAutomaticDataCollectionEnabled(true);
//   }, []);

//   const appState = useRef<AppStateStatus>(AppState.currentState);
//   const timeoutRef = useRef<number | null>(null);
//   const TIMEOUT_DURATION = 2 * 60 * 1000;

//   useEffect(() => {
//     const subscription = AppState.addEventListener(
//       'change',
//       handleAppStateChange,
//     );
//     return () => {
//       subscription.remove();
//     };
//   }, []);

//   const handleAppStateChange = (nextAppState: AppStateStatus) => {
//     if (nextAppState === 'background') {
//       // 백그라운드로 전환될 때 시간 기록
//       timeoutRef.current = Date.now();
//     } else if (appState.current === 'background' && nextAppState === 'active') {
//       // 포그라운드로 돌아올 때 즉시 타임아웃 검사
//       const timeDiff = Date.now() - (timeoutRef.current ?? Date.now());
//       if (timeDiff > TIMEOUT_DURATION) {
//         // 타임아웃이 지난 경우 토큰 받기
//         getAccessToken();
//       }
//     }
//     appState.current = nextAppState;
//   };

//   useEffect(() => {
//     // AppState 이벤트 리스너 추가
//     const listener = AppState.addEventListener('change', status => {
//       if (Platform.OS === 'ios' && status === 'active') {
//         request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
//           .then(result => {
//             setTrackingStatus(result); // 추적 상태 업데이트 (TrackingStore로 저장)
//             // TrackingStore().setTrackingStatus(result); // 추적 상태 저장
//           })
//           .catch(error => console.warn(error));
//       }
//     });

//     // 리스너는 컴포넌트 언마운트 시 제거
//     return () => {
//       listener.remove(); // 리스너 제거
//     };
//   }, []);

//   // const setInitTracking = async () => {
//   //   const trackingStatus = await TrackingStore().getTrackingStatus();
//   //   return trackingStatus;
//   // };

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <SafeAreaProvider>
//         <QueryClientProvider client={queryClient}>
//           <NavigationContainer ref={navigationRef} linking={linking}>
//             <AppStackNavigator />
//             <CustomToast />
//           </NavigationContainer>
//         </QueryClientProvider>
//       </SafeAreaProvider>
//     </GestureHandlerRootView>
//   );
// }
// const codePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.ON_APP_START, // 앱 시작 시 한 번만 확인
//   installMode: CodePush.InstallMode.ON_NEXT_RESTART,
// };

// // export default CodePush(codePushOptions)(App);
// export default App;

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
