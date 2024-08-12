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
  return (
    <View style={tw`w-full mt-2`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row`}>
        {tags.map((tag, index) => (
          <View key={index}>
            <TagIconButton
              tag={tag}
              index={index}
              onPress={() => handleOnTagButton(tag)}
              Icon={Tag1Icon}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export {Taglist};
