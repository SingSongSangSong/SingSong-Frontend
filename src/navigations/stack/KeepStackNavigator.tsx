import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {keepStackNavigations} from '../../constants';
import {RouteProp} from '@react-navigation/native';
import {KeepStackParamList} from '../../types';
import PlaylistScreen from '../../screens/playlist/PlaylistScreen';
import SonglistScreen from '../../screens/playlist/SonglistScreen';
import SonglistEditScreen from '../../screens/playlist/SonglistEditScreen';
import {NavButton} from '../../components';

const Stack = createStackNavigator<KeepStackParamList>();

type KeepStackNavigatorProps = {
  route?: RouteProp<KeepStackParamList, typeof keepStackNavigations.PLAYLIST>;
};

const handleOnPress = (navigation: any, playlistId: string) => {
  navigation.navigate(keepStackNavigations.SONGLIST_EDIT, {playlistId});
};

function KeepStackNavigator({route}: KeepStackNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={keepStackNavigations.PLAYLIST}
      screenOptions={{
        animationEnabled: false, // 애니메이션을 비활성화하여 TabNavigator와 유사한 전환 효과를 만듭니다
      }}>
      <Stack.Screen
        name={keepStackNavigations.PLAYLIST}
        component={PlaylistScreen}
        options={{
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
        }}
      />
      <Stack.Screen
        name={keepStackNavigations.SONGLIST}
        component={SonglistScreen}
        options={({navigation, route}) => ({
          headerShown: true,
          headerTitle: '', // 헤더 제목을 비움
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          headerRight: () => (
            <NavButton
              onPress={() =>
                handleOnPress(navigation, route.params?.playlistId)
              }
              title={'편집'}
            />
          ), // EditButton 컴포넌트를 전달
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.SONGLIST_EDIT}
        component={SonglistEditScreen}
        options={{
          headerShown: true,
          headerTitle: '플레이리스트 편집', // 헤더 제목을 비움
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          headerRight: () => <NavButton onPress={() => {}} title={'완료'} />,
        }}
      />
    </Stack.Navigator>
  );
}

export default KeepStackNavigator;
