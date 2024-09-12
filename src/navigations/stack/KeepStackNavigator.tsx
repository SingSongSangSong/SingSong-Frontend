import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {designatedColor, keepStackNavigations} from '../../constants';
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
import {Platform} from 'react-native';

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
      screenOptions={{
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            Icon={ArrowLeftIcon}
            size={28}
          />
        ),
        headerStyle: {
          backgroundColor: designatedColor.BACKGROUND_BLACK, // 공통 헤더 배경색
          borderBottomWidth: 0, // 모든 플랫폼에서 경계선 제거
        },
        headerTintColor: 'white', // 공통 헤더 텍스트 색상
        headerTitleAlign: 'center', // 공통 헤더 제목 가운데 정렬
        headerTitleStyle: {
          fontSize: 18, // 공통 헤더 제목 글씨 크기
        },

        gestureEnabled: true,
        ...(Platform.OS === 'ios'
          ? {...TransitionPresets.SlideFromRightIOS} // iOS 전환 설정 (이미 gestureDirection 포함)
          : {
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: 'horizontal', // Android에서만 적용
            }),
      }}>
      <Stack.Screen
        name={keepStackNavigations.KEEP}
        component={KeepScreen}
        options={({navigation}) => ({
          headerTitle: 'KEEP', // 헤더 제목을 비움
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
        options={({navigation}) => ({
          headerTitle: '', //route.params.tag, // 헤더 제목을 tag로 설정
          headerLeft: () => (
            <IconButton
              onPress={() => {
                navigation.goBack();
              }}
              Icon={ArrowLeftIcon}
              size={28}
            />
          ),
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_COMMENT}
        component={CommentScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerTitle: '댓글', // 헤더 제목을 비움
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
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_REPORT}
        component={ReportScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerTitle: '신고', // 헤더 제목을 비움
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
        })}
      />
      <Stack.Screen
        name={keepStackNavigations.KEEP_EDIT}
        component={KeepEditScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerTitle: 'KEEP 편집', // 헤더 제목을 비움s
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
