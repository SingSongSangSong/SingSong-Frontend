import React, {useState} from 'react';
import {TouchableOpacity, Animated, StyleSheet, Easing} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type ToggleButtonProps = {
  toggleSwitch: () => void;
};

const ToggleButton = ({toggleSwitch}: ToggleButtonProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const [animationValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

  const interpolateBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', designatedColor.PINK2],
  });

  const interpolateThumbPosition = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10], // 스위치 thumb의 위치를 설정
  });

  const handleOnToggleSwith = () => {
    toggleSwitch();
    Animated.timing(animationValue, {
      toValue: !isEnabled ? 1 : 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    setIsEnabled(!isEnabled);
  };

  return (
    <TouchableOpacity
      style={[tw`justify-center items-center`, styles.switchContainer]}
      onPress={handleOnToggleSwith}>
      <Animated.View
        style={[styles.track, {backgroundColor: interpolateBackgroundColor}]}
      />
      <Animated.View
        style={[
          styles.thumb,
          {transform: [{translateX: interpolateThumbPosition}]},
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    position: 'absolute',
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    position: 'absolute',
    top: 2,
  },
});

export {ToggleButton};
