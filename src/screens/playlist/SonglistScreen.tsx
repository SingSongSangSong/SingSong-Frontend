import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, Text, View} from 'react-native';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import playlistNavigations from '../../constants/playlistConstants';
import tw from 'twrnc';
import useSonglistStore from '../../store/useSonglistStore';
import {Song} from '../../types/songs';

type SonglistScreenProps = StackScreenProps<
  MainStackParamList,
  typeof playlistNavigations.SONGLIST
>;

function SonglistScreen({route, navigation}: SonglistScreenProps) {
  const {playlistId} = route.params; //초기 태그 (ex. 고음지르기)
  const {songlist, setSonglist} = useSonglistStore();
  const songData = songlist && songlist[playlistId] ? songlist[playlistId] : {};
  const allSongs: Song[] = songData ? Object.values(songData) : [];

  // useEffect(() => {
  //   console.log('playlistId:', playlistId);
  //   console.log('songlist', songlist);
  //   console.log(songData);
  //   console.log(allSongs);
  // });

  const renderItem = ({item}: {item: Song}) => (
    <View style={tw`p-4 bg-gray-900 mb-2 rounded-lg`}>
      <Text style={tw`text-white font-bold`}>{item.song_name}</Text>
      <Text style={tw`text-white`}>{item.singer_name}</Text>
    </View>
  );

  return (
    <View>
      <Text>songlist screen</Text>
      <FlatList
        data={allSongs}
        renderItem={renderItem}
        // keyExtractor={item => item.song_number}
      />
    </View>
  );
}

export default SonglistScreen;
