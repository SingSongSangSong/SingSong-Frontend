import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import useSongStore from '../../store/useSongStore';
import {SongCardList} from '../list/SongCardList';
import {isEmptyObject} from '../../utils';

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
  // const {tags, previewSongs} = useSongStore();
  const tags = useSongStore(state => state.tags);
  const previewSongs = useSongStore(state => state.previewSongs);

  return (
    <View>
      {!isEmptyObject(previewSongs) && (
        <View style={tw`w-full flex-wrap flex-row justify-center items-center`}>
          {tags.map((tag, index) => (
            <View>
              <SongCardList
                tag={tag}
                key={index}
                onPress={onPressTotalButton}
                data={previewSongs[tag]}
                onSongPress={onPressSongButton}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export {SongCardModule};
