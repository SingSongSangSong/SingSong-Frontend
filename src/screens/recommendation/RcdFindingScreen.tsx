import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import rcdNavigations from '../../constants/RcdConstants';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import getSongs from '../../api/recommend';
import getTags from '../../api/tag';
import tw from 'twrnc';

type RcdFindingScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_FINDING
>;

// 여기에서 백엔드에서 요청 보내고 결과 나오면 다음 페이지로 이동
function RcdFindingScreen({route, navigation}: RcdFindingScreenProps) {
  const props = route.params.props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 백엔드 요청 및 3초 딜레이를 동시에 처리
        const [songData, tagData] = await Promise.all([
          getSongs(props),
          getTags(props),
          new Promise(resolve => setTimeout(resolve, 1500)),
        ]);

        navigation.navigate(rcdNavigations.RCD_RESULT, {
          songs: songData.songs,
          tags: tagData.tags,
        });
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData();
  }, [navigation, props]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`font-bold text-[5] pb-10`}>
        맞춤 노래를 분석 중이에요
      </Text>
      <ActivityIndicator size="small" color="black" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default RcdFindingScreen;
