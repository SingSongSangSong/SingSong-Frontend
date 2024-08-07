import React from 'react';
import {TouchableOpacity} from 'react-native';
import tw from 'twrnc';

interface IconButtonProps {
  Icon: any;
  onPress: () => void;
  size: number;
}

const IconButton = ({Icon, onPress, size}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-2 py-2 flex-row justify-center items-center`}>
      <Icon width={size} height={size} />
    </TouchableOpacity>
  );
};

export {IconButton};
