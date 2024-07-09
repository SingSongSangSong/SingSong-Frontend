import {SafeAreaView, Text, StyleSheet} from 'react-native';
import React from 'react';
// import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
// import {StackScreenProps} from '@react-navigation/stack';
// import rcdNavigations from '../../constants/RcdConstants';
import tw from 'twrnc';

// type RcdKeepScreenProps = StackScreenProps<
//   rcdStackParamList,
//   typeof rcdNavigations.RCD_KEEP
// >;
// {navigation}: RcdKeepScreenProps)
function RcdKeepScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`font-bold text-[7] pb-5`}>Keep</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
});
export default RcdKeepScreen;
