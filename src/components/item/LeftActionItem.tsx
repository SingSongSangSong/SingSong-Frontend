import React from 'react';
import {TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';
import KeepFilledWhiteIcon from '../../assets/svg/keepFilledWhite.svg';
import KeepIcon from '../../assets/svg/keepIcon.svg';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

interface LeftActionItemProps {
  dragX: SharedValue<number>;
  handleOnKeepPress: () => void;
  isKeepPressed: boolean;
}

const LeftActionItem = ({
  dragX,
  handleOnKeepPress,
  isKeepPressed,
}: LeftActionItemProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      dragX.value,
      [0, 50], // Opacity will be 0 initially and start increasing
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity, // Dynamically changing opacity
    };
  });

  return (
    <Animated.View
      style={[
        tw`flex-row items-center bg-[${designatedColor.PINK}] justify-center w-16`,
        animatedStyle,
      ]}>
      <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
        {isKeepPressed ? (
          <KeepFilledWhiteIcon width={24} height={24} />
        ) : (
          <KeepIcon width={24} height={24} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LeftActionItem;
