import {Pressable, StyleSheet, Text} from 'react-native';
import React from 'react';

interface CustomButtonProps {
  label: string;
  variant: 'filled' | 'outlined';
}

export default function CustomButton({label, variant}: CustomButtonProps) {
  return (
    <Pressable style={[styles.container, styles[variant]]}>
      <Text>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  outlined: {
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});
