import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import rcdNavigations from '../../constants/RcdConstants';

type RcdHomeScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_HOME
>;

function RcdHomeScreen({navigation}: RcdHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>싱송생송 노래 추천</Text>
      <Button
        title="START"
        onPress={() => navigation.navigate(rcdNavigations.RCD_DETAIL)}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RcdHomeScreen;
