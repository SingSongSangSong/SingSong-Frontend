import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import rcdNavigations from '../../constants/RcdConstants';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import getSongs from '../../api/recommend';

type RcdFindingScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_FINDING
>;

// 여기에서 백엔드에서 요청 보내고 결과 나오면 다음 페이지로 이동
function RcdFindingScreen({route, navigation}: RcdFindingScreenProps) {
  const params = route.params.props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 백엔드 요청 및 3초 딜레이를 동시에 처리
        const [data] = await Promise.all([
          getSongs(params),
          new Promise(resolve => setTimeout(resolve, 3000)),
        ]);

        console.log(data);
        navigation.navigate(rcdNavigations.RCD_RESULT, {songs: data.songs});
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, [navigation]);

  // const handleShowResult = () => {
  //   navigation.navigate(rcdNavigations.RCD_RESULT);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text>맞춤 노래를 분석 중이에요</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    margin: '10%',
  },
});

export default RcdFindingScreen;
