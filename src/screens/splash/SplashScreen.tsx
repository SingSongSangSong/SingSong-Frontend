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
      navigation.replace(appStackNavigations.MAIN);
    } else {
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
