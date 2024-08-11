import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type LikeButtonProps = {
  title: string;
  onPress: () => void;
  color: string;
  Icon: any;
  PressIcon: any;
  isPressed: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  title,
  onPress,
  color,
  Icon,
  PressIcon,
  isPressed,
}) => {
  return (
    <View
      style={[
        tw`flex-row justify-center rounded-full border border-[${designatedColor.GRAY1}] m-1`,
        isPressed && tw`border-[${color}]`,
      ]}>
      <TouchableOpacity
        style={tw`flex-row justify-center items-center px-4 py-2`}
        onPress={onPress}>
        {isPressed ? (
          <PressIcon width={20} height={20} />
        ) : (
          <Icon width={20} height={20} />
        )}
        <Text
          style={[
            tw`text-white text-sm text-[${designatedColor.GRAY1}] ml-1`,
            isPressed && tw`text-[${color}]`,
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {LikeButton};
