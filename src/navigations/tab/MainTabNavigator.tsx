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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform, TouchableOpacity} from 'react-native';

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
  const insets = useSafeAreaInsets();

  const isIOS = Platform.OS === 'ios'; // 플랫폼이 iOS인지 확인

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
            routeName === keepStackNavigations.KEEP_SONG_DETAIL ||
            routeName === homeStackNavigations.TAG_DETAIL ||
            routeName === homeStackNavigations.AI_RECOMMENDATION ||
            routeName === homeStackNavigations.NICKNAME_CHANGE ||
            routeName === homeStackNavigations.AI_LLM ||
            routeName === homeStackNavigations.AI_LLM_RESULT
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
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
            ...(shouldHideTabBar()
              ? isIOS
                ? // display: 'none' opacity: 0, height: 0
                  {display: 'none'} // iOS일 때 탭바 숨기기
                : {height: 0, overflow: 'hidden'} // Android일 때 탭바 숨기기
              : isIOS // iOS일 때 탭바 스타일
              ? {
                  height: insets.bottom + 60,
                  paddingBottom: insets.bottom,
                  // 경계선 제거
                  borderTopWidth: 0,
                }
              : // Android일 때 탭바 스타일
                {
                  height: 60,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderTopWidth: 0,
                }),
          },
          // tabBarButton: props =>
          //   shouldHideTabBar() && isIOS ? null : ( // iOS일 때 숨길 때 버튼을 null로 처리
          //     <TouchableOpacity {...props} />
          //   ), // 버튼을 기본 Touchable로 사용
          tabBarActiveTintColor: designatedColor.PINK,
          tabBarInactiveTintColor: 'gray',
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
      {/* {Platform.OS != 'ios' && (
        <Tab.Screen
          name={mainTabNavigations.PLAYGROUND}
          component={PlaygroundScreen}
        />
      )} */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
