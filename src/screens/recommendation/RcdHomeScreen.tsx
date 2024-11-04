import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, SearchStackParamList} from '../../types';
import useSong from '../../hooks/useSong';
import {
  designatedColor,
  homeStackNavigations,
  searchStackNavigations,
} from '../../constants';
import {RefreshSongsList} from '../../components';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type RcdHomeScreenProps =
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.RCD_DETAIL>
  | StackScreenProps<
      SearchStackParamList,
      typeof searchStackNavigations.SEARCH_RCD_DETAIL
    >;

function RcdHomeScreen(props: RcdHomeScreenProps) {
  const initTag = props.route.params.tag; //초기 카테고리
  const songHandler = useSong({initTag});

  useEffect(() => {
    if (!songHandler.songLst) {
      songHandler.setInitSongs(); //처음에 불러온 노래 세팅
    }
    logPageView(props.route.name);
  }, []);

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => {
    logButtonClick('recommendation_song_button_click');
    amplitude.track('recommendation_song_button_click');

    if ('navigate' in props.navigation) {
      if (props.route.name === searchStackNavigations.SEARCH_RCD_DETAIL) {
        (
          props.navigation as StackScreenProps<SearchStackParamList>['navigation']
        ).push(searchStackNavigations.SEARCH_SONG_DETAIL, {
          songId,
          songNumber,
          songName,
          singerName,
          album,
          melonLink,
          isMr,
          isLive,
        });
      } else if (props.route.name === homeStackNavigations.RCD_DETAIL) {
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.SONG_DETAIL, {
          songId,
          songNumber,
          songName,
          singerName,
          album,
          melonLink,
          isMr,
          isLive,
        });
      }
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 h-[50%]`}>
          {songHandler.songLst && (
            <RefreshSongsList
              songlistData={songHandler.songLst}
              isShowKeepIcon={true}
              onSongPress={_onSongPress} //노래 눌렀을 경우 song_detail로 이동
              onKeepAddPress={songHandler._onKeepAddPress} //keep에 추가하는 함수
              onKeepRemovePress={songHandler._onKeepRemovePress} //keep에서 삭제하는 함수
              handleRefreshSongs={songHandler.handleRefreshSongs}
              onRefresh={songHandler.onRefresh}
              isLoading={songHandler.isLoading}
              refreshing={songHandler.refreshing}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RcdHomeScreen;
