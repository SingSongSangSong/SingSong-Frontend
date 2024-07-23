import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';

interface NavButtonProps {
  onPress: () => void;
  title: string;
}

const NavButton = ({onPress, title}: NavButtonProps) => (
  <TouchableOpacity onPress={onPress} style={tw`p-3`}>
    <Text style={{color: designatedColor.DARK_GRAY}}>{title}</Text>
  </TouchableOpacity>
);

export {NavButton};
