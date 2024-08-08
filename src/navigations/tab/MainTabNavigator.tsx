import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  homeStackNavigations,
  keepStackNavigations,
  mainTabNavigations,
} from '../../constants';
import {MainTabParamList} from '../../types';
import PlaygroundScreen from '../../screens/playground/PlaygroundScreen';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import HomeIcon from '../../assets/svg/recommendation.svg';
import PlaygroundIcon from '../../assets/svg/play.svg';
import StarIcon from '../../assets/svg/star.svg';
import {SvgProps} from 'react-native-svg';
import KeepStackNavigator from '../stack/KeepStackNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

        const shouldHideTabBar = () => {
          if (
            routeName === keepStackNavigations.KEEP_COMMENT ||
            routeName === homeStackNavigations.COMMENT ||
            routeName === homeStackNavigations.RECOMMENT ||
            routeName === keepStackNavigations.KEEP_RECOMMENT ||
            routeName === homeStackNavigations.REPORT ||
            routeName === keepStackNavigations.KEEP_REPORT
          ) {
            return true;
          }
          return false;
        };

        return {
          tabBarIcon: ({color, size}) => {
            const IconComponent = getTabBarIcon(route.name);
            return IconComponent ? (
              <IconComponent width={size} height={size} fill={color} />
            ) : null;
          },
          headerShown: false,
          tabBarStyle: shouldHideTabBar()
            ? {display: 'none'}
            : {
                height: 60,
                backgroundColor: 'black',
                paddingTop: 5,
                paddingBottom: 5,
              },
          tabBarActiveTintColor: 'white', // 활성화된 탭 아이템 색상을 흰색으로 설정
          tabBarInactiveTintColor: 'gray', // 비활성화된 탭 아이템 색상을 회색으로 설정
          keyboardHidesTabBar: false,
        };
      }}>
      <Tab.Screen
        name={mainTabNavigations.PLAYGROUND}
        component={PlaygroundScreen}
      />
      <Tab.Screen
        name={mainTabNavigations.HOME}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name={mainTabNavigations.KEEP}
        component={KeepStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
