import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import {CustomTag} from '../../components';
import {randomColor} from '../../constants';

type SongCardProps = {
  key: number;
  songName: string;
  singerName: string;
  tags: string[];
};

const SongCard = ({key, songName, singerName, tags}: SongCardProps) => {
  const maxTagsPerRow = 3; // Adjust this value based on your design
  const visibleTags = tags.slice(0, maxTagsPerRow); // Only take the first row of tags

  return (
    <View style={tw`w-[46%] h-60 rounded-lg overflow-hidden bg-gray-200 m-2`}>
      <View style={tw`bg-${randomColor[key % randomColor.length]} h-[50%]`} />
      <View style={tw`flex-1 bg-gray-600 p-2`}>
        <Text style={tw`text-sm font-bold text-white mt-1`}>{songName}</Text>
        <Text style={tw`text-sm text-white mt-1`}>{singerName}</Text>
        <View style={tw`flex-row flex-wrap mt-2`}>
          {visibleTags.map((tg, index) => (
            <View key={index} style={tw`mb-1 mr-1`}>
              <CustomTag tag={tg} index={index} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export {SongCard};
