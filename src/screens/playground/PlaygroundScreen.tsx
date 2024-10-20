import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import RefreshIcon from '../../assets/svg/refresh.svg';
import {PostList} from '../../components';
import {useFocusEffect} from '@react-navigation/native';
import {logPageView} from '../../utils';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import Popover from 'react-native-popover-view';

type PlaygroundScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND
>;

function PlaygroundScreen(props: PlaygroundScreenProps) {
  const playgroundHandler = usePlayground({navigation: props.navigation});

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // console.log('focus');
      if (playgroundHandler.isFetching) {
        playgroundHandler.focusOnRefresh();
      }
    }, [playgroundHandler.isFetching]),
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const iconRef = useRef(null); // MoreVerticalIcon의 위치를 참조할 ref 생성

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          ref={iconRef}
          onPress={() => {
            setIsVisible(true);
            // console.log('more button clicked');
          }}
          style={tw`px-4`}
          activeOpacity={0.8}>
          <MoreVerticalIcon width={20} height={20} />
        </TouchableOpacity>
      ),
    });
  }, [props.navigation]);

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}] justify-center items-center`,
      ]}>
      <Popover
        isVisible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        from={iconRef} // Popover를 MoreVerticalIcon에서 시작하도록 설정
        arrowSize={{width: 0, height: 0}}
        popoverStyle={{width: 150}}
        // placement="bottom" // 팝업이 아이콘 아래쪽에 위치
        // showArrow={false}
        // arrowStyle={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}
      >
        <View style={tw`bg-[${designatedColor.BACKGROUND_BLACK}]`}>
          <TouchableOpacity
            style={tw`p-4`}
            onPress={() => {
              playgroundHandler.onRefresh();
              setIsVisible(false);
            }}>
            <CustomText style={tw`text-white`}>새로고침</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`p-4`}
            onPress={() => {
              setIsVisible(false);
              playgroundHandler.handleOnPressWritePost();
            }}>
            <CustomText style={tw`text-white`}>글쓰기</CustomText>
          </TouchableOpacity>
        </View>
      </Popover>
      {/* 로딩 중 */}
      {playgroundHandler.isFetchingPosts ? (
        <ActivityIndicator size="large" color={designatedColor.VIOLET} />
      ) : playgroundHandler.postsError ? (
        // 에러 발생 시
        <View style={tw`items-center`}>
          <SangSongIcon width={100} height={100} />
          <CustomText
            style={tw`text-[${designatedColor.GRAY3}] text-[18px] mt-4 font-bold items-center`}>
            게시글을 불러오는 중 오류가 발생했어요.
          </CustomText>
          <CustomText
            style={tw`text-[${designatedColor.GRAY3}] text-[18px] mt-4 mb-12 font-bold items-center`}>
            다시 시도해주세요
          </CustomText>
        </View>
      ) : playgroundHandler.posts && playgroundHandler.posts.length > 0 ? (
        // 게시글이 있는 경우
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
      ) : playgroundHandler.isLengthZero ? (
        // 게시글이 없는 경우
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
          <TouchableOpacity
            onPress={playgroundHandler.focusOnRefresh}
            style={tw`bg-[${designatedColor.WHITE}] pl-4 pr-5 py-2 rounded-full mt-5`}
            activeOpacity={0.9}>
            <View style={tw`flex-row items-center`}>
              {/* <PencilIcon width={20} height={20} /> */}
              <RefreshIcon width={12} height={12} />
              <CustomText style={tw`text-[${designatedColor.VIOLET}] ml-1`}>
                새로고침
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

export default PlaygroundScreen;
