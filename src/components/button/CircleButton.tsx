import React, {useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {designatedColor} from '../../constants';

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
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <View style={[styles.circle, isPressed && styles.circlePressed]}>
        {isPressed && <Icon name="check" size={12} color="white" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: designatedColor.DARK_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePressed: {
    backgroundColor: '#4CAF50',
  },
});

export {CircleButton};
