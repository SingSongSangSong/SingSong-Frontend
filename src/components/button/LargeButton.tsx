import React from 'react';
import {Pressable, Text} from 'react-native';
import tw from 'twrnc';

interface LargeButtonProps {
  title: string;
  onPress: () => void;
  color: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({title, onPress, color}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw`p-3 bg-[${color}] rounded-lg  mx-4 justify-center items-center`}>
      <Text style={tw`text-sm text-black`}>{title}</Text>
    </Pressable>
  );
};

export {LargeButton};
