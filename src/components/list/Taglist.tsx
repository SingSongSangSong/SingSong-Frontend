import React from 'react';
import {View, ScrollView} from 'react-native';
import tw from 'twrnc';
import {TagIconButton} from '../button/TagIconButton';
import * as Icons from '../../assets/svg/tags';

type TaglistProps = {
  tags: string[];
  handleOnTagButton: (tag: string) => void;
};
type IconNames = keyof typeof Icons;

const Taglist = ({tags, handleOnTagButton}: TaglistProps) => {
  console.log('tagList');

  // 아이콘 리스트를 생성
  // const icons = [SongsIcon, OneIcon, RoofIcon, EarIcon];

  return (
    <View style={tw`w-full mt-2`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`flex-row`}>
        {tags.map((tag, index) => {
          // 인덱스를 아이콘 리스트의 길이로 모듈러 연산하여 아이콘 선택
          // const Icon = icons[index % icons.length];
          const iconName: IconNames = `Icon${index + 1}` as IconNames; // 타입 단언을 통해 아이콘 이름 생성
          const IconComponent = Icons[iconName];

          return (
            <View key={index}>
              <TagIconButton
                tag={tag}
                index={index}
                onPress={() => handleOnTagButton(tag)}
                Icon={IconComponent}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export {Taglist};
