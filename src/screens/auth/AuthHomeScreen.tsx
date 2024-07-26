import {Button, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {authNavigations} from '../../constants';
import {AuthStackParamList} from '../../types';
import {login} from '@react-native-kakao/user';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  const handleKakaoLogin = async () => {
    try {
      // 카카오 로그인 시작
      const result = await login();
      console.log('Login Result:', result);

      // 로그인 성공 후 사용자 프로필 가져오기
      // const profile = await getProfile();
      // console.log('Profile:', profile);

      // Alert.alert('Login Success', `Welcome ${profile.nickname}`);
    } catch (err) {
      console.error('Login Failed', err);
      // Alert.alert('Login Failed', err.message);
    }
  };
  return (
    <SafeAreaView>
      <Text>텍스트</Text>
      <Button title="START" onPress={() => handleKakaoLogin()} />
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
