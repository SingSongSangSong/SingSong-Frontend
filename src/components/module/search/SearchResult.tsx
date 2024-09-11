import React, {useState} from 'react';
import {GetDetailSearchSongResponse, GetSearchSong, Song} from '../../../types';
import {OutlineButton, SongsList} from '../..';
import {designatedColor, homeStackNavigations} from '../../../constants';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import {logButtonClick} from '../../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import getSearchArtistName from '../../../api/search/getSearchArtistName';
import getSearchSongNumber from '../../../api/search/getSearchSongNumber';
import getSearchSongName from '../../../api/search/getSearchSongName';

type SearchResultProps = {
  inputText: string;
  searchData: GetSearchSong;
  navigation: any;
};

const categories = [
  {title: '전체', value: 'all'},
  {title: '노래제목', value: 'songName'},
  {title: '가수이름', value: 'artistName'},
  {title: '노래방번호', value: 'songNumber'},
];

const SearchResult = ({
  inputText,
  searchData,
  navigation,
}: SearchResultProps) => {
  const [category, setCategory] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [selectedDetailData, setSelectedDetailData] = useState<Song[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    isMr: boolean,
  ) => {
    logButtonClick('search_result_song_button_click');
    amplitude.track('search_result_song_button_click');
    navigation.push(homeStackNavigations.SONG_DETAIL, {
      songId,
      songNumber,
      songName,
      singerName,
      album,
      isMr,
    });
  };

  const renderHeader = () => (
    <View style={tw`flex-row my-2 mx-1`}>
      {categories
        .filter(
          categoryItem =>
            categoryItem.value === 'all' || // "전체" 카테고리는 항상 표시
            (searchData[categoryItem.value as keyof GetSearchSong] || [])
              .length > 0, // 해당 카테고리에 데이터가 있을 때만 표시
        )
        .map(categoryItem => (
          <View key={categoryItem.value} style={tw`mx-1`}>
            <OutlineButton
              title={categoryItem.title}
              onPress={() => {
                // setCategory(categoryItem.value);
                onTotalPress(categoryItem.value);
              }}
              color={
                category === categoryItem.value
                  ? designatedColor.PINK
                  : designatedColor.GRAY3
              }
            />
          </View>
        ))}
    </View>
  );

  const functions: {
    [key: string]: (
      searchKeyword: string,
      page: number,
      size: number,
    ) => Promise<GetDetailSearchSongResponse>;
  } = {
    artistName: getSearchArtistName,
    songNumber: getSearchSongNumber,
    songName: getSearchSongName,
  };

  const onTotalPress = async (value: string) => {
    setIsEnd(false);
    if (value != 'all') {
      setCategory(value);
      setIsLoading(true);
      console.log('value', value);
      const tempData = await functions[value](inputText, 1, 20); //누르면 그냥 1로 페이지 초기화
      setSelectedDetailData(tempData.data.songs);
      setPage(tempData.data.nextPage);
      setIsLoading(false);
      return;
    } else {
      setCategory(value);
      return;
    }
  };

  const renderItem = ({item}: {item: [string, Song[]]}) => {
    const [key, songs] = item;
    if (songs.length === 0) {
      return null;
    }

    const title = categories.find(c => c.value === key)?.title;
    const value = categories.find(c => c.value === key)?.value;

    return (
      <View key={key} style={tw`my-4`}>
        {category === 'all' && (
          <View style={tw`flex-row justify-between items-center my-2 px-2`}>
            <Text style={tw`text-[${designatedColor.PINK}]`}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                onTotalPress(value!);
              }}>
              <Text
                style={tw`text-[${designatedColor.GRAY3}] text-3 px-2 py-2`}>
                전체보기
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <SongsList
          songlistData={songs}
          isShowKeepIcon={false}
          onSongPress={_onSongPress}
        />
      </View>
    );
  };

  const handleRefreshSearchSongs = async () => {
    if (isMoreLoading || isEnd) {
      return;
    }
    try {
      setIsMoreLoading(true);
      if (selectedDetailData && selectedDetailData.length >= 20) {
        const tempData = await functions[category](inputText, page, 20); //누르면 그냥 1로 페이지 초기화
        setSelectedDetailData(prev => [
          ...(prev || []),
          ...tempData.data.songs,
        ]);
        setPage(tempData.data.nextPage);
        if (tempData.data.songs.length === 0) {
          setIsEnd(true);
        }
        setIsMoreLoading(false);
      } else {
        setIsMoreLoading(false);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
      setIsMoreLoading(false);
    }
  };

  // const selectedCategoryData =
  //   searchData[category as keyof GetSearchSong] || [];

  return (
    <View style={tw`flex-1`}>
      {/* 고정된 헤더 */}
      <View
        style={tw`absolute top-0 left-0 right-0 z-10 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
        {renderHeader()}
      </View>
      {category === 'all' ? (
        <FlatList
          data={Object.entries(searchData).filter(
            ([, songs]) => songs.length > 0,
          )}
          renderItem={renderItem}
          keyExtractor={item => item[0]}
          contentContainerStyle={tw`pt-12 pb-4`} // pt-12로 고정된 헤더의 높이만큼 패딩 추가
        />
      ) : isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color={designatedColor.PINK2} />
        </View>
      ) : (
        <FlatList
          data={[[category, selectedDetailData!]]}
          renderItem={renderItem}
          keyExtractor={item => item[0]}
          contentContainerStyle={tw`pt-12 pb-4`} // pt-12로 고정된 헤더의 높이만큼 패딩 추가
          onEndReached={handleRefreshSearchSongs}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isMoreLoading ? (
              <View style={tw`py-10`}>
                <ActivityIndicator size="large" color={designatedColor.PINK2} />
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

export {SearchResult};
