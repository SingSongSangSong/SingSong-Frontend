import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 아이콘 라이브러리
import {designatedColor} from '../../constants';

interface CircleButtonProps {
  onPress: () => void;
}

const CircleButton = ({onPress}: CircleButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(!isPressed);
    onPress();
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
    borderColor: designatedColor.DARK_GRAY, // 기본 회색 테두리
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePressed: {
    backgroundColor: '#4CAF50', // 초록색 배경색
  },
});

export {CircleButton};
