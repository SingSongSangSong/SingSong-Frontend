import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import CustomText from '../text/CustomText';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style: 'filled' | 'outlined';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  style = 'filled',
}) => {
  return (
    <Pressable style={[styles.container, styles[style]]} onPress={onPress}>
      <CustomText style={styles[`${style}Text`]}>{title}</CustomText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  filled: {
    backgroundColor: 'black',
  },
  outlined: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  filledText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outlinedText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export {CustomButton};
