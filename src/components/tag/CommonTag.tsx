import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';

type CommonTagProps = {
  name: string;
  color: string;
};

const CommonTag = ({name, color}: CommonTagProps) => {
  return (
    <View style={tw`border border-[${color}] rounded-sm py-0.2 px-1 mx-1.5`}>
      <Text style={tw`text-[${color}] text-xs`}>{name}</Text>
    </View>
  );
};

export {CommonTag};
