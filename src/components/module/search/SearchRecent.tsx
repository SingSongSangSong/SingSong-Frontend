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
  const getOrderedSearchRecents = useSearchRecentStore(
    state => state.getOrderedSearchRecents,
  );
  const deleteSearchRecent = useSearchRecentStore(
    state => state.deleteSearchRecent,
  );

  const recentlistData = getOrderedSearchRecents();

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {recentlistData.length != 0 ? (
        <SearchRecentList
          recentlistData={recentlistData}
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
