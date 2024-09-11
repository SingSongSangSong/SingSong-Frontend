import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {designatedColor} from '../../constants';
import CheckIcon from '../../assets/svg/check.svg';
import CheckFilledIcon from '../../assets/svg/checkFilled.svg';
import tw from 'twrnc';

interface CheckButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
  isSelected: boolean;
  isDeleted: boolean;
}

const CheckButton = ({
  onPressIn,
  onPressOut,
  isSelected,
  isDeleted,
}: CheckButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (isSelected) {
      //추가되어야 하는 경우
      setIsPressed(isSelected);
      onPressIn();
    }
    if (isDeleted) {
      //삭제되어야 하는 경우
      setIsPressed(!isDeleted);
      onPressOut();
    }
  }, [isSelected, isDeleted]);

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (!isPressed) {
      onPressIn(); //keep에 추가
    } else {
      onPressOut(); //keep에서 삭제
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={tw`justify-center items-center bg-[${designatedColor.BACKGROUND_BLACK}]`}
      activeOpacity={0.8}>
      <View style={tw`flex-row items-center`}>
        {isPressed ? (
          <CheckFilledIcon width={18} height={18} />
        ) : (
          <CheckIcon width={18} height={18} />
        )}
        <Text
          style={[
            tw`text-[${designatedColor.TEXT_WHITE}] ml-2`,
            isPressed && tw`text-[${designatedColor.PINK2}]`,
          ]}>
          {isPressed ? '선택 해제' : '전체 선택'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export {CheckButton};
