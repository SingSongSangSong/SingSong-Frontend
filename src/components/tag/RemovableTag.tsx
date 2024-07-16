import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {randomColor} from '../../constants';

type RemovableTagProps = {
  tag: string;
  index: number;
  onRemove: (
    index: number,
    tagLst: string[],
    setTag: (updatedTag: string[]) => void,
  ) => void;
  tagLst: string[];
  setTag: (updatedTag: string[]) => void;
};

const RemovableTag = ({
  tag,
  index,
  onRemove,
  tagLst,
  setTag,
}: RemovableTagProps) => {
  return (
    <View
      style={tw`bg-[${
        randomColor[index % 10]
      }] p-2 rounded-lg flex-row items-center m-1`}>
      <Text style={tw`mr-2 font-bold text-black`}>{tag}</Text>
      <TouchableOpacity onPress={() => onRemove(index, tagLst, setTag)}>
        <Text style={tw`text-gray-400 text-sm`}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export {RemovableTag};
