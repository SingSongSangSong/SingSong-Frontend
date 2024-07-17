import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {appStackNavigations} from '../../constants';
import SplashScreen from '../../screens/\bsplash/SplashScreen';
import MainTabNavigator from '../tab/MainTabNavigator';
import {AppStackParamList} from '../../types';

const Stack = createStackNavigator<AppStackParamList>();

function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={appStackNavigations.SPLASH}
        component={SplashScreen}
      />
      <Stack.Screen
        name={appStackNavigations.MAIN}
        component={MainTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;
