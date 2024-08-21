import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import {SafeAreaView} from 'react-native';
import useSongStore from '../../store/useSongStore';
import {TagDetailList} from '../../components';
import {useRoute} from '@react-navigation/native';
import {logButtonClick, logNavigationClick, logScreenView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type TagDetailScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.TAG_DETAIL
>;

function TagDetailScreen({navigation}: TagDetailScreenProps) {
  const route = useRoute();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('route name', route.name);
      logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
    });

    return unsubscribe;
  }, [navigation, route]);

  // const {tags} = useSongStore();
  const tags = useSongStore(state => state.tags);

  const handleOnArrowPress = (tag: string) => {
    logButtonClick('from_tagList_tag_button');
    logNavigationClick(route.name, homeStackNavigations.RCD_DETAIL);
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
