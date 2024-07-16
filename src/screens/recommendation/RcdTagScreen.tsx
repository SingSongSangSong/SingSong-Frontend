import React from 'react';
import {SafeAreaView, View} from 'react-native';
import tw from 'twrnc';
import {SongInfo, Taglist, ShowTag} from '../../components';
import useTag from '../../hooks/useTag';

function RcdTagScreen() {
  const tagHandler = useTag();

  return (
    <SafeAreaView style={tw`flex-1 bg-[#151515] justify-center items-center`}>
      <Taglist tags={tagHandler.tags} onTagAdd={tagHandler.handleTagAdd} />
      <View style={tw`w-full p-4 h-[50%] items-center justify-center`}>
        <SongInfo selectedSong={tagHandler.selectedSong} />
        <ShowTag
          selectedSongTag={tagHandler.selectedSongTag}
          selectedAdditionTag={tagHandler.selectedAdditionTag}
          handleTagRemove={tagHandler.handleTagRemove}
          setSelectedSongTag={tagHandler.setSelectedSongTag}
          setSelectedAdditionTag={tagHandler.setSelectedAdditionTag}
        />
      </View>
    </SafeAreaView>
  );
}

export default RcdTagScreen;
