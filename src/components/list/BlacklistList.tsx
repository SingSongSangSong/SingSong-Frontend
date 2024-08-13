import React from 'react';
import {FlatList, View} from 'react-native';
import {Blacklist} from '../../types';
import {BlacklistItem} from '..';

interface BlacklistListProps {
  blacklistData: Blacklist[];
  onDeletePress: (memberId: number) => void;
}

const BlacklistList = ({blacklistData, onDeletePress}: BlacklistListProps) => {
  const renderItem = ({item}: {item: Blacklist}) => (
    <View>
      <BlacklistItem
        nickname={item.nickname}
        blockDate={item.blockDate}
        onDeletePress={() => onDeletePress(item.memberId)}
      />
    </View>
  );

  return <FlatList data={blacklistData} renderItem={renderItem} />;
};

export {BlacklistList};
