import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../screens/splash/SplashScreen';
import HomeScreen from '../../screens/home/HomeScreen';
import PlaylistScreen from '../../screens/playlist/PlaylistScreen';
import SonglistScreen from '../../screens/playlist/SonglistScreen';
import {mainNavigations} from '../../constants';
import {playlistNavigations} from '../../constants';
import {MainStackParamList} from '../../types';
import RcdTabNavigator from '../tab/RcdTabNavigator';

function MainStackNavigator() {
  const Stack = createStackNavigator<MainStackParamList>();
  return (
    <Stack.Navigator initialRouteName={mainNavigations.SPLASH}>
      <Stack.Screen
        name={mainNavigations.SPLASH}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={mainNavigations.HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={playlistNavigations.PLAYLIST}
        component={PlaylistScreen}
        options={{
          headerTitle: '플레이리스트', // 한글 제목 설정
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색 설정
          },
          headerTitleAlign: 'center', // 제목을 중앙 정렬
          headerTintColor: 'white', // 제목 텍스트 색상 설정
          headerTitleStyle: {
            fontSize: 16, // 글씨 크기 설정
          },
        }}
      />

      <Stack.Screen
        name={playlistNavigations.SONGLIST}
        component={SonglistScreen}
        options={{
          headerTitle: '곡 리스트', // 한글 제목 설정
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색 설정
          },
          headerTitleAlign: 'center', // 제목을 중앙 정렬
          headerTintColor: 'white', // 제목 텍스트 색상 설정
          headerTitleStyle: {
            fontSize: 16, // 글씨 크기 설정
          },
        }}
      />
      <Stack.Screen
        name={mainNavigations.RECOMMENDATION}
        component={RcdTabNavigator}
        options={{
          headerTitle: '추천', // 한글 제목 설정
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색 설정
          },
          headerTitleAlign: 'center', // 제목을 중앙 정렬
          headerTintColor: 'white', // 제목 텍스트 색상 설정
          headerTitleStyle: {
            fontSize: 16, // 글씨 크기 설정
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
