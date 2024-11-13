import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {
  HomeStackParamList,
  KeepStackParamList,
  SearchStackParamList,
} from '../../types';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
  searchStackNavigations,
} from '../../constants';
import {SongComment, SongInfo2, SongReview} from '../../components';
import {SongRelated} from '../../components/module/songDetail/SongRelated';
import {logButtonClick, logPageView, logTrack} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SongScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_SONG_DETAIL
    >
  | StackScreenProps<
      HomeStackParamList,
      typeof homeStackNavigations.SONG_DETAIL
    >
  | StackScreenProps<
      SearchStackParamList,
      typeof searchStackNavigations.SEARCH_SONG_DETAIL
    >;

function SongScreen(props: SongScreenProps) {
  const {
    songId,
    songNumber = null,
    songName,
    singerName,
    album,
    melonLink,
    isMr,
    isLive,
    lyricsVideoId = null,
  } = props.route?.params || {};

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const _onPressComment = (songNumber: number, songId: number) => {
    logTrack('song_comment_button_click');
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).navigate(keepStackNavigations.KEEP_COMMENT, {
          songNumber: songNumber,
          songId: songId,
        });
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).navigate(homeStackNavigations.COMMENT, {
          songNumber: songNumber,
          songId: songId,
        });
      } else if (
        props.route.name === searchStackNavigations.SEARCH_SONG_DETAIL
      ) {
        (
          props.navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).navigate(searchStackNavigations.SEARCH_COMMENT, {
          songNumber: songNumber,
          songId: songId,
        });
      }
    }
  };

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
    lyricsVideoId: string,
  ) => {
    amplitude.track('related_song_button_click');
    logButtonClick('related_song_button_click');
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_SONG_DETAIL, {
          songId: songId,
          songNumber: songNumber,
          songName: songName,
          singerName: singerName,
          album: album || '',
          melonLink: melonLink,
          isMr: isMr,
          isLive: isLive,
          lyricsVideoId: lyricsVideoId || '',
        });
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.SONG_DETAIL, {
          songId: songId,
          songNumber: songNumber,
          songName: songName,
          singerName: singerName,
          album: album || '',
          melonLink: melonLink,
          isMr: isMr,
          isLive: isLive,
          lyricsVideoId: lyricsVideoId || '',
        });
      } else if (
        props.route.name === searchStackNavigations.SEARCH_SONG_DETAIL
      ) {
        (
          props.navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).push(searchStackNavigations.SEARCH_SONG_DETAIL, {
          songId: songId,
          songNumber: songNumber,
          songName: songName,
          singerName: singerName,
          album: album || '',
          melonLink: melonLink,
          isMr: isMr,
          isLive: isLive,
          lyricsVideoId: lyricsVideoId || '',
        });
      }
    }
  };

  const renderHeader = () => (
    <View>
      <SongInfo2
        songId={songId}
        songNumber={songNumber || 0}
        songName={songName}
        singerName={singerName}
        album={album}
        melonLink={melonLink}
        isMr={isMr}
        isLive={isLive}
        lyricsVideoId={lyricsVideoId || ''}
        handleOnPressComment={_onPressComment}
      />
      {/* <SongAdditionInfo
        songId={songId}
        handleOnPressComment={() => {
          _onPressComment(songNumber, songId);
        }}
      /> */}
      <View>
        {/* <Text style={tw`text-white font-bold text-xl my-4`}>
          이 노래는 어떻송
        </Text> */}
        <SongReview songId={songId} />
        <SongComment
          handleOnPressComment={() => {
            _onPressComment(songNumber, songId);
          }}
        />
      </View>
    </View>
  );

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {/* <View style={tw`items-start absolute top-0 left-0 z-50 w-full bg-black`}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={tw`p-4`}>
          <ArrowLeftIcon width={28} height={28} />
        </TouchableOpacity>
      </View> */}

      <FlatList
        ListHeaderComponent={renderHeader}
        data={[]} // Empty data for the main FlatList as we only need it for scrolling
        renderItem={null} // No need to render any items
        ListFooterComponent={
          <SongRelated songId={songId} onSongPress={_onSongPress} />
        }
        keyExtractor={(item, index) => index.toString()} // Key extractor for FlatList
      />
    </View>
  );
}

export default SongScreen;
