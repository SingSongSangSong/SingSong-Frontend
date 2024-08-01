import React from 'react';
import {View} from 'react-native';
import {AddTextButton, PreviewlistItem} from '..';
import {RcdHomeSong} from '../../types';
import tw from 'twrnc';

interface PreviewlistProps {
  tag: string;
  onArrowPress: (tag: string) => void; //navigat만 tag로 넘겨주면 될듯?
  data: RcdHomeSong[];
}

const Previewlist: React.FC<PreviewlistProps> = ({tag, onArrowPress, data}) => {
  return (
    <View style={tw`w-full px-2`}>
      <AddTextButton title={tag} onPress={onArrowPress} isCenter={false} />

      {data &&
        data
          .slice(0, 3)
          .map((song, index) => (
            <PreviewlistItem
              key={index}
              songNumber={song.songNumber}
              songName={song.songName}
              singerName={song.singerName}
            />
          ))}
    </View>
  );
};

export {Previewlist};
