import React, {useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {GetSearchSong, HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  OutlineButton,
  SearchInput,
  SearchRecent,
  SearchResult,
} from '../../components';
import getSearch from '../../api/search/getSearch';
import useSearchRecentStore from '../../store/useSearchRecentStore';

type SearchScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.SEARCH
>;

function SearchScreen({navigation}: SearchScreenProps) {
  const [inputText, setInputText] = useState<string>('');
  const [searchData, setSearchData] = useState<GetSearchSong>();
  const [showSearchResult, setShowSearchResult] = useState<boolean>(true); // 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addSearchRecent = useSearchRecentStore(state => state.addSearchRecent);

  const inputRef = useRef<TextInput>(null);

  const handleOnGoBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const handleOnPressRecent = (searchText: string) => {
    setInputText(searchText);
    inputRef.current?.focus();
    // setShowSearchResult(true); // 최근 검색어를 누르면 검색 결과가 다시 보이게 설정
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    const currentDate = new Date().toISOString();
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
    <SafeAreaView style={tw`flex-1 bg-black`}>
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
              <ActivityIndicator size="large" color="white" />
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
              <Text style={tw`text-[${designatedColor.GRAY2}] mt-2 mb-6`}>
                원하는 노래가 없으신가요?
              </Text>
              <OutlineButton
                title="새로운 노래 신청"
                onPress={() => {}}
                color={designatedColor.PINK2}
              />
            </View>
          </View>
        ) : (
          <SearchResult searchData={searchData} navigation={navigation} />
        ))}
    </SafeAreaView>
  );
}

export default SearchScreen;
