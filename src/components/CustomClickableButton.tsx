import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface CustomTagButtonProps {
  tag: string;
  color: string;
  onPress: () => void;
}

const CustomTagButton: React.FC<CustomTagButtonProps> = ({tag, onPress}) => {
  return (
    <Pressable style={[styles.container]} onPress={onPress}>
      <Text>{tag}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default CustomTagButton;
