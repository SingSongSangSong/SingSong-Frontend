import React from 'react';
import {Text, Pressable} from 'react-native';
import tw from 'twrnc';
import {randomColor} from '../../constants';

type ClickableTagProps = {
  tag: string;
  index: number;
  onPress: (index: number) => void;
};

const ClickableTag = ({tag, index, onPress}: ClickableTagProps) => {
  return (
    <Pressable
      style={tw`bg-[${
        randomColor[index % randomColor.length]
      }] p-2 rounded-lg flex-row items-center m-1`}
      onPress={() => onPress(index)}>
      <Text style={tw`mr-2 font-bold text-black`}>{tag}</Text>
    </Pressable>
  );
};

export {ClickableTag};
