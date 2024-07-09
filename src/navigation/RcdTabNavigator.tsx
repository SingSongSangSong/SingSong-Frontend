// TabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import rcdNavigations from '../constants/RcdConstants';
import RcdTagScreen from '../screens/recommendation/RcdTagScreen';
import RcdHomeScreen from '../screens/recommendation/RcdHomeScreen';
import RcdKeepScreen from '../screens/recommendation/RcdKeepScreen';

export type rcdTabParamList = {
  [rcdNavigations.RCD_TAG]: undefined;
  [rcdNavigations.RCD_HOME]: {tag: string};

  [rcdNavigations.RCD_KEEP]: undefined;
};

const RcdTabNavigator = ({route}: {route: any}) => {
  const {tag} = route.params;

  const Tab = createBottomTabNavigator<rcdTabParamList>();
  return (
    <Tab.Navigator
      initialRouteName={rcdNavigations.RCD_HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name={rcdNavigations.RCD_TAG} component={RcdTagScreen} />
      <Tab.Screen
        name={rcdNavigations.RCD_HOME}
        component={RcdHomeScreen}
        initialParams={{tag}}
      />
      <Tab.Screen name={rcdNavigations.RCD_KEEP} component={RcdKeepScreen} />
    </Tab.Navigator>
  );
};

export default RcdTabNavigator;
