import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import rcdNavigations from '../../constants/RcdConstants';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import usePropertyStore from '../../store/usePropertyStore';
import Slider from '@react-native-community/slider';

type RcdDetailScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_DETAIL
>;

function RcdDetailScreen({navigation}: RcdDetailScreenProps) {
  const {
    energy,
    electronic,
    brightness,
    speed,
    danceability,
    setEnergy,
    setElectronic,
    setBrightness,
    setSpeed,
    setDanceability,
  } = usePropertyStore();

  const [tempEnergy, setTempEnergy] = useState(energy);
  const [tempElectronic, setTempElectronic] = useState(electronic);
  const [tempBrightness, setTempBrightness] = useState(brightness);
  const [tempSpeed, setTempSpeed] = useState(speed);
  const [tempDanceability, setTempDanceability] = useState(danceability);

  const handleFindResult = () => {
    setEnergy(tempEnergy);
    setElectronic(tempElectronic);
    setBrightness(tempBrightness);
    setSpeed(tempSpeed);
    setDanceability(tempDanceability);
    navigation.navigate(rcdNavigations.RCD_FINDING, {
      props: {
        energy: tempEnergy,
        electronic: tempElectronic,
        brightness: tempBrightness,
        speed: tempSpeed,
        danceability: tempDanceability,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>분야별 나의 맞춤 점수를 조절해주세요</Text>
      <Text>Energy: {tempEnergy}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={tempEnergy}
        onValueChange={setTempEnergy}
      />
      <Text>Electronic: {tempElectronic}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={tempElectronic}
        onValueChange={setTempElectronic}
      />
      <Text>Brightness: {tempBrightness}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={tempBrightness}
        onValueChange={setTempBrightness}
      />
      <Text>Speed: {tempSpeed}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={tempSpeed}
        onValueChange={setTempSpeed}
      />
      <Text>Danceability: {tempDanceability}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={tempDanceability}
        onValueChange={setTempDanceability}
      />

      <Button title="다음" onPress={handleFindResult}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  slider: {
    width: '80%',
    height: 40,
    marginVertical: 16,
  },
});
export default RcdDetailScreen;
