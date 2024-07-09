import React, {useEffect} from 'react';
import {MainStackParamList} from './navigation/MainStackNavigator';
import mainNavigations from './constants/MainConstants';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';

type SplashScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(mainNavigations.HOME);
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View>
      <Text> singsongsangsong</Text>
    </View>
  );
}
