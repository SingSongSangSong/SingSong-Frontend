// import React from 'react';
// import {Pressable, Text, StyleSheet} from 'react-native';

// interface CustomButtonProps {
//   title: string;
//   onPress: () => void;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({title, onPress}) => {
//   return (
//     <Pressable style={styles.container} onPress={onPress}>
//       <Text style={styles.title}>{title}</Text>
//     </Pressable>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'black',
//     borderWidth: 2,
//     borderColor: 'white',
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 200,
//     marginHorizontal: 50,
//     marginVertical: 10,
//   },
//   title: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  width: number; // width를 선택적으로 받도록 설정
}

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, width}) => {
  return (
    <Pressable style={[styles.container, {width}]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
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

export default CustomButton;
