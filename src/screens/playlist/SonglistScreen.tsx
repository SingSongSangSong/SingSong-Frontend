import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, Text, View} from 'react-native';
import tw from 'twrnc';
import {keepStackNavigations} from '../../constants';
import {Songlist} from '../../components';
import {KeepStackParamList} from '../../types';
import useKeep from '../../hooks/useKeep';

type SonglistScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.SONGLIST
>;

function SonglistScreen({route, navigation}: SonglistScreenProps) {
  const {playlistId, songCount} = route.params; //초기 태그 (ex. 고음지르기)
  // const songlistHandler = useSonglist(playlistId);
  const playlistHandler = useKeep();

  return (
    <View style={tw`w-full h-full bg-[#151515]`}>
      <View style={tw`w-full justify-center items-center my-4`}>
        <Image
          source={{
            uri: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/dCyJyeNJ50BMG489LQg9cokHUpk.jpg',
          }}
          style={tw`w-50 h-50 rounded-lg`}
        />
      </View>
      <View style={tw`my-10`}>
        <Text style={tw`text-lg text-white font-bold`}>{playlistId}</Text>
        <Text style={tw`text-white text-sm mt-2`}>
          Playlist {'\u00B7'} {songCount} songs
        </Text>
      </View>
      <Songlist songlistData={playlistHandler.getSonglist(playlistId)} />
    </View>
  );
}

export default SonglistScreen;
