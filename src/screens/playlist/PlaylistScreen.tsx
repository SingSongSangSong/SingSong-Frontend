import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {SafeAreaView, View} from 'react-native';
import {ButtonBar, Playlist} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
import {keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';

type PlaylistScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.PLAYLIST
>;

export default function PlaylistScreen({navigation}: PlaylistScreenProps) {
  const keepHandler = useKeep();

  const handlePlayPress = (playlistId: string, songCount: number) => {
    navigation.navigate(keepStackNavigations.SONGLIST, {playlistId, songCount}); // 'TargetScreen'은 라우팅하려는 페이지 이름입니다.
  };

  return (
    <SafeAreaView style={tw`h-full w-full  bg-[#151515]`}>
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
