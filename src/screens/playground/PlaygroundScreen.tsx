import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {MainTabParamList} from '../../types';
import {mainTabNavigations} from '../../constants';
import tw from 'twrnc';

type PlaygroundScreenProps = BottomTabScreenProps<
  MainTabParamList,
  typeof mainTabNavigations.PLAYGROUND
>;

function PlaygroundScreen({navigation}: PlaygroundScreenProps) {
  return (
    <SafeAreaView style={tw`flex-1 bg-black justify-center items-center`}>
      <Text style={tw`text-white font-bold text-lg`}>playground screen</Text>
    </SafeAreaView>
  );
}

export default PlaygroundScreen;
