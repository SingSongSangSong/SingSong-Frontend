// import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import rcdNavigations from '../constants/RcdConstants';
import RcdHomeScreen from '../screens/recommendation/RcdHomeScreen';
import RcdDetailScreen from '../screens/recommendation/RcdDetailScreen';
import RcdFindingScreen from '../screens/recommendation/RcdFindingScreen';
import RcdResultScreen from '../screens/recommendation/RcdResultScreen';
import {Song} from '../types/songs';

export type rcdStackParamList = {
  [rcdNavigations.RCD_HOME]: undefined;
  [rcdNavigations.RCD_DETAIL]: undefined;
  [rcdNavigations.RCD_FINDING]: undefined;
  [rcdNavigations.RCD_RESULT]: {songs: Song[]};
};

function RcdStackNavigator() {
  const Stack = createStackNavigator<rcdStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name={rcdNavigations.RCD_HOME} component={RcdHomeScreen} />
      <Stack.Screen
        name={rcdNavigations.RCD_DETAIL}
        component={RcdDetailScreen}
      />
      <Stack.Screen
        name={rcdNavigations.RCD_FINDING}
        component={RcdFindingScreen}
      />
      <Stack.Screen
        name={rcdNavigations.RCD_RESULT}
        component={RcdResultScreen}
      />
    </Stack.Navigator>
  );
}

// const styles = StyleSheet.create({});

export default RcdStackNavigator;
