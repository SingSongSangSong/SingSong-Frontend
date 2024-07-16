import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {rcdNavigations} from '../../constants';
import tw from 'twrnc';
import {rcdTabParamList} from '../../types';
import useTag from '../../hooks/useTag';
import useSong from '../../hooks/useSong';
import {CustomButton, CustomTag, ShowTag, SongInfo} from '../../components';

type RcdHomeScreenProps = StackScreenProps<
  rcdTabParamList,
  typeof rcdNavigations.RCD_HOME
>;

function RcdHomeScreen({route, navigation}: RcdHomeScreenProps) {
  const initTag = route.params.tag; //초기 카테고리

  const tagHandler = useTag();
  const songHandler = useSong();

  const unsubscribe = navigation.addListener('beforeRemove', () => {
    songHandler.reset();
  });

  useEffect(() => {
    if (songHandler.songLst.length == 0) {
      songHandler.fetchInitData([initTag]); //초기 카테고리에 대한 노래 리스트
    }
    return unsubscribe;
  }, [songHandler, unsubscribe, initTag]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#151515]`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row flex-wrap m-2 justify-center items-center`}>
          <CustomTag tag={initTag} index={0} />
          <Text style={tw`text-white ml-2 font-bold text-sm`}>
            와 관련된 노래 리스트에요
          </Text>
        </View>

        <View style={tw`flex-1 h-[50%]`}>
          {songHandler.loading ? (
            <View style={tw`w-full h-full items-center justify-center`}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <FlatList
              data={songHandler.songLst}
              keyExtractor={(item, index) => index.toString()}
              renderItem={songHandler.handleSonglist}
              style={tw`h-[50%]`}
              contentContainerStyle={tw`flex-grow`}
            />
          )}
        </View>
        <View style={tw`w-full p-4 h-[50%] items-center justify-center`}>
          <SongInfo selectedSong={tagHandler.selectedSong} />
          <SafeAreaView style={tw`flex-1`}>
            <ShowTag
              selectedSongTag={tagHandler.selectedSongTag}
              selectedAdditionTag={tagHandler.selectedAdditionTag}
              handleTagRemove={tagHandler.handleTagRemove}
              setSelectedSongTag={tagHandler.setSelectedSongTag}
              setSelectedAdditionTag={tagHandler.setSelectedAdditionTag}
            />
          </SafeAreaView>
          <CustomButton
            title="적용"
            color="black"
            onPress={songHandler.handleApplyTag}
            style="outlined"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RcdHomeScreen;
