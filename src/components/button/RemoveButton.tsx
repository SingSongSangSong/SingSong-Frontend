import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

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
        onPress={onPress}
        activeOpacity={0.8}>
        <CustomText style={tw`text-white font-bold text-sm mr-2`}>
          {title}
        </CustomText>
        <CustomText
          style={tw`text-white font-bold text-sm text-[${designatedColor.RED}] `}>
          {count}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export {RemoveButton};
