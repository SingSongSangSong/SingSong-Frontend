import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

type CommonTagProps = {
  name: string;
  color: string;
};

const CommonTag = ({name, color}: CommonTagProps) => {
  return (
    <View style={tw`border border-[${color}] rounded-sm py-0.2 px-1 mr-1`}>
      <CustomText style={tw`text-[${color}] text-[10px]`}>{name}</CustomText>
    </View>
  );
};

export {CommonTag};
