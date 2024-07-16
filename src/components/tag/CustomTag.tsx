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
    marginHorizontal: 2,
    marginVertical: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center', // 수평 방향으로 중앙 정렬
    justifyContent: 'center', // 수직 방향으로 중앙 정렬
  },
  tagText: {
    color: 'black',
    fontSize: 8,
    fontWeight: 'bold',
  },
});

export {CustomTag};
