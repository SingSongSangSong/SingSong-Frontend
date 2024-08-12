import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import tw from 'twrnc';
import Tag1Icon from '../../assets/svg/tags/tag1.svg';
import {TagIconButton} from '../button/TagIconButton';

type TaglistProps = {
  tags: string[];
  handleOnTagButton: (tag: string) => void;
};

const Taglist = ({tags, handleOnTagButton}: TaglistProps) => {
  // 한 페이지에 보여줄 태그 개수
  const itemsPerPage = 4;

  // 태그를 페이지별로 그룹화
  const groupedTags = [];
  for (let i = 0; i < tags.length; i += itemsPerPage) {
    groupedTags.push(tags.slice(i, i + itemsPerPage));
  }

  return (
    <View style={tw`w-full mt-2`}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {groupedTags.map((group, pageIndex) => (
          <View
            key={pageIndex}
            style={[
              tw`flex-row`,
              {width: Dimensions.get('window').width}, // 페이지 너비 설정
            ]}>
            {group.map((tag, index) => (
              <View key={index} style={tw`flex-1 mb-1`}>
                <TagIconButton
                  tag={tag}
                  index={index}
                  onPress={() => handleOnTagButton(tag)}
                  Icon={Tag1Icon}
                />
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export {Taglist};
