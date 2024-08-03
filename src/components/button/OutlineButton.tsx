import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({
  title,
  onPress,
  color,
}) => {
  return (
    <View
      style={tw`flex-row justify-center rounded-full border border-[${color}] px-4 py-2`}>
      <TouchableOpacity
        style={tw`flex-row justify-center items-center`}
        onPress={onPress}>
        <Text style={tw`text-white text-sm text-[${color}]`}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export {OutlineButton};
