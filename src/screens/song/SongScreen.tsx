import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
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
import {logButtonClick} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';

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
  const {songNumber, songId, songName, singerName, album} =
    props.route?.params || {};

  const _onPressComment = (songNumber: number, songId: number) => {
    amplitude.track('Song Comment Press');
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_COMMENT, {songNumber, songId});
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
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
    amplitude.track('Related Song Press');
    logButtonClick('related_song_button_click');
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
      <View style={tw`items-start absolute top-0 left-0 z-50 w-full bg-black`}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={tw`p-4`}>
          <ArrowLeftIcon width={28} height={28} />
        </TouchableOpacity>
      </View>

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
