import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import HomeScreen from '../../screens/home/HomeScreen';
import RcdHomeScreen from '../../screens/recommendation/RcdHomeScreen';
// import {NavigationProp} from '@react-navigation/native';
import SettingScreen from '../../screens/home/SettingScreen';
import SongScreen from '../../screens/song/SongScreen';
import {IconButton} from '../../components';
import DeleteIcon from '../../assets/svg/delete.svg';
import CommentScreen from '../../screens/song/CommentScreen';
import RecommentScreen from '../../screens/song/RecommentScreen';
import ReportScreen from '../../screens/song/ReportScreen';
import TagDetailScreen from '../../screens/home/TagDetailScreen';
import BlacklistScreen from '../../screens/home/BlacklistScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';

const Stack = createStackNavigator<HomeStackParamList>();

// type HomeStackNavigatorProps = {
//   // route: RouteProp<HomeStackParamList>; // route를 옵셔널로 변경
//   navigation: NavigationProp<HomeStackParamList>;
// };
// {navigation}: HomeStackNavigatorProps
function HomeStackNavigator() {
  // const {tag} = route.params;
  // const tag = route?.params?.tag ?? 'defaultTag';
  // const {selectedTag} = useSongStore();

  return (
    <Stack.Navigator
      initialRouteName={homeStackNavigations.RCD_HOME}
      screenOptions={{
        gestureEnabled: true, // 슬라이드를 위한 제스처
        gestureDirection: 'horizontal', // 슬라이드 방향
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec, // iOS 스타일의 슬라이드 애니메이션
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // 슬라이드 애니메이션을 적용
      }}
      // screenOptions={{
      //   ...TransitionPresets.SlideFromRightIOS, // iOS 스타일의 슬라이드 애니메이션
      // }}
    >
      <Stack.Screen
        name={homeStackNavigations.RCD_HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={homeStackNavigations.RCD_DETAIL}
        component={RcdHomeScreen}
        // initialParams={{tag}}
        options={({route, navigation}) => ({
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
        name={homeStackNavigations.SONG_DETAIL}
        component={SongScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: '', //route.params.tag, // 헤더 제목을 tag로 설정
          headerStyle: {
            backgroundColor: 'black', // 헤더 배경색을 검정색으로 설정
          },
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
        name={homeStackNavigations.COMMENT}
        component={CommentScreen}
        options={({navigation}) => ({
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
              onPress={() => {
                navigation.goBack();
              }}
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
              onPress={() => {
                navigation.goBack();
              }}
              Icon={DeleteIcon}
              size={24}
            />
          ),
        })}
      />
      <Stack.Screen
        name={homeStackNavigations.SETTING}
        component={SettingScreen}
        options={({navigation}) => ({
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
        name={homeStackNavigations.BLACKLIST}
        component={BlacklistScreen}
        options={({navigation}) => ({
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
          headerLeft: () => (
            <IconButton
              onPress={() => {
                // console.log(route.name);
                navigation.goBack();
              }}
              Icon={ArrowLeftIcon}
              size={28}
            />
          ),
        })}
      />
      <Stack.Screen
        name={homeStackNavigations.SEARCH}
        component={SearchScreen}
        options={({navigation}) => ({
          headerShown: false,
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
        name={homeStackNavigations.TAG_DETAIL}
        component={TagDetailScreen}
        options={({navigation}) => ({
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
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
