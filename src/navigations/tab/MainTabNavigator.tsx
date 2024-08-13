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
import HomeIconActive from '../../assets/svg/selectedHome.svg'; // 활성화된 상태의 아이콘
import PlaygroundIcon from '../../assets/svg/play.svg';
import PlaygroundIconActive from '../../assets/svg/selectedPlay.svg'; // 활성화된 상태의 아이콘
import StarIcon from '../../assets/svg/star.svg';
import StarIconActive from '../../assets/svg/selectedStar.svg'; // 활성화된 상태의 아이콘
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
          tabBarIcon: ({color, size, focused}) => {
            const IconComponent = getTabBarIcon(route.name, focused);
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
          tabBarActiveTintColor: designatedColor.PINK, // 활성화된 탭 아이템 색상을 핑크색으로 설정
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
