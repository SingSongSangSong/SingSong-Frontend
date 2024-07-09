import React from 'react';
import {Text, Pressable} from 'react-native';
import tw from 'twrnc';

type CustomClickableTagProps = {
  tag: string;
  index: number;
  onPress: (index: number) => void;
};

const CustomClickableTag = ({tag, index, onPress}: CustomClickableTagProps) => {
  return (
    <Pressable
      style={tw`bg-blue-200 p-2 rounded-lg flex-row items-center m-1`}
      onPress={() => onPress(index)}>
      <Text style={tw`mr-2`}>{tag}</Text>
    </Pressable>
  );
};

export default CustomClickableTag;
