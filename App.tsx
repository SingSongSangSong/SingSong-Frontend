import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
// import MainTabNavigator from './src/navigations/tab/MainTabNavigator';
import AppStackNavigator from './src/navigations/stack/AppStackNavigator';
import {CustomToast} from './src/components';
import queryClient from './src/api/queryClient';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import playlistNavigations from './src/constants/playlistConstants';
// import GestureRecognizer from 'react-native-swipe-gestures';
import crashlytics from '@react-native-firebase/crashlytics';

function App(): React.JSX.Element {
  // const onSwipeRight = {navigation}: SplashScreenProps => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };

  crashlytics().log('App started');

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
