import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {appStackNavigations} from '../../constants';
import SplashScreen from '../../screens/\bsplash/SplashScreen';
import MainTabNavigator from '../tab/MainTabNavigator';
import {AppStackParamList} from '../../types';
import LoginScreen from '../../screens/auth/LoginScreen';

const Stack = createStackNavigator<AppStackParamList>();

function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid, // iOS 스타일의 슬라이드 애니메이션
      }}>
      <Stack.Screen
        name={appStackNavigations.SPLASH}
        component={SplashScreen}
      />
      <Stack.Screen
        name={appStackNavigations.MAIN}
        component={MainTabNavigator}
      />
      <Stack.Screen name={appStackNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;
