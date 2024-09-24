import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {appStackNavigations} from '../../constants';
import SplashScreen from '../../screens/\bsplash/SplashScreen';
import MainTabNavigator from '../tab/MainTabNavigator';
import {AppStackParamList} from '../../types';
import LoginScreen from '../../screens/auth/LoginScreen';
import TermsScreen from '../../screens/auth/TermsScreen';
import {TouchableOpacity} from 'react-native';
import DeleteIcon from '../../assets/svg/delete.svg';
import tw from 'twrnc';

const Stack = createStackNavigator<AppStackParamList>();

function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // ...TransitionPresets.FadeFromBottomAndroid, // iOS 스타일의 슬라이드 애니메이션
        animationEnabled: false,
      }}>
      <Stack.Screen
        name={appStackNavigations.SPLASH}
        component={SplashScreen}
      />
      <Stack.Screen
        name={appStackNavigations.MAIN}
        component={MainTabNavigator}
      />
      <Stack.Screen
        name={appStackNavigations.TERMS}
        component={TermsScreen}
        options={({navigation}) => ({
          headerShown: true, // 헤더를 보이게 설정
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                // 삭제 버튼 눌렀을 때의 동작
                navigation.replace(appStackNavigations.LOGIN);
              }}
              style={tw`p-2`}>
              <DeleteIcon />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name={appStackNavigations.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;
