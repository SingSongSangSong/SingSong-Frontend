import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {mainTabParamList} from '../../types';
import {mainTabNavigations} from '../../constants';

type CommunityScreenProps = BottomTabScreenProps<
  mainTabParamList,
  typeof mainTabNavigations.COMMUNITY
>;

function CommunityScreen({navigation}: CommunityScreenProps) {
  return (
    <SafeAreaView>
      <Text>community screen</Text>
    </SafeAreaView>
  );
}

export default CommunityScreen;
