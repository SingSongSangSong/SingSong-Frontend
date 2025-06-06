/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import 'react-native-reanimated';

// AppRegistry.registerComponent(appName, () => App);
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {initializeKakaoSDK} from '@react-native-kakao/core';
import Config from 'react-native-config';
import * as amplitude from '@amplitude/analytics-react-native';

initializeKakaoSDK(Config.KAKAO_API_KEY);
amplitude.init(Config.AMPLITUDE_KEY);

const RootApp = () => <App />;

AppRegistry.registerComponent(appName, () => RootApp);
