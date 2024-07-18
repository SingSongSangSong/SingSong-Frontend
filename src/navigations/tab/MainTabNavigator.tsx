import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {mainTabNavigations} from '../../constants';
import {MainTabParamList} from '../../types';
import PlaygroundScreen from '../../screens/playground/PlaygroundScreen';
import KeepScreen from '../../screens/keep/KeepScreen';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import HomeIcon from '../../assets/svg/recommendation.svg';
import PlaygroundIcon from '../../assets/svg/play.svg';
import StarIcon from '../../assets/svg/star.svg';
import {SvgProps} from 'react-native-svg';

const Tab = createBottomTabNavigator<MainTabParamList>();

const getTabBarIcon = (routeName: string): React.FC<SvgProps> | undefined => {
  switch (routeName) {
    case mainTabNavigations.PLAYGROUND:
      return PlaygroundIcon;
    case mainTabNavigations.HOME:
      return HomeIcon;
    case mainTabNavigations.KEEP:
      return StarIcon;
    default:
      return undefined;
  }
};
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={mainTabNavigations.HOME}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const IconComponent = getTabBarIcon(route.name);
          return IconComponent ? (
            <IconComponent width={size} height={size} fill={color} />
          ) : null;
        },
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: 'black', // 탭 배경색을 검정색으로 설정
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: 'white', // 활성화된 탭 아이템 색상을 흰색으로 설정
        tabBarInactiveTintColor: 'gray', // 비활성화된 탭 아이템 색상을 회색으로 설정
      })}>
      <Tab.Screen
        name={mainTabNavigations.PLAYGROUND}
        component={PlaygroundScreen}
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
