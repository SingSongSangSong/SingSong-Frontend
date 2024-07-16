import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {Playlist} from '../../components';
import GestureRecognizer from 'react-native-swipe-gestures';
import tw from 'twrnc';
import {MainStackParamList} from '../../types';
import {mainNavigations, playlistNavigations} from '../../constants';
import usePlaylist from '../../hooks/usePlaylist';

type PlaylistScreenProps = StackScreenProps<
  MainStackParamList,
  typeof playlistNavigations.PLAYLIST
>;

export default function PlaylistScreen({navigation}: PlaylistScreenProps) {
  const playlistHandler = usePlaylist();

  const onSwipeRight = () => {
    navigation.navigate(mainNavigations.HOME);
  };

  const handlePlayPress = (playlistId: string) => {
    console.log('playlistcscreen', playlistId);
    navigation.navigate(playlistNavigations.SONGLIST, {playlistId}); // 'TargetScreen'은 라우팅하려는 페이지 이름입니다.
  };

  const buttonCatalog = ['My', 'Shared', 'Liked', 'Subscribed'];

  return (
    <GestureRecognizer
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 80,
      }}
      style={tw`flex-1 justify-center items-center`}>
      <SafeAreaView style={tw`h-full w-full  bg-[#151515]`}>
        <View style={tw`flex-row p-3 border-b border-white items-center`}>
          {buttonCatalog.map((buttonName, index) => (
            <Pressable
              key={index}
              style={tw`p-2 rounded-xl items-center mr-4 border border-white`}>
              <Text style={tw`font-bold text-white text-sm`}>{buttonName}</Text>
            </Pressable>
          ))}
        </View>
        <View style={tw`w-full h-full mt-5 mb-10`}>
          <Playlist
            playlistData={playlistHandler.playlistData}
            onPlayPress={handlePlayPress}
          />
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
}
