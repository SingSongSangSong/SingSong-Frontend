import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View} from 'react-native';
import {ButtonBar, Playlist} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
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

  return (
    <SafeAreaView style={tw`h-full w-full  bg-[${designatedColor.BACKGROUND}]`}>
      <View>
        <ButtonBar buttonItems={keepHandler.buttonItems} />
      </View>

      <View style={tw`w-full h-full mb-10`}>
        <Playlist
          playlistData={keepHandler.getPlaylistInfo()}
          onPlayPress={handlePlayPress}
        />
      </View>
    </SafeAreaView>
  );
}
