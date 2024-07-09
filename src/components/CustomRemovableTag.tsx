import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

type RemovableTagProps = {
  tag: string;
  index: number;
  onRemove: (index: number) => void;
};

const CustomRemovableTag = ({tag, index, onRemove}: RemovableTagProps) => {
  return (
    <View style={tw`bg-blue-200 p-2 rounded-lg flex-row items-center m-1`}>
      <Text style={tw`mr-2`}>{tag}</Text>
      <TouchableOpacity onPress={() => onRemove(index)}>
        <Text style={tw`text-red-500`}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomRemovableTag;
