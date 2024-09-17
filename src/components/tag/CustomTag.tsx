import React from 'react';
import {Text, View} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

interface CustomTagProps {
  tag: string;
  index: number;
}

const CustomTag: React.FC<CustomTagProps> = ({tag, index}) => {
  return (
    <View key={index} style={tw`bg-[${designatedColor.RED}] p-1 rounded-lg`}>
      <CustomText style={tw`text-white font-bold text-[3]`}>{tag}</CustomText>
    </View>
  );
};

export {CustomTag};
