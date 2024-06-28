import {Button, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {AuthStackParamList} from '../../navigation/AuthStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import authNavigations from '../../constants/AuthConstants';

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
        onPress={() => navigation.navigate(authNavigations.LOGIN)}></Button>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({});

export default AuthHomeScreen;
