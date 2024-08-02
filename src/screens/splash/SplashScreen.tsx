import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import LogoIcon from '../../assets/svg/logo.svg';
import {AppStackParamList} from '../../types';
import {appStackNavigations} from '../../constants';
import useFetchData from '../../hooks/useFetchData';
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
    const timer = setTimeout(() => {
      handleNavigation();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = async () => {
    const isValidToken = await userInfoHandler.getIsValidToken();
    if (isValidToken) {
      //accessToken이 유효하거나, accessToken이 유효하지 않지만 refreshToken이 유효해서 재발급을 받는 경우
      navigation.replace(appStackNavigations.MAIN);
    } else {
      // 저장된 토큰이 없거나, accessToken이 유효하지 않고 refreshToken도 유효하지 않아 재발급을 받지 못한 경우
      navigation.replace(appStackNavigations.LOGIN);
    }
  };

  return (
    <View style={tw`w-full h-full bg-black items-center`}>
      <LogoIcon width={200} height={200} style={tw`mt-30`} />
      <Text style={tw`mt-2 text-white font-bold text-sm`}>
        싱숭생숭한 기분을 싱송생송하게!
      </Text>
    </View>
  );
}
