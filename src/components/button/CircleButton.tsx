import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {designatedColor} from '../../constants';
import CheckIcon from '../../assets/svg/check.svg';

interface CircleButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
  isSelected: boolean;
  isDeleted: boolean;
}

const CircleButton = ({
  onPressIn,
  onPressOut,
  isSelected,
  isDeleted,
}: CircleButtonProps) => {
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
      style={styles.button}
      activeOpacity={0.8}>
      <View style={[styles.circle, isPressed && styles.circlePressed]}>
        {isPressed &&
          (Platform.OS === 'ios' ? (
            <CheckIcon width={12} height={12} />
          ) : (
            <Icon name="check" size={12} color="black" />
          ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: designatedColor.BLACK,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: designatedColor.GRAY4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePressed: {
    backgroundColor: designatedColor.PINK2,
  },
});

export {CircleButton};
