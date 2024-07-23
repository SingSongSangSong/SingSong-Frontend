import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, Text, View} from 'react-native';
import {ButtonBar, Playlist} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList, Song} from '../../types';
import {designatedColor, keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';

type PlaylistScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.PLAYLIST
>;

export default function PlaylistScreen({navigation}: PlaylistScreenProps) {
  const keepHandler = useKeep();

  const handlePlayPress = (playlistId: string, songCount: number) => {
    navigation.navigate(keepStackNavigations.SONGLIST, {playlistId, songCount});
  };

  const isEmptyObject = (obj: {[playlistName: string]: Song[]}) => {
    return Object.keys(obj).length === 0;
  };

  return (
    <SafeAreaView style={tw`h-full w-full  bg-[${designatedColor.BACKGROUND}]`}>
      <View>
        <ButtonBar buttonItems={keepHandler.buttonItems} />
      </View>

      <View style={tw`w-full h-full`}>
        {!isEmptyObject(keepHandler.playlists) ? (
          <Playlist
            playlistData={keepHandler.getPlaylistInfo()}
            onPlayPress={handlePlayPress}
          />
        ) : (
          <View style={tw`h-full w-full justify-center items-center`}>
            <Text style={tw`text-white font-bold`}>Keep이 비어있어요</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
