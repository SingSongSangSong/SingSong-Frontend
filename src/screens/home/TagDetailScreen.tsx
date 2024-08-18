import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import {SafeAreaView} from 'react-native';
import useSongStore from '../../store/useSongStore';
import {TagDetailList} from '../../components';

type TagDetailScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.TAG_DETAIL
>;

function TagDetailScreen({navigation}: TagDetailScreenProps) {
  // const {tags} = useSongStore();
  const tags = useSongStore(state => state.tags);

  const handleOnArrowPress = (tag: string) => {
    navigation.navigate(homeStackNavigations.RCD_DETAIL, {tag});
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <TagDetailList tags={tags} onPress={handleOnArrowPress} />
    </SafeAreaView>
  );
}

export default TagDetailScreen;
