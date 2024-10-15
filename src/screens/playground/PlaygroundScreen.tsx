import React, {useCallback} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import usePlayground from '../../hooks/usePlayground';
import {StackScreenProps} from '@react-navigation/stack';
import {PlaygroundStackParamList} from '../../types';
import CustomText from '../../components/text/CustomText';
import SangSongIcon from '../../assets/svg/sangsong2.svg';
// import SearchIcon from '../../assets/svg/search.svg';
import PencilIcon from '../../assets/svg/pencil.svg';
import {PostList} from '../../components';
import {useFocusEffect} from '@react-navigation/native';

type PlaygroundScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND
>;

function PlaygroundScreen(props: PlaygroundScreenProps) {
  const playgroundHandler = usePlayground({navigation: props.navigation});

  useFocusEffect(
    useCallback(() => {
      playgroundHandler.focusOnRefresh();
    }, []),
  );

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] justify-center items-center`,
      ]}>
      {playgroundHandler.isFetchingPosts ? (
        <View>
          <ActivityIndicator size="large" color={designatedColor.VIOLET} />
        </View>
      ) : playgroundHandler.postsError ? (
        <View style={tw`items-center`}>
          <SangSongIcon width={100} height={100} />
          <CustomText
            style={tw`text-[${designatedColor.GRAY3}] text-[18px] mt-4 mb-12 font-bold`}>
            게시글을 불러오는 중 오류가 발생했어요. 다시 시도해주세요
          </CustomText>
        </View>
      ) : playgroundHandler.tempPosts?.posts &&
        playgroundHandler.tempPosts.posts.length > 0 ? (
        <>
          <View style={tw`flex-1 w-full`}>
            <PostList
              posts={playgroundHandler.posts!}
              handleOnPressPost={playgroundHandler.handleOnPressPost}
              handleRefreshPost={playgroundHandler.handleDownRefreshPosts}
              onRefresh={playgroundHandler.onRefresh}
              isLoading={playgroundHandler.isLoading}
              refreshing={playgroundHandler.refreshing}
            />
          </View>
          <TouchableOpacity
            onPress={playgroundHandler.handleOnPressWritePost}
            style={[
              tw`bg-[${designatedColor.VIOLET}] pl-4 pr-5 py-2 rounded-full`,
              tw`absolute bottom-4`,
            ]}
            activeOpacity={0.9}>
            <View style={tw`flex-row items-center`}>
              <PencilIcon width={20} height={20} />
              <CustomText style={tw`text-[${designatedColor.WHITE}] ml-1`}>
                글쓰기
              </CustomText>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={tw`items-center mt-4 mb-12`}>
          <SangSongIcon width={100} height={100} />
          <CustomText
            style={tw`text-[${designatedColor.GRAY3}] text-[18px] font-bold mt-2`}>
            아직 작성된 게시글이 없어요
          </CustomText>
          <TouchableOpacity
            onPress={playgroundHandler.handleOnPressWritePost}
            style={tw`bg-[${designatedColor.VIOLET}] pl-4 pr-5 py-2 rounded-full mt-5`}
            activeOpacity={0.9}>
            <View style={tw`flex-row items-center`}>
              <PencilIcon width={20} height={20} />
              <CustomText style={tw`text-[${designatedColor.WHITE}] ml-1`}>
                글쓰기
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default PlaygroundScreen;
