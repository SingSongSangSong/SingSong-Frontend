import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {designatedColor, searchStackNavigations} from '../../constants';
import {NavigationProp} from '@react-navigation/native';
import {IconButton} from '../../components';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import {Platform} from 'react-native';
import {SearchStackParamList} from '../../types';

import SearchScreen from '../../screens/search/SearchScreen';
import SongScreen from '../../screens/song/SongScreen';
import CommentScreen from '../../screens/song/CommentScreen';
import RecommentScreen from '../../screens/song/RecommentScreen';
import ReportScreen from '../../screens/song/ReportScreen';
import DeleteIcon from '../../assets/svg/delete.svg';
import SearchFocusScreen from '../../screens/search/SearchFocusScreen';
import AiLlmResultScreen from '../../screens/llm/AiLlmResult.screen';
import AiLlmScreen from '../../screens/llm/AiLlmScreen';
import RcdHomeScreen from '../../screens/recommendation/RcdHomeScreen';
import AiLlmInfoScreen from '../../screens/llm/AiLlmInfoScreen';

const Stack = createStackNavigator<SearchStackParamList>();

type SearchStackNavigatorProps = {
  navigation: NavigationProp<SearchStackParamList>;
};

function SearchStackNavigator({navigation}: SearchStackNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={searchStackNavigations.SEARCH}
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
        name={searchStackNavigations.SEARCH}
        component={SearchScreen}
        options={() => ({
          headerShown: false,
          //   headerTitle: '글쓰기', // 헤더 제목을 비움
        })}
      />
      <Stack.Screen
        name={searchStackNavigations.SEARCH_FOCUSED}
        component={SearchFocusScreen}
        options={() => ({
          headerShown: false,
          animationEnabled: false,
          //   headerTitle: '글쓰기', // 헤더 제목을 비움
        })}
      />
      <Stack.Screen
        name={searchStackNavigations.SEARCH_AI_LLM}
        component={AiLlmScreen}
        options={() => ({
          headerTitle: 'AI 검색',
        })}
      />
      <Stack.Screen
        name={searchStackNavigations.SEARCH_AI_LLM_INFO}
        component={AiLlmInfoScreen}
        options={() => ({
          headerTitle: '도움말',
        })}
      />
      <Stack.Screen
        name={searchStackNavigations.SEARCH_AI_LLM_RESULT}
        component={AiLlmResultScreen}
        options={() => ({
          headerTitle: '',
        })}
      />
      {/* <Stack.Screen
        name={searchStackNavigations.SEARCH_RCD_DETAIL}
        component={RcdHomeScreen}
        options={() => ({
          headerTitle: 'AI 검색',
        })}
      /> */}
      <Stack.Screen
        name={searchStackNavigations.SEARCH_RCD_DETAIL}
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
        name={searchStackNavigations.SEARCH_SONG_DETAIL}
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
        name={searchStackNavigations.SEARCH_COMMENT}
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
        name={searchStackNavigations.SEARCH_RECOMMENT}
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
        name={searchStackNavigations.SEARCH_REPORT}
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
    </Stack.Navigator>
  );
}

export default SearchStackNavigator;
