import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {AppState, Platform} from 'react-native';
import TrackingStore from './src/store/TrackingStore';
import messaging from '@react-native-firebase/messaging';

function App(): React.JSX.Element {
  // const onSwipeRight = {navigation}: SplashScreenProps => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };
  const setTrackingStatus = TrackingStore().setTrackingStatus;

  async function onAppBootstrap() {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    console.log('Token:', token);
  }

  useEffect(() => {
    // In-App Messaging 활성화
    crashlytics().log('App started');
    // onAppBootstrap();
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
          <NavigationContainer>
            <AppStackNavigator />
            <CustomToast />
          </NavigationContainer>
        </QueryClientProvider>
        {/* </SafeAreaView> */}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
