import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {MainTabParamList} from '../../types';
import {mainTabNavigations} from '../../constants';
import tw from 'twrnc';
import {useRoute} from '@react-navigation/native';
import {logScreenView} from '../../utils';

type PlaygroundScreenProps = BottomTabScreenProps<
  MainTabParamList,
  typeof mainTabNavigations.PLAYGROUND
>;

function PlaygroundScreen({navigation}: PlaygroundScreenProps) {
  const route = useRoute();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('route name', route.name);
      logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
    });

    return unsubscribe;
  }, [navigation, route]);
  return (
    <SafeAreaView style={tw`flex-1 bg-black justify-center items-center`}>
      <Text style={tw`text-white font-bold text-lg`}>playground screen</Text>
    </SafeAreaView>
  );
}

export default PlaygroundScreen;
