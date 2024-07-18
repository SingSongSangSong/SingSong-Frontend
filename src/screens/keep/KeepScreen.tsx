import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {MainTabParamList} from '../../types';
import {mainTabNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';
import {ButtonBar, Keeplist} from '../../components';
import tw from 'twrnc';

type KeepScreenProps = BottomTabScreenProps<
  MainTabParamList,
  typeof mainTabNavigations.KEEP
>;

function KeepScreen({navigation}: KeepScreenProps) {
  const keepHandler = useKeep();

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <Text style={tw`text-white font-bold text-xl m-5`}>Keep 보관함</Text>
      <ButtonBar buttonItems={keepHandler.buttonItems} />
      <Keeplist keeplistData={keepHandler.storedSong} onPress={() => {}} />
    </SafeAreaView>
  );
}

export default KeepScreen;
