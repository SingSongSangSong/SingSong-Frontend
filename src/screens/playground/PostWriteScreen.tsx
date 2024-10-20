import React, {useEffect, useLayoutEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {PlaygroundStackParamList} from '../../types';
import CustomText from '../../components/text/CustomText';
import MusicIcon from '../../assets/svg/music.svg';
import usePostWrite from '../../hooks/usePostWrite';
import {logPageView} from '../../utils';
import {PostSongListModule} from '../../components';

const screenHeight = Dimensions.get('window').height;

type PostWriteScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_WRITE
>;

function PostWriteScreen(props: PostWriteScreenProps) {
  const postWriteHandler = usePostWrite({navigation: props.navigation});
  // 네비게이션 옵션 설정

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={postWriteHandler.handleOnPressComplete}>
          <CustomText style={tw`text-white mr-4`}>완료</CustomText>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, postWriteHandler.handleOnPressComplete]);

  return (
    <View style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <ScrollView
        contentContainerStyle={[
          tw`px-4 pt-4 pb-16`,
          {minHeight: screenHeight + 100},
        ]} // 여백 및 추가 height 설정
        showsVerticalScrollIndicator={true}>
        <TextInput
          style={tw`text-white border-b border-[${designatedColor.GRAY5}] pb-2 mb-4 text-[16px]`}
          placeholder="제목"
          placeholderTextColor="gray"
          value={postWriteHandler.title}
          onChangeText={postWriteHandler.setTitle}
        />
        <TextInput
          style={[
            tw`text-white pb-2 mb-10 text-[14px]`,
            {minHeight: 150, textAlignVertical: 'top'},
          ]}
          placeholder="내용을 입력해보세요."
          placeholderTextColor="gray"
          value={postWriteHandler.contents}
          onChangeText={postWriteHandler.setContents}
          multiline
        />
        <PostSongListModule
          onPressSongAddition={postWriteHandler.handleOnPressSongAddition}
        />
      </ScrollView>

      <View
        style={tw`flex-row justify-evenly border border-t-[${designatedColor.GRAY5}] absolute bottom-0 w-full bg-[${designatedColor.BACKGROUND_BLACK}] justify-start`}>
        <TouchableOpacity
          style={tw`flex-row p-3 items-center`}
          onPress={postWriteHandler.handleOnPressSongAddition}>
          <MusicIcon width={20} height={20} />
          <CustomText style={tw`text-[${designatedColor.GRAY1}] ml-2`}>
            플레이리스트 추가
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PostWriteScreen;
