import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {keepStackNavigations} from '../../constants';
import {RouteProp} from '@react-navigation/native';
import {KeepStackParamList} from '../../types';
import PlaylistScreen from '../../screens/playlist/PlaylistScreen';
import SonglistScreen from '../../screens/playlist/SonglistScreen';

const Stack = createStackNavigator<KeepStackParamList>();

type KeepStackNavigatorProps = {
  route?: RouteProp<KeepStackParamList, typeof keepStackNavigations.PLAYLIST>; // route를 옵셔널로 변경
};

function KeepStackNavigator({route}: KeepStackNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={keepStackNavigations.PLAYLIST}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // iOS 스타일의 슬라이드 애니메이션
      }}>
      <Stack.Screen
        name={keepStackNavigations.PLAYLIST}
        component={PlaylistScreen}
        options={() => ({
          headerShown: true,
          headerTitle: 'KEEP', // 헤더 제목을 tag로 설정
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
        name={keepStackNavigations.SONGLIST}
        component={SonglistScreen}
        options={() => ({
          headerShown: true,
          headerTitle: '', // 헤더 제목을 tag로 설정
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

export default KeepStackNavigator;
