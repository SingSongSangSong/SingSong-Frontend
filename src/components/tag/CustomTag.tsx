import React from 'react';
import {Text, View} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';

interface CustomTagProps {
  tag: string;
  index: number;
}

const CustomTag: React.FC<CustomTagProps> = ({tag, index}) => {
  return (
    <View key={index} style={tw`bg-[${designatedColor.RED}] p-1 rounded-lg`}>
      <Text style={tw`text-white font-bold text-[3]`}>{tag}</Text>
    </View>
  );
};

export {CustomTag};
