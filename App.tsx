import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
// import MainTabNavigator from './src/navigations/tab/MainTabNavigator';
import AppStackNavigator from './src/navigations/stack/AppStackNavigator';
import {CustomToast} from './src/components';
import queryClient from './src/api/queryClient';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/in-app-messaging';

function App(): React.JSX.Element {
  // const onSwipeRight = {navigation}: SplashScreenProps => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };

  useEffect(() => {
    // In-App Messaging 활성화
    crashlytics().log('App started');
    messaging().setMessagesDisplaySuppressed(false);
    messaging().setAutomaticDataCollectionEnabled(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppStackNavigator />
        <CustomToast />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
