import React from 'react';
import {TouchableOpacity} from 'react-native';
import tw from 'twrnc';

interface IconButtonProps {
  Icon: any;
  onPress: () => void;
}

const IconButton = ({Icon, onPress}: IconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-4 py-4 flex-row justify-center items-center`}>
      <Icon width={28} height={28} />
    </TouchableOpacity>
  );
};

export {IconButton};
