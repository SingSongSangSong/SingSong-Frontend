import React, {useState} from 'react';
import {GetSearchSong} from '../../../types';
import {OutlineButton, SongsList} from '../..';
import {designatedColor, homeStackNavigations} from '../../../constants';
import {View, Text, FlatList} from 'react-native';
import tw from 'twrnc';
import {logButtonClick, logNavigationClick} from '../../../utils';
import {useRoute} from '@react-navigation/native';

type SearchResultProps = {
  searchData: GetSearchSong;
  navigation: any;
};

const categories = [
  {title: '전체', value: 'all'},
  {title: '노래방번호', value: 'songNumber'},
  {title: '가수이름', value: 'artistName'},
  {title: '노래제목', value: 'songName'},
];

const SearchResult = ({searchData, navigation}: SearchResultProps) => {
  const [category, setCategory] = useState<string>('all');
  const route = useRoute();

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    logButtonClick('search_result_song_button');
    logNavigationClick(route.name, homeStackNavigations.SONG_DETAIL);
    navigation.push(homeStackNavigations.SONG_DETAIL, {
      songId,
      songNumber,
      songName,
      singerName,
      album,
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
                setCategory(categoryItem.value);
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

  const renderItem = ({item}: {item: [string, any[]]}) => {
    const [key, songs] = item;
    if (songs.length === 0) {
      return null;
    }

    return (
      <View key={key} style={tw`mb-4`}>
        {category === 'all' && (
          <Text style={tw`text-[${designatedColor.PINK}] mx-4 my-4`}>
            {categories.find(c => c.value === key)?.title}
          </Text>
        )}
        <SongsList
          songlistData={songs}
          isShowKeepIcon={false}
          onSongPress={_onSongPress}
        />
      </View>
    );
  };

  const selectedCategoryData =
    searchData[category as keyof GetSearchSong] || [];

  return (
    <View style={tw`flex-1`}>
      {/* 고정된 헤더 */}
      <View style={tw`absolute top-0 left-0 right-0 z-10 bg-black`}>
        {renderHeader()}
      </View>

      {/* 스크롤 가능한 리스트 */}
      {category === 'all' ? (
        <FlatList
          data={Object.entries(searchData).filter(
            ([, songs]) => songs.length > 0,
          )}
          renderItem={renderItem}
          keyExtractor={item => item[0]}
          contentContainerStyle={tw`pt-12 pb-4`} // pt-12로 고정된 헤더의 높이만큼 패딩 추가
        />
      ) : selectedCategoryData.length === 0 ? (
        <View style={tw`flex-1 justify-center items-center pt-12`}>
          <Text style={tw`text-[${designatedColor.GRAY2}]`}>
            검색 결과가 없어요.
          </Text>
        </View>
      ) : (
        <FlatList
          data={[[category, selectedCategoryData]]}
          renderItem={renderItem}
          keyExtractor={item => item[0]}
          contentContainerStyle={tw`pt-12 pb-4`} // pt-12로 고정된 헤더의 높이만큼 패딩 추가
        />
      )}
    </View>
  );
};

export {SearchResult};
