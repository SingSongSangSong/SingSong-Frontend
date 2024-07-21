import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {SongsResponse} from '../../types';
import {AddTextButton, PreviewlistItem} from '..';

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
      <AddTextButton title={tag} onPress={onArrowPress} isCenter={false} />

      {data.songs.map((song, index) => (
        <PreviewlistItem
          songNumber={song.song_number}
          songName={song.song_name}
          singerName={song.singer_name}
        />
      ))}
    </View>
  );
};

export {Previewlist};
