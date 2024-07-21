import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import tw from 'twrnc';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';

interface AddTextButtonProps {
  title: string;
  onPress: (title: string) => void;
  isCenter: boolean;
}

const AddTextButton = ({
  title,
  onPress,
  isCenter = false,
}: AddTextButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(title)}
      style={[
        tw`px-4 py-4 flex-row items-center`,
        isCenter && tw`justify-center items-center`,
      ]}>
      <Text style={tw`text-white text-sm font-semibold pr-1`}>{title}</Text>
      <ArrowRightIcon width={32} height={32} />
    </TouchableOpacity>
  );
};

export {AddTextButton};
