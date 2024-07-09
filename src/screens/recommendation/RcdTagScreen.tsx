import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import tw from 'twrnc';
import getTags from '../../api/getTags';
import {TagsResponse} from '../../types/songs';
import useRecommendStore from '../../store/useRecommendStore';
import CustomRemovableTag from '../../components/CustomRemovableTag';
import CustomClickableTag from '../../components/CustomClickableTag';

function RcdTagScreen() {
  const [tags, setTags] = useState<string[]>([]);
  const {selectedSong, setSelectedSong} = useRecommendStore();

  useEffect(() => {
    fetchgetTagData();
  }, []); // 빈 배열을 두 번째 인수로 전달하여 처음 렌더링될 때만 호출되도록 합니다.

  const fetchgetTagData = async () => {
    try {
      const tagData: TagsResponse = await getTags();
      setTags(tagData.tags);
      console.log(tagData.tags); // tags 대신 tagData.tags를 출력
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagRemove = (index: number) => {
    if (selectedSong) {
      const updatedTags = selectedSong.tags.filter((_, i) => i !== index);
      setSelectedSong({...selectedSong, tags: updatedTags});
    }
  };

  const handleTagAdd = (tag: string) => {
    if (selectedSong) {
      const updatedTags = [...selectedSong.tags, tag];
      setSelectedSong({...selectedSong, tags: updatedTags});
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`font-bold text-7 pb-5`}>tag</Text>
      <View style={tw`flex-row flex-wrap h-[50%]`}>
        {tags.map((tg, index) => (
          <View key={index} style={tw`mb-1`}>
            <CustomClickableTag
              tag={tg}
              index={index}
              onPress={() => handleTagAdd(tg)}
            />
          </View>
        ))}
      </View>
      <View style={tw`w-full p-4 bg-gray-100 h-[50%]`}>
        <Text style={tw`text-center`}>Drag Here</Text>
        {selectedSong ? (
          <View style={tw`w-full bg-pink-200 p-4 mt-4 rounded-lg`}>
            <Text style={tw`text-lg font-bold`}>{selectedSong.song_name}</Text>
            <Text style={tw`text-base mb-2`}>{selectedSong.singer_name}</Text>
            <View style={tw`flex-row flex-wrap`}>
              {selectedSong.tags.map((tg, index) => (
                <View key={index} style={tw`mb-1`}>
                  <CustomRemovableTag
                    tag={tg}
                    index={index}
                    onRemove={handleTagRemove}
                  />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={tw`w-full mt-4`}>
            <Text style={tw`text-center text-gray-500`}>
              노래를 클릭해보세요
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default RcdTagScreen;
