import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import {SafeAreaView, Text, View} from 'react-native';

type SettingScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.SETTING
>;

function SettingScreen({navigation}: SettingScreenProps) {
  return (
    <SafeAreaView style={tw`flex-1 bg-[#151515]`}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-white`}>SettingScreen</Text>
      </View>
    </SafeAreaView>
  );
}

export default SettingScreen;
