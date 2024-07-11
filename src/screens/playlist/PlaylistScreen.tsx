import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import mainNavigations from '../../constants/MainConstants';
import playlistNavigations from '../../constants/playlistConstants';
import CustomPlaylist from '../../components/CustomPlaylist';
import GestureRecognizer from 'react-native-swipe-gestures';
import usePlaylistStore from '../../store/usePlaylistStore';
import tw from 'twrnc';

type PlaylistScreenProps = StackScreenProps<
  MainStackParamList,
  typeof playlistNavigations.PLAYLIST
>;

interface PlaylistItem {
  id: string;
  name: string;
  length: string;
}

export default function PlaylistScreen({navigation}: PlaylistScreenProps) {
  const {playlist, setPlaylist} = usePlaylistStore();

  const playlistData: PlaylistItem[] = Object.entries(playlist).map(
    ([id, value]) => ({
      id,
      name: value.playlistName,
      length: value.playlistLen,
    }),
  );

  const onSwipeRight = () => {
    console.log('Swipe!!');
    navigation.navigate(mainNavigations.HOME);
  };

  const handlePlayPress = (playlistId: string) => {
    console.log('playlistcscreen', playlistId);
    navigation.navigate(playlistNavigations.SONGLIST, {playlistId}); // 'TargetScreen'은 라우팅하려는 페이지 이름입니다.
  };

  const renderItem = ({item}: {item: PlaylistItem}) => (
    <View style={tw`m-2`}>
      <CustomPlaylist
        playlistName={item.name}
        playlistLen={item.length}
        onPress={() => handlePlayPress(item.id)}
      />
    </View>
  );

  return (
    <GestureRecognizer
      onSwipeRight={onSwipeRight}
      config={{
        velocityThreshold: 0.5,
        directionalOffsetThreshold: 80,
      }}
      style={styles.container}>
      <SafeAreaView style={tw`h-full w-full`}>
        <Text>hi~~</Text>
        <View style={tw`w-full h-full bg-gray-900`}>
          <FlatList
            data={playlistData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
