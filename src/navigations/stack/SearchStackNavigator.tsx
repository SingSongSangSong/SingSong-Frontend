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

const Stack = createStackNavigator<SearchStackParamList>();

type SearchStackNavigatorProps = {
  navigation: NavigationProp<SearchStackParamList>;
};

function SearchStackNavigator({navigation}: SearchStackNavigatorProps) {
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
        name={searchStackNavigations.SEARCH}
        component={SearchScreen}
        options={() => ({
          headerShown: false,
          //   headerTitle: '글쓰기', // 헤더 제목을 비움
        })}
      />
    </Stack.Navigator>
  );
}

export default SearchStackNavigator;
