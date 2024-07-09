import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface CustomTagProps {
  tag: string;
  index: number;
}

const colors = ['#FFD1DC', '#C6F7F7', '#DFFFD6', '#E9D4EF', '#FFFFE0'];

const CustomTag: React.FC<CustomTagProps> = ({tag, index}) => {
  return (
    <View
      key={index}
      style={[
        styles.tagContainer,
        {backgroundColor: colors[index % colors.length]},
      ]}>
      <Text style={styles.tagText}>{tag}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  tagText: {
    color: 'black',
    fontSize: 10,
  },
});

export default CustomTag;
