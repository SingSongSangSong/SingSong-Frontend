import React, {useEffect, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {Taglist} from '..';
import {designatedColor} from '../../constants';
import useSongStore from '../../store/useSongStore';
import {useQuery} from '@tanstack/react-query';
import getTags from '../../api/tags/getTags';

interface TaglistModuleProps {
  onPressTotalButton: () => void;
  onPressTagButton: (tag: string) => void;
}

const TaglistModule = React.memo(
  ({onPressTotalButton, onPressTagButton}: TaglistModuleProps) => {
    const tags = useSongStore(state => state.tags);
    const setTags = useSongStore(state => state.setTags);
    // console.log('tagListMOdule');

    const {
      data: tempTags,
      error: tagsError,
      isFetching: isFetchingTags,
    } = useQuery({
      queryKey: ['tags'],
      queryFn: getTags,
      staleTime: 3600000, // 1시간 동안 캐시 유지
      select: data => data.data,
    });

    useEffect(() => {
      if (tempTags) {
        // console.log('tempTags:', tempTags);
        setTags(tempTags);
      }
    }, [tempTags]);

    const memoizedTags = useMemo(() => tags, [tags]);

    return (
      <View
        style={tw`flex-1 border-t-[0.5px] border-[${designatedColor.GRAY5}] pt-4 mx-2 mt-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
        <View style={tw`justify-between flex-row mx-4 items-center mb-2`}>
          <Text style={tw`text-white text-sm my-2`}>
            어떤 노래를 찾으시나요?
          </Text>
          <TouchableOpacity
            onPress={() => {
              onPressTotalButton();
            }}
            activeOpacity={0.8}
            style={tw`p-2`}>
            <Text style={tw`text-[${designatedColor.GRAY3}] text-[3]`}>
              전체보기
            </Text>
          </TouchableOpacity>
        </View>
        <Taglist tags={memoizedTags} handleOnTagButton={onPressTagButton} />
      </View>
    );
  },
);

export {TaglistModule};
