import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

type TextButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
  size: number;
};

const TextButton: React.FC<TextButtonProps> = ({
  title,
  onPress,
  color,
  size,
}) => {
  return (
    <View style={tw`flex-row justify-center`}>
      <TouchableOpacity
        style={tw`w-full flex-row justify-center items-center`}
        onPress={onPress}
        activeOpacity={0.8}>
        <CustomText style={tw`text-[${color}] text-[${size}]`}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export {TextButton};
