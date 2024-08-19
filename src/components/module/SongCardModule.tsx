// src/components/modules/SongCardModule.tsx
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import useSongStore from '../../store/useSongStore';
import {SongCardList} from '../list/SongCardList';
import {isEmptyObject} from '../../utils';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {designatedColor} from '../../constants';

interface SongCardModuleProps {
  onPressTotalButton: (tag: string) => void;
  onPressSongButton: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
  ) => void;
}

const SongCardModule = ({
  onPressTotalButton,
  onPressSongButton,
}: SongCardModuleProps) => {
  const tags = useSongStore(state => state.tags);
  const previewSongs = useSongStore(state => state.previewSongs);
  const [loadedTags, setLoadedTags] = useState<number>(5); // 처음에는 5개의 태그만 로드

  const loadMoreTags = () => {
    setLoadedTags(prev => Math.min(prev + 5, tags.length)); // 한번에 5개의 태그씩 로드
  };

  return (
    <View>
      {!isEmptyObject(previewSongs) ? (
        <View style={tw`w-full flex-wrap flex-row justify-center items-center`}>
          {tags.slice(0, loadedTags).map(tag => (
            <View key={tag}>
              <SongCardList
                tag={tag}
                onPress={onPressTotalButton}
                data={previewSongs[tag]}
                onSongPress={onPressSongButton}
              />
            </View>
          ))}
          {loadedTags < tags.length && (
            <TouchableOpacity
              onPress={loadMoreTags}
              style={tw`w-full p-2 mb-2`}
              activeOpacity={0.8}>
              <Text style={tw`text-[${designatedColor.GRAY3}]`}>더보기</Text>
            </TouchableOpacity>
            // <Button title="Load More" onPress={loadMoreTags} />
          )}
        </View>
      ) : (
        <View style={tw`h-[12%]`} />
      )}
    </View>
  );
};

export {SongCardModule};
