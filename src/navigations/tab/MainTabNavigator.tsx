import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mainTabNavigations} from '../../constants';
import {MainTabParamList} from '../../types';
import CommunityScreen from '../../screens/community/CommunityScreen';
import KeepScreen from '../../screens/keep/KeepScreen';
import HomeStackNavigator from '../stack/HomeStackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={mainTabNavigations.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={mainTabNavigations.COMMUNITY}
        component={CommunityScreen}
      />
      <Tab.Screen
        name={mainTabNavigations.HOME}
        component={HomeStackNavigator}
      />
      <Tab.Screen name={mainTabNavigations.KEEP} component={KeepScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
