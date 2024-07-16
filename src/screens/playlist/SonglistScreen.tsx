import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Image, View} from 'react-native';
import tw from 'twrnc';
import {MainStackParamList} from '../../types';
import {playlistNavigations} from '../../constants';
import useSonglist from '../../hooks/useSonglist';
import {Songlist} from '../../components';

type SonglistScreenProps = StackScreenProps<
  MainStackParamList,
  typeof playlistNavigations.SONGLIST
>;

function SonglistScreen({route, navigation}: SonglistScreenProps) {
  const {playlistId} = route.params; //초기 태그 (ex. 고음지르기)
  const songlistHandler = useSonglist(playlistId);

  return (
    <View style={tw`w-full h-full bg-[#151515]`}>
      <View style={tw`w-full justify-center items-center my-4`}>
        <Image
          source={{
            uri: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/dCyJyeNJ50BMG489LQg9cokHUpk.jpg',
          }}
          style={tw`w-50 h-50 rounded-xl`}
        />
      </View>
      <Songlist songlistData={songlistHandler.songs} onSongPress={() => {}} />
    </View>
  );
}

export default SonglistScreen;
