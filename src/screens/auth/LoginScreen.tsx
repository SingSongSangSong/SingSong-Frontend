import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import {LargeButton} from '../../components';
import useUserInfo from '../../hooks/useUserInfo';
import LogoIcon from '../../assets/svg/logo.svg';
import tw from 'twrnc';
import {appStackNavigations, designatedColor} from '../../constants';
import {AppStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';

type LoginScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const userInfoHandler = useUserInfo();

  const handleKakaoButton = async () => {
    try {
      await userInfoHandler.handleKakaoLogin();

      navigation.navigate(appStackNavigations.MAIN); //메인으로 이동
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  return (
    <View style={tw`w-full h-full bg-black items-center`}>
      <LogoIcon width={200} height={200} style={tw`mt-30`} />
      <Text style={tw`mt-2 text-white font-bold text-sm`}>
        싱숭생숭한 기분을 싱송생송하게!
      </Text>
      <View style={tw`absolute bottom-0 mb-20 w-full`}>
        <LargeButton
          title="카카오톡으로 시작"
          onPress={handleKakaoButton}
          color={designatedColor.KAKAO_YELLOW}
        />
      </View>
      {userInfoHandler.isLoggedProcess && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

export default LoginScreen;
