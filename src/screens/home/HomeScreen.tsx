import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import mainNavigations from '../../constants/MainConstants';
import CustomTagButton from '../../components/CustomClickableButton';

type HomeScreenProps = StackScreenProps<
  MainStackParamList,
  typeof mainNavigations.HOME
>;

export default function HomeScreen({navigation}: HomeScreenProps) {
  const tagLst = [
    '고음 지르기',
    '그시절 띵곡',
    '댄스 본능',
    '마무리 1분 노래',
    '음치도 가능',
    '나뺴고 다 E일 때',
    '쉬어가는 노래',
    '헤어졌을 때',
  ];
  const handlePress = (tag: string) => {
    console.log('handlepress is', tag);
    navigation.navigate(mainNavigations.RECOMMENDATION, {tag}); // 'TargetScreen'은 라우팅하려는 페이지 이름입니다.
  };

  return (
    <View>
      <Text> 싱송생송만의 노래 추천을 받아보세요</Text>

      {tagLst.map(tag => (
        <CustomTagButton
          tag={tag}
          color="black"
          onPress={() => handlePress(tag)}
        />
      ))}
    </View>
  );
}
