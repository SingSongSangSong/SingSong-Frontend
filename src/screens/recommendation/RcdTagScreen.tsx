import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import tw from 'twrnc';
import getTags from '../../api/getTags';
import {TagsResponse} from '../../types/songs';
import useRecommendStore from '../../store/useRecommendStore';
import CustomRemovableTag from '../../components/CustomRemovableTag';
import CustomClickableTag from '../../components/CustomClickableTag';

function RcdTagScreen() {
  const [tags, setTags] = useState<string[]>([]); //목록을 보여주는태그들
  const {selectedSong, selectedTag, setSelectedTag} = useRecommendStore();

  useEffect(() => {
    fetchgetTagData();
  }, []); // 빈 배열을 두 번째 인수로 전달하여 처음 렌더링될 때만 호출되도록 합니다.

  const fetchgetTagData = async () => {
    try {
      const tagData: TagsResponse = await getTags(); //api로부터 받아온 태그 리스트
      setTags(tagData.tags);
      console.log(tagData.tags); // tags 대신 tagData.tags를 출력
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagRemove = (index: number) => {
    const updatedTags = selectedTag.filter((_, i) => i !== index);
    setSelectedTag(updatedTags);
  };

  const handleTagAdd = (tag: string) => {
    const updatedTags = [...selectedTag, tag];
    setSelectedTag(updatedTags);
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
      <View style={tw`w-full p-2 bg-gray-100 h-[50%]`}>
        <Text style={tw`text-center`}>Drag Here</Text>
        <View style={tw`w-full rounded-lg bg-white h-15`}>
          {selectedSong ? (
            <View>
              <Text style={tw`text-lg font-bold`}>
                {selectedSong.song_name}
              </Text>
              <Text style={tw`text-base mb-2`}>{selectedSong.singer_name}</Text>
            </View>
          ) : (
            <Text style={tw`text-center text-gray-500`}>곡 없음</Text>
          )}
        </View>
        {selectedTag.length != 0 ? ( //태그가 있으면 보여주기
          <View style={tw`flex-row flex-wrap`}>
            {selectedTag.map(
              (
                tg,
                index, //selectedTag로 변경 , song이랑 tag를 따로 관리하자
              ) => (
                <View key={index} style={tw`mb-1`}>
                  <CustomRemovableTag
                    tag={tg}
                    index={index}
                    onRemove={handleTagRemove}
                  />
                </View>
              ),
            )}
          </View>
        ) : (
          <View style={tw`w-full mt-4`}>
            <Text style={tw`text-center text-gray-500`}>
              원하는 태그를 선택하여 맞춤 노래를 추천받아보세요.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default RcdTagScreen;
