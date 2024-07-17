import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {SongsResponse} from '../../types';
import {SonglistItem} from './SonglistItem';
import {designatedColor} from '../../constants';
import {CustomTextButton} from '..';

interface PreviewlistProps {
  tag: string;
  index: number;
  onArrowPress: (tag: string) => void; //navigat만 tag로 넘겨주면 될듯?
  data: SongsResponse;
}

const Previewlist: React.FC<PreviewlistProps> = ({
  tag,
  index,
  onArrowPress,
  data,
}) => {
  return (
    <View>
      <CustomTextButton title={tag} onPress={onArrowPress} />

      {data.songs.map((song, index) => (
        <SonglistItem
          songNumber={song.song_number}
          songName={song.song_name}
          singerName={song.singer_name}
          onPress={() => {}}
          showKeepIcon={false}
          onToggleStored={() => {}}
          keepColor={designatedColor.KEEP_EMPTY}
        />
      ))}
    </View>
  );
};

export {Previewlist};
