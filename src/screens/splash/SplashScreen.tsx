import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, Text, View} from 'react-native';
import tw from 'twrnc';
import LogoIcon from '../../assets/svg/logo.svg';
import {AppStackParamList} from '../../types';
import {appStackNavigations, designatedColor} from '../../constants';
import useFetchData from '../../hooks/useFetchData';
import {LargeButton} from '../../components';
import useUserInfo from '../../hooks/useUserInfo';

type SplashScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  const fetchDataHandler = useFetchData();
  const userInfoHandler = useUserInfo();

  useEffect(() => {
    fetchDataHandler.fetchData();
    // const timer = setTimeout(() => {
    //   navigation.replace(appStackNavigations.MAIN);
    // }, 2000);
    // return () => clearTimeout(timer);
  }, []);

  const handleKakaoButton = async () => {
    try {
      await userInfoHandler.handleKakaoLogin();

      navigation.navigate(appStackNavigations.MAIN);
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
