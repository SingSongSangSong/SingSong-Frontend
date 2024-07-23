import React from 'react';
import {Pressable, Text} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

interface PlusButtonProps {
  title: string;
  onPress: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({title, onPress}) => {
  return (
    <Pressable
      style={tw`border border-[${designatedColor.DARK_GRAY}] rounded-full flex-row px-5 py-2 justify-center items-center`}
      onPress={onPress}>
      {/* <PlusIcon width={32} height={32} /> */}
      <Text style={tw`text-white text-sm`}>+ {title}</Text>
    </Pressable>
  );
};

export {PlusButton};
