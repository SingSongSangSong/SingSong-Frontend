import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';

function PlaygroundScreen() {
  return (
    <SafeAreaView
      style={tw`flex-1 bg-black justify-start items-start pl-4 pt-8`}>
      {/* <Text style={tw`text-white font-bold text-lg`}>playground screen</Text> */}
      <Text style={tw`text-[${designatedColor.PINK}] text-[16] font-bold`}>
        Coming
      </Text>
      <Text style={tw`text-[${designatedColor.PINK}] text-[16] font-bold`}>
        Soon,
      </Text>
      <Text style={tw`text-[${designatedColor.GRAY3}] text-[8] mt-2`}>
        We're preparing...
      </Text>
    </SafeAreaView>
  );
}

export default PlaygroundScreen;
