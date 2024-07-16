import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';

type SongInfoProps = {
  selectedSong: {song_name: string; singer_name: string} | null;
};

const SongInfo: React.FC<SongInfoProps> = ({selectedSong}) => {
  return (
    <View style={tw`w-full bg-[#EEEDEB] p-2 mt-4 rounded-lg`}>
      {selectedSong ? (
        <View style={tw`flex-row`}>
          <View style={tw`justify-center items-center mr-4`}>
            <Text>{selectedSong.song_number}</Text>
          </View>

          <View>
            <Text style={tw`text-sm font-bold`}>{selectedSong.song_name}</Text>
            <Text style={tw`text-sm`}>{selectedSong.singer_name}</Text>
          </View>
        </View>
      ) : (
        <Text style={tw`text-sm p-2`}>노래를 클릭해보세요</Text>
      )}
    </View>
  );
};

export {SongInfo};
