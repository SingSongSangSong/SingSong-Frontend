import Slider from '@react-native-community/slider';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CustomSliderProps {
  value: number;
  setValue: (value: number) => void;
  label: string;
}
const CustomSlider: React.FC<CustomSliderProps> = ({
  value,
  setValue,
  label,
}) => {
  return (
    <>
      <Text>
        {label}: {value}
      </Text>
      <View style={styles.sliderContainer}>
        <LinearGradient
          colors={['#d3d3d3', '#000000']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#FFFFFF"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '80%',
    height: 10,
    marginVertical: 25,
    position: 'relative',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export {CustomSlider};
