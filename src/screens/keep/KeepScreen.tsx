import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {MainTabParamList} from '../../types';
import {mainTabNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';
import {Keeplist} from '../../components';

type KeepScreenProps = BottomTabScreenProps<
  MainTabParamList,
  typeof mainTabNavigations.KEEP
>;

function KeepScreen({navigation}: KeepScreenProps) {
  const keepHandler = useKeep();

  return (
    <SafeAreaView>
      <Text>keep screen</Text>
      <Keeplist storedSong={keepHandler.storedSong} />
    </SafeAreaView>
  );
}

export default KeepScreen;
