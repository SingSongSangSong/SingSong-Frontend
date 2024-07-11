import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import Toast from 'react-native-toast-message';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import playlistNavigations from './src/constants/playlistConstants';
// import GestureRecognizer from 'react-native-swipe-gestures';

function App(): React.JSX.Element {
  // const onSwipeRight = {navigation}: SplashScreenProps => {
  //   navigation.navigate(playlistNavigations.PLAYLIST);
  // };
  return (
    <NavigationContainer>
      <MainStackNavigator />
      <Toast />
    </NavigationContainer>
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
