import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';
import tw from 'twrnc';
import LogoIcon from '../../assets/logo.svg';
import {AppStackParamList} from '../../types';
import {appStackNavigations} from '../../constants';

type SplashScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(appStackNavigations.MAIN);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={tw`w-full h-full bg-black items-center`}>
      <LogoIcon width={200} height={200} style={tw`mt-30`} />
    </View>
  );
}
