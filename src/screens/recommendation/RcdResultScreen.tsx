import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import rcdNavigations from '../../constants/RcdConstants';
import {StackScreenProps} from '@react-navigation/stack';
import {Song} from '../../types/songs';
import usePropertyStore from '../../store/usePropertyStore';

type RcdResultScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_RESULT
>;

//결과 나오고 만족하는지, 불만족하는지 나누고 불만족한다면 다시 조건 받을건지, 그냥 새로고침할건지 분기 필요
function RcdResultScreen({route, navigation}: RcdResultScreenProps) {
  const songList = route.params.songs;
  const reset = usePropertyStore(state => state.reset);
  //배열 안에 딕셔너리 형태로 있음
  // console.log(songList);

  const handleResetProperty = () => {
    reset();
    navigation.navigate(rcdNavigations.RCD_HOME);
  };

  const renderItem = ({item}: {item: Song}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.song_name}</Text>
      <Text style={styles.subtitle}>{item.singer_name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>회원님을 위한 추천 노래에요</Text>
      <FlatList
        data={songList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Button
        title="점수 변경"
        onPress={() => navigation.navigate(rcdNavigations.RCD_DETAIL)}></Button>
      <Button title="종료" onPress={handleResetProperty}></Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
});

export default RcdResultScreen;
