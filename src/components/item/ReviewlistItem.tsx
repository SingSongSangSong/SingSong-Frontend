import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

interface ReviewlistItemProps {
  title: string;
  count: number;
  isPressed?: boolean;
  reviewId: number;
  onAddPress?: () => void;
  onRemovePress?: () => void;
  setSelectedId: (id: number) => void;
  color: string;
  textColor: string;
  titleColor: string;
  percentage: number;
  isSelected: boolean;
}

const ReviewlistItem = ({
  title,
  count,
  isPressed,
  reviewId,
  onAddPress,
  onRemovePress,
  setSelectedId,
  color,
  textColor,
  titleColor,
  percentage,
  isSelected,
}: ReviewlistItemProps) => {
  const handleOnPress = () => {
    if (onAddPress && !isPressed) {
      setSelectedId(reviewId);
      onAddPress();
    } else if (onRemovePress && isPressed) {
      setSelectedId(null);
      onRemovePress();
    }
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View
        style={[
          tw`rounded-lg justify-between items-center relative overflow-hidden bg-[${designatedColor.GRAY4}] mb-3`,
          // isPressed && tw`bg-white`,
          // !isPressed && tw`bg-[${designatedColor.GRAY4}]`,
        ]}>
        {/* 퍼센테이지에 따른 색상 칠하기 */}
        <View
          style={[
            tw`absolute top-0 left-0 h-full`,
            {width: `${percentage}%`, backgroundColor: color},
          ]}
        />
        <View style={tw`flex-row justify-between w-full z-10 p-3`}>
          <CustomText
            style={[
              tw`ml-4 text-[${titleColor}]`,
              isSelected && tw`font-bold`,
            ]}>
            {title}
          </CustomText>
          <CustomText style={tw`text-black font-bold text-[${textColor}]`}>
            {count}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {ReviewlistItem};
