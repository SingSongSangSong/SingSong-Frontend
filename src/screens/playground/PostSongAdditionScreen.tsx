import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {GetSearchSong, PlaygroundStackParamList} from '../../types';
import CustomText from '../../components/text/CustomText';
import {logButtonClick, logPageView, logTrack} from '../../utils';
import usePostSongAddition from '../../hooks/usePostSongAddition';
import useSearchRecentStore from '../../store/useSearchRecentStore';
import getSearch from '../../api/search/getSearch';
import {
  SearchInputForPostSong,
  SearchKeep,
  SearchResultForPostSong,
} from '../../components';
import Toast from 'react-native-toast-message';

// const screenHeight = Dimensions.get('window').height;

type PostSongAdditionScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_SONG_ADDITION
>;

function PostSongAdditionScreen(props: PostSongAdditionScreenProps) {
  const postSongAdditionHandler = usePostSongAddition({
    navigation: props.navigation,
  });
  // 네비게이션 옵션 설정

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            onPress={postSongAdditionHandler.handleOnPressCancel}>
            <CustomText style={tw`text-[${designatedColor.GRAY1}] ml-4`}>
              취소
            </CustomText>
          </TouchableOpacity>
        );
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={postSongAdditionHandler.handleOnPressComplete}
          disabled={postSongAdditionHandler.postSongIds.length === 0}>
          <View style={tw`flex-row items-center justify-center`}>
            {postSongAdditionHandler.postSongIds.length !== 0 && (
              <View
                style={[
                  tw`border border-[${designatedColor.VIOLET3}] rounded-full mr-2`,
                  {
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <CustomText
                  style={tw`text-[${designatedColor.VIOLET3}] text-[10px]`}>
                  {postSongAdditionHandler.postSongIds.length}
                </CustomText>
              </View>
            )}

            <CustomText
              style={[
                tw`mr-4`,
                postSongAdditionHandler.postSongIds.length === 0
                  ? tw`text-[${designatedColor.GRAY1}]` // 비활성화 상태일 때 색상
                  : tw`text-[${designatedColor.WHITE}]`, // 활성화 상태일 때 색상
              ]}>
              완료
            </CustomText>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [props.navigation, postSongAdditionHandler.postSongIds.length]);

  const [inputText, setInputText] = useState<string>('');
  const [searchData, setSearchData] = useState<GetSearchSong>();
  const [showSearchResult, setShowSearchResult] = useState<boolean>(true); // 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addSearchRecent = useSearchRecentStore(state => state.addSearchRecent);

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const inputRef = useRef<TextInput>(null);

  const handleOnGoBack = () => {
    Keyboard.dismiss();
    props.navigation.goBack();
  };

  const handleOnPressRecent = (searchText: string) => {
    logTrack('recent_search_button_click');
    logButtonClick('recent_search_button_click');
    setInputText(searchText);
    inputRef.current?.focus();
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    const currentDate = new Date().toISOString();
    if (inputText.trim() == '') {
      Toast.show({
        type: 'selectedToast',
        text1: '검색어를 입력해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }
    addSearchRecent({recentText: inputText, date: currentDate});
    const tempSearchData = await getSearch(inputText);
    setSearchData(tempSearchData.data);
    setIsLoading(false);
    setShowSearchResult(true); // 검색을 실행하면 검색 결과를 표시
  };

  const handleInputFocus = () => {
    setShowSearchResult(false); // 입력창에 포커스가 맞춰지면 검색 결과 숨기기
  };

  const isAllKeysEmpty = (searchData: GetSearchSong) => {
    return Object.values(searchData).every(list => list.length === 0);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <SearchInputForPostSong
        inputText={inputText}
        setInputText={setInputText}
        handleOnPressBack={handleOnGoBack}
        handleOnSubmit={handleOnSubmit}
        handleInputFocus={handleInputFocus} // 입력창에 포커스가 맞춰지면 호출
        inputRef={inputRef}
      />
      {inputText === '' ? (
        <View style={tw`flex-1 w-full`}>
          <SearchKeep onPressRecent={handleOnPressRecent} />
        </View>
      ) : (
        <>
          {isLoading ? (
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size="large" color={designatedColor.VIOLET} />
            </View>
          ) : (
            <View />
          )}
        </>
      )}
      {inputText != '' &&
        searchData &&
        showSearchResult && // 검색 결과를 조건부로 렌더링
        (isAllKeysEmpty(searchData) ? ( // isEmptyObject 대신 isAllKeysEmpty 사용
          <View style={tw`flex-1 justify-center items-center`}>
            <View style={tw`justify-center items-center pb-20`}>
              <CustomText style={tw`text-[${designatedColor.GRAY2}]`}>
                검색 결과가 없습니다.
              </CustomText>
              {/* <Text style={tw`text-[${designatedColor.GRAY2}] mt-2 mb-6`}>
                원하는 노래가 없으신가요?
              </Text>
              <OutlineButton
                title="새로운 노래 신청"
                onPress={() => {}}
                color={designatedColor.PINK2}
              /> */}
            </View>
          </View>
        ) : (
          <SearchResultForPostSong
            inputText={inputText}
            searchData={searchData}
            navigation={props.navigation}
          />
        ))}
    </SafeAreaView>
  );
}

export default PostSongAdditionScreen;
