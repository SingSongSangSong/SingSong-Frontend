import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
  mainTabNavigations,
} from '../../constants';
import {MainTabParamList} from '../../types';
import PlaygroundScreen from '../../screens/playground/PlaygroundScreen';
import HomeStackNavigator from '../stack/HomeStackNavigator';
import HomeIcon from '../../assets/svg/recommendation.svg';
import HomeIconActive from '../../assets/svg/selectedHome.svg';
import PlaygroundIcon from '../../assets/svg/play.svg';
import PlaygroundIconActive from '../../assets/svg/selectedPlay.svg';
import StarIcon from '../../assets/svg/star.svg';
import StarIconActive from '../../assets/svg/selectedStar.svg';
import {SvgProps} from 'react-native-svg';
import KeepStackNavigator from '../stack/KeepStackNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const getTabBarIcon = (
  routeName: string,
  focused: boolean,
): React.FC<SvgProps> | undefined => {
  switch (routeName) {
    case mainTabNavigations.PLAYGROUND:
      return focused ? PlaygroundIconActive : PlaygroundIcon;
    case mainTabNavigations.HOME:
      return focused ? HomeIconActive : HomeIcon;
    case mainTabNavigations.KEEP:
      return focused ? StarIconActive : StarIcon;
    default:
      return undefined;
  }
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={mainTabNavigations.HOME}
      backBehavior="none"
      screenOptions={({route}) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

        const shouldHideTabBar = () => {
          if (
            routeName === keepStackNavigations.KEEP_COMMENT ||
            routeName === homeStackNavigations.COMMENT ||
            routeName === homeStackNavigations.RECOMMENT ||
            routeName === keepStackNavigations.KEEP_RECOMMENT ||
            routeName === homeStackNavigations.REPORT ||
            routeName === keepStackNavigations.KEEP_REPORT ||
            routeName === homeStackNavigations.SEARCH ||
            routeName === homeStackNavigations.RCD_DETAIL ||
            routeName === homeStackNavigations.SONG_DETAIL ||
            routeName === homeStackNavigations.SETTING ||
            routeName === homeStackNavigations.BLACKLIST ||
            routeName === keepStackNavigations.KEEP_SONG_DETAIL
          ) {
            return true;
          }
          return false;
        };

        return {
          tabBarIcon: ({color, size, focused}) => {
            const IconComponent = getTabBarIcon(route.name, focused);
            return IconComponent ? (
              <IconComponent width={size} height={size} fill={color} />
            ) : null;
          },
          headerShown: false,
          tabBarStyle: shouldHideTabBar()
            ? {height: 0, overflow: 'hidden'}
            : {
                height: 60,
                backgroundColor: 'black',
                paddingTop: 5,
                paddingBottom: 5,
              },
          tabBarActiveTintColor: designatedColor.PINK,
          tabBarInactiveTintColor: 'gray',
          // keyboardHidesTabBar: false,
        };
      }}>
      <Tab.Screen
        name={mainTabNavigations.HOME}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name={mainTabNavigations.KEEP}
        component={KeepStackNavigator}
      />
      <Tab.Screen
        name={mainTabNavigations.PLAYGROUND}
        component={PlaygroundScreen}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
