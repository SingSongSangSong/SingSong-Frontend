import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {designatedColor, keepStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {KeepStackParamList} from '../../types';
import useKeep from '../../hooks/useKeep';
import {CircleButton, PlusButton, SonglistEdit} from '../../components';

type SonglistEditScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.SONGLIST_EDIT
>;

function SonglistEditScreen({route, navigation}: SonglistEditScreenProps) {
  const playlistId = route.params.playlistId;
  const playlistHandler = useKeep();
  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND}]`}>
      <View style={tw`flex-row items-center justify-between m-2 my-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`mr-4`}>
            <CircleButton onPress={() => {}} />
          </View>
          <Text style={tw`text-white`}>전체 선택</Text>
        </View>
        <View>
          <PlusButton title="곡 추가" onPress={() => {}} />
        </View>
      </View>
      {/* <Text style={tw`text-white`}>SonglistEditScreen {playlistId}</Text> */}
      <SonglistEdit songlistData={playlistHandler.getSonglist(playlistId)} />
    </SafeAreaView>
  );
}

export default SonglistEditScreen;
