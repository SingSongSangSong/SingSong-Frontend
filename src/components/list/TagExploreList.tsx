import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {TagIconButton} from '../button/TagIconButton';
import * as Icons from '../../assets/svg/tags';
import CustomText from '../text/CustomText';
import {designatedColor} from '../../constants';
import useSongStore from '../../store/useSongStore';
import {TagExploreItem} from '..';

type ExploreTagListProps = {
  handleOnTagButton: (tag: string) => void;
};
type IconNames = keyof typeof Icons;

const ExploreTagList = ({handleOnTagButton}: ExploreTagListProps) => {
  const tags = useSongStore(state => state.tags);

  // 태그 배열을 두 개씩 묶는 함수
  const chunkedTags = (array: string[], size: number) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedTagsData = chunkedTags(tags, 2);

  return (
    <View style={tw`w-full`}>
      <View style={tw`flex-row justify-between px-4 items-center mb-2`}>
        <View style={tw`flex-row items-center p-2 mt-4`}>
          <CustomText
            style={tw`text-[${designatedColor.TEXT_WHITE}] text-lg mr-2 items-center`}>
            장르 탐색
          </CustomText>
        </View>
      </View>

      <View style={tw`flex-wrap flex-row justify-center`}>
        {chunkedTagsData.map((row, rowIndex) => (
          <View key={rowIndex} style={tw`flex-row justify-around w-full mb-2`}>
            {row.map((tag, index) => {
              const iconName: IconNames = `Icon${
                tags.indexOf(tag) + 1
              }` as IconNames;
              const IconComponent = Icons[iconName];

              return (
                <TagExploreItem
                  key={index}
                  tag={tag}
                  index={index}
                  onPress={() => handleOnTagButton(tag)}
                  Icon={IconComponent}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};

export {ExploreTagList};
