import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {designatedColor} from '../../constants';

interface CircleButtonProps {
  onPressIn: () => void;
  onPressOut: () => void;
}

const CircleButton = ({onPressIn, onPressOut}: CircleButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (!isPressed) {
      onPressIn();
    } else {
      onPressOut();
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
