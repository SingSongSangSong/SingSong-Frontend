import {Button, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {authNavigations} from '../../constants';
import {AuthStackParamList} from '../../types';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
  return (
    <SafeAreaView>
      <Text>텍스트</Text>
      <Button
        title="START"
        onPress={() => navigation.navigate(authNavigations.LOGIN)}
      />
    </SafeAreaView>
  );
}

export default AuthHomeScreen;
