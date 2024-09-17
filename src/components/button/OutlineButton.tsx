import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import CustomText from '../text/CustomText';

type OutlineButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
};

const OutlineButton: React.FC<OutlineButtonProps> = ({
  title,
  onPress,
  color,
}) => {
  return (
    <View
      style={tw`flex-row justify-center rounded-full border border-[${color}] `}>
      <TouchableOpacity
        style={tw`flex-row justify-center items-center px-4 py-2`}
        onPress={onPress}
        activeOpacity={0.8}>
        <CustomText style={tw`text-white text-sm text-[${color}]`}>
          {title}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export {OutlineButton};
