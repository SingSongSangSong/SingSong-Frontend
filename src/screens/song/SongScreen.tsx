import {SafeAreaView, View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
import {homeStackNavigations, keepStackNavigations} from '../../constants';
import {
  SongAdditionInfo,
  SongComment,
  SongDefaultInfo,
  SongReview,
} from '../../components';
import {SongRelated} from '../../components/module/songDetail/SongRelated';
import {logButtonClick, logScreenView} from '../../utils';

type SongScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_SONG_DETAIL
    >
  | StackScreenProps<
      HomeStackParamList,
      typeof homeStackNavigations.SONG_DETAIL
    >;

function SongScreen(props: SongScreenProps) {
  console.log('songScreen!!');
  console.log('props route', props.route?.name);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('route name', props.route.name);
      logScreenView(props.route.name); // 스크린이 포커스될 때 로그 이벤트 발생
    });

    return unsubscribe;
  }, [props]);

  const {songNumber, songId, songName, singerName, album} =
    props.route?.params || {};

  const _onPressComment = (songNumber: number, songId: number) => {
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_COMMENT, {songNumber, songId});
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.COMMENT, {songNumber, songId});
      }
    }
  };

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    logButtonClick('related_song_button');
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_SONG_DETAIL, {
          songId,
          songNumber,
          songName,
          singerName,
          album,
        });
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.SONG_DETAIL, {
          songId,
          songNumber,
          songName,
          singerName,
          album,
        });
      }
    }
  };

  const renderHeader = () => (
    <View>
      <SongDefaultInfo
        songNumber={songNumber}
        songName={songName}
        singerName={singerName}
        album={album}
      />
      <SongAdditionInfo
        songId={songId}
        handleOnPressComment={() => {
          _onPressComment(songNumber, songId);
        }}
      />
      <View style={tw`mx-2`}>
        <Text style={tw`text-white font-bold text-xl my-4`}>
          이 노래는 어떻송
        </Text>
        <SongReview songId={songId} />
        <SongComment
          handleOnPressComment={() => {
            _onPressComment(songNumber, songId);
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={[]} // Empty data for the main FlatList as we only need it for scrolling
        renderItem={null} // No need to render any items
        ListFooterComponent={
          <SongRelated songId={songId} onSongPress={_onSongPress} />
        }
        keyExtractor={(item, index) => index.toString()} // Key extractor for FlatList
      />
    </SafeAreaView>
  );
}

export default SongScreen;
