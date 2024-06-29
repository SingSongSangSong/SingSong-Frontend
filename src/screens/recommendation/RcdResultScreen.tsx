import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import rcdNavigations from '../../constants/RcdConstants';
import {StackScreenProps} from '@react-navigation/stack';
import {Song} from '../../types/songs';
import usePropertyStore from '../../store/usePropertyStore';
import tw from 'twrnc';
import CustomTag from '../../components/CustomTag';
import CustomButton from '../../components/CustomButton';

type RcdResultScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_RESULT
>;

//결과 나오고 만족하는지, 불만족하는지 나누고 불만족한다면 다시 조건 받을건지, 그냥 새로고침할건지 분기 필요
function RcdResultScreen({route, navigation}: RcdResultScreenProps) {
  const songList = route.params.songs;
  const tagList = route.params.tags;
  const reset = usePropertyStore(state => state.reset);

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
      <View style={tw`flex-row flex-wrap items-center justify-center`}>
        <Text style={tw`font-bold text-[4]`}>회원님을 위한</Text>
        {tagList.map((tag, index) => (
          <CustomTag tag={tag} index={index} />
        ))}
        <Text style={tw`font-bold text-[4]`}>노래 리스트에요</Text>
      </View>

      <FlatList
        data={songList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <View style={tw`flex-row justify-center items-center mt-4 mb-4`}>
        <CustomButton
          title="점수 변경"
          onPress={() => navigation.navigate(rcdNavigations.RCD_DETAIL)}
          width={100}
        />
        <CustomButton title="종료" onPress={handleResetProperty} width={100} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderColor: 'black', // 테두리 색깔
    borderWidth: 1, // 테두리 두께
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 10,
    color: '#555',
  },
});

export default RcdResultScreen;
