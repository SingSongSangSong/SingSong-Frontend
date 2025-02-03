import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import useSongStore from '../../store/useSongStore';
import {SongCardList} from '../list/SongCardList';
import {isEmptyObject} from '../../utils';
import {designatedColor} from '../../constants';
import {useQuery} from '@tanstack/react-query';
import {RcdHomeSongWithTags} from '../../types';
import CustomText from '../text/CustomText';
import {postRcdHome} from '../../api/song-api';

interface SongCardModuleProps {
  onPressTotalButton: (tag: string) => void;
  onPressSongButton: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
  ) => void;
}

const SongCardModule = ({
  onPressTotalButton,
  onPressSongButton,
}: SongCardModuleProps) => {
  // console.log('SongCardModule');
  const tags = useSongStore(state => state.tags);
  const previewSongs = useSongStore(state => state.previewSongs);
  const [loadedTags, setLoadedTags] = useState<number>(5);
  const setPreviewSongs = useSongStore(state => state.setPreviewSongs);

  const loadMoreTags = () => {
    setLoadedTags(tags.length); // 한번에 5개의 태그씩 로드
  };

  const {
    data: tempRcdHomeSongs,
    error: rcdHomeSongsError,
    isFetching: isFetchingRcdHomeSongs,
  } = useQuery({
    queryKey: ['rcdHomeSongs'],
    queryFn: () => postRcdHome({tags: tags || []}),
    enabled: !!tags && tags.length > 0,
    staleTime: 3600000,
    select: data => data.data,
  });

  useEffect(() => {
    if (tempRcdHomeSongs) {
      // console.log('tempRcdHomeSongs:', tempRcdHomeSongs);
      tempRcdHomeSongs.forEach((songWithTags: RcdHomeSongWithTags) => {
        setPreviewSongs(songWithTags.tag, songWithTags.songs);
      });
      // console.log('setPreview Song completed!!!!!!!!!!!');
    }
  }, [tempRcdHomeSongs]);

  return (
    <View>
      {!isEmptyObject(previewSongs) ? (
        <View style={tw`w-full flex-wrap flex-row justify-center items-center`}>
          {tags.slice(0, loadedTags).map(
            tag =>
              previewSongs[tag] &&
              previewSongs[tag].length > 0 && ( // 길이가 1 이상인 경우에만 렌더링
                <View key={tag}>
                  <SongCardList
                    tag={tag}
                    onPress={onPressTotalButton}
                    data={previewSongs[tag]}
                    onSongPress={onPressSongButton}
                  />
                </View>
              ),
          )}
          {loadedTags < tags.length && (
            <TouchableOpacity
              onPress={loadMoreTags}
              style={tw`w-full p-2 mb-4 items-center`}
              activeOpacity={0.8}>
              <CustomText style={tw`text-[${designatedColor.GRAY3}]`}>
                더보기
              </CustomText>
            </TouchableOpacity>
            // <Button title="Load More" onPress={loadMoreTags} />
          )}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export {SongCardModule};
