import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import {ButtonBar, Songlist} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
import {designatedColor, keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';

type KeepScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP
>;

function KeepScreen({navigation}: KeepScreenProps) {
  const keepHandler = useKeep();

  return (
    <SafeAreaView style={tw`h-full w-full  bg-[${designatedColor.BACKGROUND}]`}>
      <View>
        <ButtonBar buttonItems={keepHandler.buttonItems} />
      </View>

      <View style={tw`w-full h-full`}>
        {keepHandler.keepList.length > 0 ? (
          <Songlist songlistData={keepHandler.keepList} />
        ) : (
          <View style={tw`h-full w-full justify-center items-center`}>
            <Text style={tw`text-white font-bold`}>Keep이 비어있어요</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default KeepScreen;
