import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

interface NavButtonProps {
  onPress: () => void;
  title: string;
}

const NavButton = ({onPress, title}: NavButtonProps) => (
  <TouchableOpacity onPress={onPress} style={tw`p-3`} activeOpacity={0.8}>
    <CustomText style={{color: designatedColor.DARK_GRAY}}>{title}</CustomText>
  </TouchableOpacity>
);

export {NavButton};
