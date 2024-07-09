// import {StyleSheet} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import rcdNavigations from '../constants/RcdConstants';
import RcdDetailScreen from '../screens/recommendation/RcdDetailScreen';
import RcdFindingScreen from '../screens/recommendation/RcdFindingScreen';
import RcdResultScreen from '../screens/recommendation/RcdResultScreen';
import {Props, Song} from '../types/songs';
import RcdTabNavigator from './RcdTabNavigator';

export type rcdStackParamList = {
  [rcdNavigations.RCD_HOME]: {tag: string};
  [rcdNavigations.RCD_DETAIL]: undefined;
  [rcdNavigations.RCD_FINDING]: {
    props: Props;
  };
  [rcdNavigations.RCD_RESULT]: {songs: Song[]; tags: string[]};
  [rcdNavigations.RCD_TAG]: undefined;
  [rcdNavigations.RCD_KEEP]: undefined;
};

function RcdStackNavigator({route}: {route: any}) {
  const Stack = createStackNavigator<rcdStackParamList>();
  const {tag} = route.params;

  return (
    <Stack.Navigator
      initialRouteName={rcdNavigations.RCD_HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={rcdNavigations.RCD_HOME}
        component={RcdTabNavigator}
        initialParams={{tag}}
      />
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
      <Stack.Screen name={rcdNavigations.RCD_TAG} component={RcdTabNavigator} />
      <Stack.Screen
        name={rcdNavigations.RCD_KEEP}
        component={RcdTabNavigator}
      />
    </Stack.Navigator>
  );
}

export default RcdStackNavigator;
