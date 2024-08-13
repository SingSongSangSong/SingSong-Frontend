import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import HomeScreen from '../../screens/home/HomeScreen';
import RcdHomeScreen from '../../screens/recommendation/RcdHomeScreen';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import SettingScreen from '../../screens/home/SettingScreen';
import SongScreen from '../../screens/song/SongScreen';
import useSongStore from '../../store/useSongStore';
import {IconButton} from '../../components';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import DeleteIcon from '../../assets/svg/delete.svg';
import CommentScreen from '../../screens/song/CommentScreen';
import RecommentScreen from '../../screens/song/RecommentScreen';
import ReportScreen from '../../screens/song/ReportScreen';
import TagDetailScreen from '../../screens/home/TagDetailScreen';
import BlacklistScreen from '../../screens/home/BlacklistScreen';

const Stack = createStackNavigator<HomeStackParamList>();

type HomeStackNavigatorProps = {
  // route?: RouteProp<HomeStackParamList>; // route를 옵셔널로 변경
  navigation: NavigationProp<HomeStackParamList>;
};

function HomeStackNavigator({navigation}: HomeStackNavigatorProps) {
  // const {tag} = route.params;
  // const tag = route?.params?.tag ?? 'defaultTag';
  const {selectedTag} = useSongStore();

  return (
    <Stack.Navigator
      initialRouteName={homeStackNavigations.RCD_HOME}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS, // iOS 스타일의 슬라이드 애니메이션
        // animationEnabled: false,
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
        options={({route}) => ({
          headerShown: true,
          headerTitle: `${route?.params?.tag}`, //route.params.tag, // 헤더 제목을 tag로 설정
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
          // headerLeft: () => (
          //   <IconButton
          //     onPress={() =>
          //       navigation.navigate(homeStackNavigations.RCD_DETAIL, {
          //         tag: selectedTag,
          //       })
          //     }
          //     size={24}
          //     Icon={ArrowLeftIcon}
          //   />
          // ),
        })}
      />
      <Stack.Screen
        name={homeStackNavigations.COMMENT}
        component={CommentScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '댓글', //route.params.tag, // 헤더 제목을 tag로 설정
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
        name={homeStackNavigations.RECOMMENT}
        component={RecommentScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '답글', //route.params.tag, // 헤더 제목을 tag로 설정
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={DeleteIcon}
              size={24}
            />
          ),
        })}
      />
      <Stack.Screen
        name={homeStackNavigations.REPORT}
        component={ReportScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '신고', //route.params.tag, // 헤더 제목을 tag로 설정
          headerTitleAlign: 'center', // 헤더 제목을 중간으로 정렬
          headerTitleStyle: {
            fontSize: 18, // 헤더 글씨 크기를 줄임
          },
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
          headerTintColor: 'white', // 헤더 텍스트 색상을 흰색으로 설정
          headerLeft: () => null,
          headerRight: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={DeleteIcon}
              size={24}
            />
          ),
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
      <Stack.Screen
        name={homeStackNavigations.BLACKLIST}
        component={BlacklistScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '댓글 차단 관리', //route.params.tag, // 헤더 제목을 tag로 설정
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
        name={homeStackNavigations.TAG_DETAIL}
        component={TagDetailScreen}
        options={() => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '노래 목록', //route.params.tag, // 헤더 제목을 tag로 설정
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
