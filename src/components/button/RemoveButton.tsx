import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type RemoveButtonProps = {
  title: string;
  onPress: () => void;
  count: number;
};

const RemoveButton: React.FC<RemoveButtonProps> = ({title, count, onPress}) => {
  return (
    <View style={tw`flex-row justify-center m-1`}>
      <TouchableOpacity
        style={tw`p-2 flex-row justify-center items-center`}
        onPress={onPress}>
        <Text style={tw`text-white font-bold text-sm mr-2`}>{title}</Text>
        <Text
          style={tw`text-white font-bold text-sm text-[${designatedColor.RED}] `}>
          {count}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {RemoveButton};
