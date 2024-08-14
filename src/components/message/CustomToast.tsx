import React from 'react';
import {View, Text} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {designatedColor} from '../../constants';
import tw from 'twrnc';

const CustomToast = () => {
  const toastConfig: ToastConfig = {
    selectedToast: ({text1}) => (
      <View
        style={tw`justify-center items-center bg-[#373A40] w-[64] py-3 rounded-full`}>
        <Text style={tw`text-[${designatedColor.PINK2}]`}>{text1}</Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export {CustomToast};
