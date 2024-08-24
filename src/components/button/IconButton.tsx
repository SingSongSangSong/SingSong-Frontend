import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';

interface IconButtonProps {
  Icon: any;
  onPress: () => void;
  size: number;
}

const IconButton = ({Icon, onPress, size}: IconButtonProps) => {
  return (
    <View>
      {/* <View style={tw`h-1`} />  */}
      <TouchableOpacity
        onPress={onPress}
        style={tw`px-2 py-2 flex-row justify-center items-center`}
        activeOpacity={0.8}>
        <Icon width={size} height={size} />
      </TouchableOpacity>
    </View>
  );
};

export {IconButton};
