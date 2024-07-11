// import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import mainNavigations from '../constants/MainConstants';
import SplashScreen from '../SplashScreen';
import HomeScreen from '../screens/home/HomeScreen';
import RcdStackNavigator from './RcdStackNavigator';
// import {RectButton, Swipeable} from 'react-native-gesture-handler';
// import tw from 'twrnc';
import PlaylistScreen from '../screens/playlist/PlaylistScreen';
import SonglistScreen from '../screens/playlist/SonglistScreen';
import playlistNavigations from '../constants/playlistConstants';

export type MainStackParamList = {
  [mainNavigations.SPLASH]: undefined;
  [mainNavigations.HOME]: undefined;
  [mainNavigations.RECOMMENDATION]: {tag: string};
  [playlistNavigations.PLAYLIST]: undefined;
  [playlistNavigations.SONGLIST]: {playlistId: string};
};

function MainStackNavigator() {
  const Stack = createStackNavigator<MainStackParamList>();
  // const renderRightActions = (progress, dragX) => {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name={playlistNavigations.PLAYLIST}
  //         component={PlaylistScreen}
  //       />
  //     </Stack.Navigator>
  //   );
  // };
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
        // options={{headerShown: false}}
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
        // options={{headerShown: false}}
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
        component={RcdStackNavigator}
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

    // <Swipeable renderRightActions={renderRightActions}>
    //   <Stack.Screen name={mainNavigations.HOME} component={HomeScreen} />
    //   {/* <RectButton style={tw`flex-1 bg-blue-800`} /> */}
    // </Swipeable>
  );
}

export default MainStackNavigator;
