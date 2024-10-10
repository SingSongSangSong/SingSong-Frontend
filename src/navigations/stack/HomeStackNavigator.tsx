import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import HomeScreen from '../../screens/home/HomeScreen';
import RcdHomeScreen from '../../screens/recommendation/RcdHomeScreen';
// import {NavigationProp} from '@react-navigation/native';
import SettingScreen from '../../screens/home/SettingScreen';
import SongScreen from '../../screens/song/SongScreen';
import {IconButton} from '../../components';
import CommentScreen from '../../screens/song/CommentScreen';
import RecommentScreen from '../../screens/song/RecommentScreen';
import ReportScreen from '../../screens/song/ReportScreen';
import TagDetailScreen from '../../screens/home/TagDetailScreen';
import BlacklistScreen from '../../screens/home/BlacklistScreen';
import SearchScreen from '../../screens/search/SearchScreen';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import {Platform} from 'react-native';
import RcdRecommendationScreen from '../../screens/recommendation/RcdRecommendationScreen';
import NicknameChangeScreen from '../../screens/home/NicknameChangeScreen';
import AiLlmScreen from '../../screens/llm/AiLlmScreen';
import AiLlmResultScreen from '../../screens/llm/AiLlmResult.screen';
import NewSongScreen from '../../screens/home/NewSongScreen';

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
        headerStyle: {
          backgroundColor: designatedColor.BACKGROUND_BLACK, // 공통 헤더 배경색
          borderBottomWidth: 0, // 모든 플랫폼에서 경계선 제거
        },
        headerTintColor: 'white', // 공통 헤더 텍스트 색상
        headerTitleAlign: 'center', // 공통 헤더 제목 가운데 정렬
        headerTitleStyle: {
          fontSize: 18, // 공통 헤더 제목 글씨 크기
        },
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
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: `${route?.params?.tag}`, // route.params.tag
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
        name={homeStackNavigations.AI_RECOMMENDATION}
        component={RcdRecommendationScreen}
        options={({navigation}) => ({
          headerShown: true,
          headerTitle: "AI's PICK",
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
          headerTitle: '', // 빈 제목
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
          headerTitle: '댓글',
          headerStyle: {
            backgroundColor: 'black', // 공통 헤더 배경색
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
        name={homeStackNavigations.RECOMMENT}
        component={RecommentScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '답글',
          headerStyle: {
            backgroundColor: 'black', // 공통 헤더 배경색
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
        name={homeStackNavigations.REPORT}
        component={ReportScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '신고',
          headerStyle: {
            backgroundColor: 'black', // 공통 헤더 배경색
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
        name={homeStackNavigations.SETTING}
        component={SettingScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '설정',
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
          headerTitle: '댓글 차단 관리',
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
        name={homeStackNavigations.NICKNAME_CHANGE}
        component={NicknameChangeScreen}
        options={({navigation}) => ({
          animationEnabled: false,
          headerShown: true,
          headerTitle: '닉네임 변경',
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
        name={homeStackNavigations.AI_LLM}
        component={AiLlmScreen}
        options={({navigation}) => ({
          // headerShown: false,
          headerTitle: 'AI 검색',
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
        name={homeStackNavigations.NEW_SONG}
        component={NewSongScreen}
        options={({navigation}) => ({
          // headerShown: false,
          headerTitle: '이달의 노래방 신곡',
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
        name={homeStackNavigations.AI_LLM_RESULT}
        component={AiLlmResultScreen}
        options={({navigation}) => ({
          // headerShown: false,
          headerTitle: '',
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
          headerTitle: '노래 목록',
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
