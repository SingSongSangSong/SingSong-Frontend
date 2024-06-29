import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import React from 'react';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import rcdNavigations from '../../constants/RcdConstants';
import tw from 'twrnc';
import CustomButton from '../../components/CustomButton';

type RcdHomeScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_HOME
>;

function RcdHomeScreen({navigation}: RcdHomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`font-bold text-[7] pb-5`}>SING SONG SANG SONG</Text>
      <Text style={tw`font-bold text-[5]`}>노래 추천</Text>
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="START"
          onPress={() => navigation.navigate(rcdNavigations.RCD_DETAIL)}
        />
      </View>
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
export default RcdHomeScreen;
