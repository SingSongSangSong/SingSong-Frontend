import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {SafeAreaView} from 'react-native';
import useSongStore from '../../store/useSongStore';
import {TagDetailList} from '../../components';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type TagDetailScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.TAG_DETAIL
>;

function TagDetailScreen(props: TagDetailScreenProps) {
  const tags = useSongStore(state => state.tags);

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const handleOnArrowPress = (tag: string) => {
    logButtonClick('tagList_tag_button_click');
    amplitude.track('tagList_tag_button_click');
    props.navigation.push(homeStackNavigations.RCD_DETAIL, {tag});
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <TagDetailList tags={tags} onPress={handleOnArrowPress} />
    </SafeAreaView>
  );
}

export default TagDetailScreen;
