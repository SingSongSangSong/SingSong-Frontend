import React from 'react';
import {Pressable, Text} from 'react-native';
import tw from 'twrnc';

interface LargeButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  Icon: any;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  title,
  onPress,
  color,
  Icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw`py-4 bg-[${color}] rounded-sm  mx-6 justify-center items-center flex-row`}>
      <Icon />
      <Text style={tw`text-sm text-black mx-2`}>{title}</Text>
    </Pressable>
  );
};

export {LargeButton};
