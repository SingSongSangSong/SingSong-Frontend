import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import MicIcon from '../../assets/svg/logMic.svg';

function PlaygroundScreen() {
  return (
    <SafeAreaView style={tw`flex-1 bg-black justify-center items-center`}>
      {/* <Text style={tw`text-white font-bold text-lg`}>playground screen</Text> */}
      <View style={tw`items-center`}>
        <Text style={tw`text-[${designatedColor.PINK}] text-[10] font-bold`}>
          Coming Soon
        </Text>
        <Text style={tw`text-[${designatedColor.GRAY3}] text-[6] mt-2`}>
          We're preparing...
        </Text>
        <View style={tw`py-4`}>
          <MicIcon />
        </View>
        <Text style={tw`text-[${designatedColor.GRAY1}] text-3 mt-2`}>
          9월 중 다른 사용자들과 소통할 수 있는 공간이 마련될 예정입니다.
        </Text>
        <Text style={tw`text-[${designatedColor.GRAY1}] text-3 mt-2`}>
          기대해주세요!
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default PlaygroundScreen;
