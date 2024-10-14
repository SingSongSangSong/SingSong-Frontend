import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {PlaygroundStackParamList} from '../../types';
import CustomText from '../../components/text/CustomText';
import SangSongIcon from '../../assets/svg/sangsong2.svg';
// import SearchIcon from '../../assets/svg/search.svg';
import PencilIcon from '../../assets/svg/pencil.svg';
import {PostList} from '../../components';

type PostDetailScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_DETAIL
>;

function PostDetailScreen(props: PostDetailScreenProps) {
  //   const playgroundHandler = usePlayground({navigation: props.navigation});

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] justify-center items-center`,
        // {
        //   paddingTop: insets.top,
        //   paddingBottom: insets.bottom,
        //   paddingLeft: insets.left,
        //   paddingRight: insets.right,
        // },
      ]}>
      <CustomText>PostDetailScreen</CustomText>
    </View>
  );
}

export default PostDetailScreen;
