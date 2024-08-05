import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CheckIcon from '../../assets/svg/check.svg';

interface ReviewlistItemProps {
  title: string;
  count: number;
  isPressed: boolean;
  reviewId: number;
  onAddPress: () => void;
  onRemovePress: () => void;
  setSelectedId: (id: number) => void;
}

const ReviewlistItem = ({
  title,
  count,
  isPressed,
  reviewId,
  onAddPress,
  onRemovePress,
  setSelectedId,
}: ReviewlistItemProps) => {
  const handleOnPress = () => {
    if (!isPressed) {
      setSelectedId(reviewId);
      onAddPress();
    } else {
      setSelectedId(null);
      onRemovePress();
    }
  };
  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={[
          tw`p-3 rounded-lg flex-row justify-between items-center`,
          isPressed && tw`bg-white`,
          !isPressed && tw`bg-[${designatedColor.GRAY4}]`,
        ]}>
        <Text
          style={[
            isPressed && tw`text-[${designatedColor.GRAY4}] font-bold`,
            !isPressed && tw`text-white`,
          ]}>
          {title}
        </Text>
        {!isPressed ? (
          <CheckIcon width={24} height={24} />
        ) : (
          <Text style={tw`text-black font-bold`}>{count}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export {ReviewlistItem};
