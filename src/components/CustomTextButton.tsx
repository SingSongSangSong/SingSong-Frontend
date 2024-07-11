import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import tw from 'twrnc';
import ArrowRightIcon from '../../public/arrowRight.svg';

interface CustomTextButtonProps {
  title: string;
  onPress: () => void;
}

const CustomTextButton = ({title, onPress}: CustomTextButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-4 py-4 flex-row justify-center items-center`}>
      <Text style={tw`text-white text-sm font-semibold pr-1`}>{title}</Text>
      <ArrowRightIcon width={32} height={32} />
    </TouchableOpacity>
  );
};

export default CustomTextButton;
