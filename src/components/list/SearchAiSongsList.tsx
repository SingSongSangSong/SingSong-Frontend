import React from 'react';
import {FlatList, View} from 'react-native';
import {Song} from '../../types';
import tw from 'twrnc';
import {KeepAdditionSongItem} from '..';
import CustomText from '../text/CustomText';
import {designatedColor} from '../../constants';

interface SearchAiSongsListProps {
  songData: Song[];
}

const SearchAiSongsList = ({songData}: SearchAiSongsListProps) => {
  const renderHeader = () => {
    return (
      <View style={tw`w-full justify-start pl-5 p-2`}>
        <CustomText style={tw`text-[${designatedColor.VIOLET3}]`}>
          이런 노래는 어떠신가요?
        </CustomText>
      </View>
    );
  };
  const renderItem = ({item}: {item: Song}) => (
    <KeepAdditionSongItem
      song={item}
      songId={item.songId}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      album={item.album}
      melonLink={item.melonLink || ''}
      isMr={item.isMr}
      isLive={item.isLive || false}
      isKeep={item.isKeep}
    />
  );

  return (
    <View style={tw`flex-1 w-full`}>
      <FlatList
        data={songData}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

export {SearchAiSongsList};
