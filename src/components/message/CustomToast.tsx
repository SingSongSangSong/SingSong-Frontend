import React from 'react';
import {View, Text} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

const CustomToast = () => {
  const toastConfig: ToastConfig = {
    selectedToast: ({text1}) => (
      <View
        style={tw`justify-center items-center bg-[#373A40] mx-4 px-8 py-3 rounded-full`}>
        <CustomText style={tw`text-[${designatedColor.PINK2}]`}>
          {text1}
        </CustomText>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export {CustomToast};
