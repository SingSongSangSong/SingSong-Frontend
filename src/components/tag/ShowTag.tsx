import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import tw from 'twrnc';
import {RemovableTag} from './RemovableTag';

type ShowTagProps = {
  selectedSongTag: string[];
  selectedAdditionTag: string[];
  handleTagRemove: (
    index: number,
    tagLst: string[],
    setTag: (updatedTag: string[]) => void,
  ) => void;
  setSelectedSongTag: (tags: string[]) => void;
  setSelectedAdditionTag: (tags: string[]) => void;
};

const ShowTag: React.FC<ShowTagProps> = ({
  selectedSongTag,
  selectedAdditionTag,
  handleTagRemove,
  setSelectedSongTag,
  setSelectedAdditionTag,
}) => {
  return (
    <ScrollView contentContainerStyle={tw`flex-wrap flex-row p-2 mt-2`}>
      {selectedAdditionTag.length !== 0 || selectedSongTag.length !== 0 ? (
        <>
          {selectedAdditionTag.length !== 0 &&
            selectedAdditionTag.map((tag, index) => (
              <View key={index} style={tw`mb-1 mr-1`}>
                <RemovableTag
                  tag={tag}
                  index={index}
                  onRemove={handleTagRemove}
                  tagLst={selectedAdditionTag}
                  setTag={setSelectedAdditionTag}
                />
              </View>
            ))}
          {selectedSongTag.length !== 0 &&
            selectedSongTag.map((tag, index) => (
              <View key={index} style={tw`mb-1 mr-1`}>
                <RemovableTag
                  tag={tag}
                  index={index}
                  onRemove={handleTagRemove}
                  tagLst={selectedSongTag}
                  setTag={setSelectedSongTag}
                />
              </View>
            ))}
        </>
      ) : (
        <View style={tw`h-full w-full items-center justify-center`}>
          <Text style={tw`text-sm p-2 text-white font-bold`}>
            선택된 태그가 없어요
          </Text>
          <Text style={tw`text-sm p-2 text-white font-bold`}>
            원하는 태그를 추가하고 관련 노래를 추천 받아보세요
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export {ShowTag};
