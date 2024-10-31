import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {GetSearchSong, SearchStackParamList} from '../../types';
import {designatedColor, searchStackNavigations} from '../../constants';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SearchInput, SearchRecent, SearchResult} from '../../components';
import getSearch from '../../api/search/getSearch';
import useSearchRecentStore from '../../store/useSearchRecentStore';
import {logButtonClick, logPageView, logTrack} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import Toast from 'react-native-toast-message';
import deleteKeep from '../../api/keep/deleteKeep';
import getKeepV2 from '../../api/keep/getKeepV2';
import useKeepV2Store from '../../store/useKeepV2Store';
import postKeep from '../../api/keep/postKeep';
import {useFocusEffect} from '@react-navigation/native';
// import {useFocusEffect} from '@react-navigation/native';

type SearchFocusScreenProps = StackScreenProps<
  SearchStackParamList,
  typeof searchStackNavigations.SEARCH_FOCUSED
>;

function SearchFocusScreen(props: SearchFocusScreenProps) {
  const [inputText, setInputText] = useState<string>('');
  const [searchData, setSearchData] = useState<GetSearchSong>();
  const [showSearchResult, setShowSearchResult] = useState<boolean>(true); // 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addSearchRecent = useSearchRecentStore(state => state.addSearchRecent);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);
  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);

  useEffect(() => {
    logPageView(props.route.name);

    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100); // 100ms 딜레이 추가

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  //   useFocusEffect(

  //   );

  // useFocusEffect(
  //   useCallback(() => {
  //     // 특정 화면에서 포커스될 때 탭 바를 강제로 보이도록 설정
  //     props.navigation
  //       .getParent()
  //       ?.setOptions({tabBarStyle: {display: 'flex'}});
  //   }, [props.navigation]),
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     props.navigation.getParent()?.setOptions({tabBarVisible: true});
  //   }, []),
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     // 화면이 포커스될 때 tabBarHideOnKeyboard를 false로 설정
  //     Keyboard.dismiss();

  //     // 화면이 벗어날 때는 기본값으로 복원
  //   }, []),
  // );

  const inputRef = useRef<TextInput>(null);

  const handleOnGoBack = () => {
    Keyboard.dismiss();
    props.navigation.goBack();
  };

  const handleOnPressRecent = (searchText: string) => {
    amplitude.track('recent_search_button_click');
    logButtonClick('recent_search_button_click');
    setInputText(searchText);
    inputRef.current?.focus();
  };

  const handleOnSubmit = async () => {
    if (inputText.trim() == '') {
      Toast.show({
        type: 'selectedToast',
        text1: '검색어를 입력해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }
    setIsLoading(true);
    const currentDate = new Date().toISOString();
    addSearchRecent({recentText: inputText, date: currentDate});
    const tempSearchData = await getSearch(inputText);
    setSearchData(tempSearchData.data);
    setIsLoading(false);
    logTrack('search_submit_button_click');
    setShowSearchResult(true); // 검색을 실행하면 검색 결과를 표시
  };

  const handleInputFocus = () => {
    setShowSearchResult(false); // 입력창에 포커스가 맞춰지면 검색 결과 숨기기
  };

  const isAllKeysEmpty = (searchData: GetSearchSong) => {
    return Object.values(searchData).every(list => list.length === 0);
  };

  const handleOnKeepAddPress = async (songId: number) => {
    amplitude.track('search_result_keep_button_click');
    logButtonClick('search_result_keep_button_click');
    // const tempKeepList = await postKeep([songId]);
    // setKeepList(tempKeepList.data);

    postKeep([songId])
      .then(() => getKeepV2(selectedFilter, -1, 20)) // postKeep 후 getKeep 호출
      .then(tempData => {
        setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
        setLastCursor(tempData.data.lastCursor);
        setIsEnded(false);
      })
      .catch(error => {
        console.error('Error updating keep list:', error);
      });

    Toast.show({
      type: 'selectedToast',
      text1: '보관함에 추가되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const handleOnKeepRemovePress = async (songId: number) => {
    // await deleteKeep([songId]);
    // const tempKeepList = await deleteKeep([songId]);
    // setKeepList(tempKeepList.data);
    deleteKeep([songId])
      .then(() => getKeepV2(selectedFilter, -1, 20)) // deleteKeep 후 getKeep 호출
      .then(tempData => {
        setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
        setLastCursor(tempData.data.lastCursor);
        setIsEnded(false);
      })
      .catch(error => {
        console.error('Error updating keep list:', error);
      });
    Toast.show({
      type: 'selectedToast',
      text1: '보관함에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <SearchInput
        inputText={inputText}
        setInputText={setInputText}
        handleOnPressBack={handleOnGoBack}
        handleOnSubmit={handleOnSubmit}
        handleInputFocus={handleInputFocus} // 입력창에 포커스가 맞춰지면 호출
        inputRef={inputRef}
      />
      {inputText === '' ? (
        <View style={tw`flex-1`}>
          <SearchRecent onPressRecent={handleOnPressRecent} />
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
              <Text style={tw`text-[${designatedColor.GRAY2}]`}>
                검색 결과가 없습니다.
              </Text>
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
          <SearchResult
            inputText={inputText}
            searchData={searchData}
            navigation={props.navigation}
            handleOnKeepAddPress={handleOnKeepAddPress}
            handleOnKeepRemovePress={handleOnKeepRemovePress}
          />
        ))}
    </SafeAreaView>
  );
}

export default SearchFocusScreen;
