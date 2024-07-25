import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

type TextButtonProps = {
  title: string;
  onPress: () => void;
};

const TextButton: React.FC<TextButtonProps> = ({title, onPress}) => {
  return (
    <View style={tw`flex-row justify-center m-1`}>
      <TouchableOpacity
        style={tw`p-2 flex-row justify-center items-center`}
        onPress={onPress}>
        <Text style={tw`text-white font-bold text-sm`}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export {TextButton};
