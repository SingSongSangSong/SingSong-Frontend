/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import 'react-native-gesture-handler';
// import 'react-native-reanimated';

// AppRegistry.registerComponent(appName, () => App);
// import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import './gesture-handler';
import {initializeKakaoSDK} from '@react-native-kakao/core';
import Config from 'react-native-config';

initializeKakaoSDK(Config.KAKAO_API_KEY);

const RootApp = () => (
  // <GestureHandlerRootView style={{flex: 1}}>
  <App />
  // </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootApp);
