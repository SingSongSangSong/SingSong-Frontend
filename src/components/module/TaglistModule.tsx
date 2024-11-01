import React, {useEffect, useMemo} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {Taglist} from '..';
import {designatedColor} from '../../constants';
import useSongStore from '../../store/useSongStore';
import {useQuery} from '@tanstack/react-query';
import getTags from '../../api/tags/getTags';

interface TaglistModuleProps {
  // onPressTotalButton: () => void;
  onPressTagButton: (tag: string) => void;
}

const TaglistModule = React.memo(({onPressTagButton}: TaglistModuleProps) => {
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
      style={tw`flex-1 border-t-[0.5px] border-[${designatedColor.GRAY5}] mx-2 mt-2 pb-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`justify-between flex-row mx-4 items-center mb-2`} />
      <Taglist tags={memoizedTags} handleOnTagButton={onPressTagButton} />
    </View>
  );
});

export {TaglistModule};
