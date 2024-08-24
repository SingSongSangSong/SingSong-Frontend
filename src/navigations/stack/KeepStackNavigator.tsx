import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {keepStackNavigations} from '../../constants';
import {NavigationProp} from '@react-navigation/native';
import {KeepStackParamList} from '../../types';
import KeepScreen from '../../screens/keep/KeepScreen';
import KeepEditScreen from '../../screens/keep/KeepEditScreen';
import {IconButton, NavButton} from '../../components';
import SongScreen from '../../screens/song/SongScreen';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import CommentScreen from '../../screens/song/CommentScreen';
import RecommentScreen from '../../screens/song/RecommentScreen';
import DeleteIcon from '../../assets/svg/delete.svg';
import ReportScreen from '../../screens/song/ReportScreen';

const Stack = createStackNavigator<KeepStackParamList>();

type KeepStackNavigatorProps = {
  navigation: NavigationProp<KeepStackParamList>;
};

const handleOnPress = (navigation: any) => {
  navigation.push(keepStackNavigations.KEEP_EDIT);
};

function KeepStackNavigator({navigation}: KeepStackNavigatorProps) {
  return (
    <Stack.Navigator
      // initialRouteName={keepStackNavigations.KEEP}
      screenOptions={{
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            Icon={ArrowLeftIcon}
            size={28}
          />
        ),

        ...TransitionPresets.SlideFromRightIOS, // iOS 스타일의 슬라이드 애니메이션
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
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_SONG_DETAIL}
        component={SongScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_COMMENT}
        component={CommentScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          tabBarVisible: false,
          headerTitle: '댓글', // 헤더 제목을 비움
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={ArrowLeftIcon}
              size={28}
            />
          ),
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_RECOMMENT}
        component={RecommentScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          tabBarVisible: false,
          headerTitle: '답글', // 헤더 제목을 비움
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={DeleteIcon}
              size={24}
            />
          ),
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_REPORT}
        component={ReportScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          tabBarVisible: false,
          headerTitle: '신고', // 헤더 제목을 비움
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={DeleteIcon}
              size={24}
            />
          ),
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          ...TransitionPresets.SlideFromRightIOS,
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_EDIT}
        component={KeepEditScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: 'KEEP 편집', // 헤더 제목을 비움
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={ArrowLeftIcon}
              size={28}
            />
          ),
          headerRight: () => (
            <NavButton onPress={() => navigation.goBack()} title={'완료'} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default KeepStackNavigator;
