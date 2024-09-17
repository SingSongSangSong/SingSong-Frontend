import React from 'react';
import {Text, View} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import MicIcon from '../../assets/svg/logMic.svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from '../../components/text/CustomText';

function PlaygroundScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] justify-center items-center`,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {/* <Text style={tw`text-white font-bold text-lg`}>playground screen</Text> */}
      <View style={tw`items-center`}>
        <CustomText
          style={tw`text-[${designatedColor.PINK}] text-[10] font-bold`}>
          Coming Soon
        </CustomText>
        <CustomText style={tw`text-[${designatedColor.GRAY3}] text-[6] mt-2`}>
          We're preparing...
        </CustomText>
        <View style={tw`py-4`}>
          <MicIcon />
        </View>
        <CustomText style={tw`text-[${designatedColor.GRAY1}] text-3 mt-2`}>
          9월 중 다른 사용자들과 소통할 수 있는 공간이 마련될 예정입니다.
        </CustomText>
        <CustomText style={tw`text-[${designatedColor.GRAY1}] text-3 mt-2`}>
          기대해주세요!
        </CustomText>
      </View>
    </View>
  );
}

export default PlaygroundScreen;
