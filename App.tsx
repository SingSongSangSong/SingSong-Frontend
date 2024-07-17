import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
// import MainStackNavigator from './src/navigations/stack/MainStackNavigator';
import Toast from 'react-native-toast-message';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
// import MainTabNavigator from './src/navigations/tab/MainTabNavigator';
import AppStackNavigator from './src/navigations/stack/AppStackNavigator';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import playlistNavigations from './src/constants/playlistConstants';
// import GestureRecognizer from 'react-native-swipe-gestures';

function App(): React.JSX.Element {
  // const onSwipeRight = {navigation}: SplashScreenProps => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {/* <MainTabNavigator /> */}
        <AppStackNavigator />
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
    //   <GestureHandlerRootView style={{flex: 1}}>
    //   <GestureRecognizer
    //     onSwipeRight={state => onSwipeRight(navigation)}
    //     config={{
    //       velocityThreshold: 0.3,
    //       directionalOffsetThreshold: 80,
    //     }}
    //     style={{
    //       flex: 1,
    //     }}>
    //     <NavigationContainer>
    //       <MainStackNavigator />
    //     </NavigationContainer>
    //   </GestureRecognizer>
    // </GestureHandlerRootView>
  );
}

export default App;
