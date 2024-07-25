import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {keepStackNavigations} from '../../constants';
import {RouteProp} from '@react-navigation/native';
import {KeepStackParamList} from '../../types';
import KeepScreen from '../../screens/keep/KeepScreen';
import KeepEditScreen from '../../screens/keep/KeepEditScreen';
import {NavButton} from '../../components';

const Stack = createStackNavigator<KeepStackParamList>();

type KeepStackNavigatorProps = {
  route?: RouteProp<KeepStackParamList, typeof keepStackNavigations.KEEP>;
};

const handleOnPress = (navigation: any) => {
  navigation.navigate(keepStackNavigations.KEEP_EDIT);
};

function KeepStackNavigator({navigation, route}: KeepStackNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={keepStackNavigations.KEEP}
      screenOptions={{
        animationEnabled: false, // 애니메이션을 비활성화하여 TabNavigator와 유사한 전환 효과를 만듭니다
      }}>
      <Stack.Screen
        name={keepStackNavigations.KEEP}
        component={KeepScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: 'KEEP', // 헤더 제목을 비움
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
              onPress={() => handleOnPress(navigation)}
              title={'편집'}
            />
          ), // EditButton 컴포넌트를 전달
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_EDIT}
        component={KeepEditScreen}
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
          headerRight: () => (
            <NavButton
              onPress={() => navigation.navigate(keepStackNavigations.KEEP)}
              title={'완료'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default KeepStackNavigator;
