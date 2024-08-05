import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import HomeScreen from '../../screens/home/HomeScreen';
import RcdHomeScreen from '../../screens/recommendation/RcdHomeScreen';
import {NavigationProp} from '@react-navigation/native';
import SettingScreen from '../../screens/home/SettingScreen';
import SongScreen from '../../screens/song/SongScreen';

const Stack = createStackNavigator<HomeStackParamList>();

type HomeStackNavigatorProps = {
  // route?: RouteProp<HomeStackParamList>; // route를 옵셔널로 변경
  navigation: NavigationProp<HomeStackParamList>;
};

function HomeStackNavigator({navigation}: HomeStackNavigatorProps) {
  // const {tag} = route.params;
  // const tag = route?.params?.tag ?? 'defaultTag';

  return (
    <Stack.Navigator
      initialRouteName={homeStackNavigations.RCD_HOME}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // iOS 스타일의 슬라이드 애니메이션
      }}>
      <Stack.Screen
        name={homeStackNavigations.RCD_HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={homeStackNavigations.RCD_DETAIL}
        component={RcdHomeScreen}
        // initialParams={{tag}}
        options={() => ({
          headerShown: true,
          headerTitle: '', //route.params.tag, // 헤더 제목을 tag로 설정
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
        })}
      />
      <Stack.Screen
        name={homeStackNavigations.SONG_DETAIL}
        component={SongScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '', //route.params.tag, // 헤더 제목을 tag로 설정
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
        })}
      />

      <Stack.Screen
        name={homeStackNavigations.SETTING}
        component={SettingScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '설정', //route.params.tag, // 헤더 제목을 tag로 설정
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
        })}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
