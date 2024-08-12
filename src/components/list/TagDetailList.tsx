import React from 'react';
import {FlatList, View} from 'react-native';
import Tag1Icon from '../../assets/svg/tags/tag1.svg';
import {TagDetailListItem} from '../item/TagDetailListItem';

interface TagDetailListProps {
  tags: string[];
  onPress: (tag: string) => void;
}

const TagDetailList = ({tags, onPress}: TagDetailListProps) => {
  const renderItem = ({item}: {item: string}) => (
    <View>
      <TagDetailListItem
        tag={item}
        Icon={Tag1Icon}
        onPress={() => onPress(item)}
      />
    </View>
  );

  return <FlatList data={tags} renderItem={renderItem} />;
};

export {TagDetailList};
