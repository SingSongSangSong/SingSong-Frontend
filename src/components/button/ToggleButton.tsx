import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Animated, StyleSheet, Easing} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type ToggleButtonProps = {
  isEnabled: boolean;
  toggleSwitch: () => void;
};

const ToggleButton = ({isEnabled, toggleSwitch}: ToggleButtonProps) => {
  const [animationValue] = useState(new Animated.Value(isEnabled ? 1 : 0));

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isEnabled ? 1 : 0,
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isEnabled, animationValue]);

  const interpolateBackgroundColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['gray', designatedColor.GREEN],
  });

  const interpolateThumbPosition = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10], // 스위치 thumb의 위치를 설정
  });

  return (
    <TouchableOpacity
      style={[tw`justify-center items-center`, styles.switchContainer]}
      onPress={toggleSwitch}>
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
