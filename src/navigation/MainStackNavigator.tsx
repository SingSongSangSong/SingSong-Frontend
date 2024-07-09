// import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import mainNavigations from '../constants/MainConstants';
import SplashScreen from '../SplashScreen';
import HomeScreen from '../screens/home/HomeScreen';
import RcdStackNavigator from './RcdStackNavigator';

export type MainStackParamList = {
  [mainNavigations.SPLASH]: undefined;
  [mainNavigations.HOME]: undefined;
  [mainNavigations.RECOMMENDATION]: {tag: string};
};

function MainStackNavigator() {
  const Stack = createStackNavigator<MainStackParamList>();

  return (
    <Stack.Navigator
    //   screenOptions={{
    //     headerShown: false,
    //   }}
    >
      <Stack.Screen
        name={mainNavigations.SPLASH}
        component={SplashScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
      <Stack.Screen
        name={mainNavigations.RECOMMENDATION}
        component={RcdStackNavigator}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
