import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import rcdNavigations from '../../constants/RcdConstants';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import usePropertyStore from '../../store/usePropertyStore';
import CustomButton from '../../components/CustomButton';
import tw from 'twrnc';
import CustomSlider from '../../components/CustomSlider';

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
      <Text style={tw`font-bold text-[4] pb-10`}>
        분야별 나의 맞춤 점수를 조절해주세요
      </Text>
      <CustomSlider
        value={tempEnergy}
        setValue={setTempEnergy}
        label="에너지"
      />
      <CustomSlider
        value={tempElectronic}
        setValue={setTempElectronic}
        label="어쿠스틱"
      />
      <CustomSlider
        value={tempBrightness}
        setValue={setTempBrightness}
        label="밝음"
      />
      <CustomSlider value={tempSpeed} setValue={setTempSpeed} label="스피드" />
      <CustomSlider
        value={tempDanceability}
        setValue={setTempDanceability}
        label="댄스"
      />

      <CustomButton title="NEXT" onPress={handleFindResult} width={100} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  slider: {
    width: '80%',
    height: 40,
    marginVertical: 16,
  },
});
export default RcdDetailScreen;
