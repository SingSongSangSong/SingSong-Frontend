import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import HomeScreen from '../../screens/home/HomeScreen';
import RcdHomeScreen from '../../screens/recommendation/RcdHomeScreen';
import {RouteProp} from '@react-navigation/native';

const Stack = createStackNavigator<HomeStackParamList>();

type HomeStackNavigatorProps = {
  route?: RouteProp<HomeStackParamList, typeof homeStackNavigations.RCD_DETAIL>; // route를 옵셔널로 변경
};

function HomeStackNavigator({route}: HomeStackNavigatorProps) {
  // const {tag} = route.params;
  const tag = route?.params?.tag ?? 'defaultTag';

  return (
    <Stack.Navigator initialRouteName={homeStackNavigations.RCD_HOME}>
      <Stack.Screen
        name={homeStackNavigations.RCD_HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={homeStackNavigations.RCD_DETAIL}
        component={RcdHomeScreen}
        initialParams={{tag}} // 기본값 설정
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigator;
