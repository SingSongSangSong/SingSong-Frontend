import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {SongsList} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
import {designatedColor, keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';

// type KeepScreenNavigationProp = CompositeNavigationProp<
//   StackNavigationProp<KeepStackParamList, typeof keepStackNavigations.KEEP>,
//   CompositeNavigationProp<
//     StackNavigationProp<
//       HomeStackParamList,
//       typeof homeStackNavigations.RCD_HOME
//     >,
//     StackNavigationProp<HomeStackParamList>
//   >
// >;

type KeepScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP
>;

function KeepScreen({navigation}: KeepScreenProps) {
  const keepHandler = useKeep();

  // const handleOnPressSonglist = (songNumber: number, songId: number) => {
  //   navigation.navigate(keepStackNavigations.KEEP_SONG_DETAIL, {
  //     songNumber,
  //     songId,
  //   });
  // };

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    navigation.navigate(keepStackNavigations.KEEP_SONG_DETAIL, {
      songNumber,
      songId,
    });
  };

  return (
    <SafeAreaView style={tw`h-full w-full bg-black`}>
      <View style={tw`w-full h-full pt-6`}>
        {keepHandler.isLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="small" color={designatedColor.PINK2} />
          </View>
        ) : (
          <View>
            {keepHandler.keepList.length > 0 ? (
              <SongsList
                songlistData={keepHandler.keepList}
                isShowKeepIcon={false}
                onSongPress={_onSongPress}
              />
            ) : (
              <View style={tw`h-full w-full justify-center items-center`}>
                <Text style={tw`text-white font-bold`}>Keep이 비어있어요</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default KeepScreen;
