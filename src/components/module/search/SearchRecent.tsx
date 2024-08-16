import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import {SearchRecentList} from '../..';
import useSearchRecentStore from '../../../store/useSearchRecentStore';

interface SearchRecentProps {
  onPressRecent: (searchText: string) => void;
}

const SearchRecent = ({onPressRecent}: SearchRecentProps) => {
  const orderedSearchRecents = useSearchRecentStore(
    state => state.orderedSearchRecents, // 최신 순서로 정렬된 검색 기록을 구독
  );
  const deleteSearchRecent = useSearchRecentStore(
    state => state.deleteSearchRecent,
  );

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {orderedSearchRecents.length != 0 ? (
        <SearchRecentList
          recentlistData={orderedSearchRecents}
          onPress={onPressRecent}
          onDeletePress={deleteSearchRecent}
        />
      ) : (
        <Text style={tw`text-[${designatedColor.GRAY2}]`}>
          최근 검색이 없습니다
        </Text>
      )}
    </View>
  );
};

export {SearchRecent};
