import React from 'react';
import {FlatList, View} from 'react-native';
import {SearchRecentType} from '../../types';
import {SearchRecentItem} from '..';
import tw from 'twrnc';

interface SearchRecentListProps {
  recentlistData: SearchRecentType[];
  onPress: (searchText: string) => void;
  onDeletePress: (id: number) => void;
}

const SearchRecentList = ({
  recentlistData,
  onPress,
  onDeletePress,
}: SearchRecentListProps) => {
  const renderItem = ({item}: {item: SearchRecentType}) => (
    <View style={tw`w-full`}>
      <SearchRecentItem
        date={item.date}
        recentText={item.recentText}
        onPress={() => onPress(item.recentText)}
        onDeletePress={() => onDeletePress(item.id)}
      />
    </View>
  );

  return <FlatList data={recentlistData} renderItem={renderItem} />;
};

export {SearchRecentList};
