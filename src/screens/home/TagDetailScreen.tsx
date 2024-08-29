import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import {SafeAreaView} from 'react-native';
import useSongStore from '../../store/useSongStore';
import {TagDetailList} from '../../components';
import {logButtonClick} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type TagDetailScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.TAG_DETAIL
>;

function TagDetailScreen({navigation}: TagDetailScreenProps) {
  const tags = useSongStore(state => state.tags);

  const handleOnArrowPress = (tag: string) => {
    logButtonClick('tagList_tag_button_click');
    amplitude.track('Tag Press in Tag Detail');
    navigation.push(homeStackNavigations.RCD_DETAIL, {tag});
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <TagDetailList tags={tags} onPress={handleOnArrowPress} />
    </SafeAreaView>
  );
}

export default TagDetailScreen;
