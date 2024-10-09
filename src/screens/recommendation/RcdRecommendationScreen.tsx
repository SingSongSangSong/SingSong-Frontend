import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {RefreshSongsList} from '../../components';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import useAiSong from '../../hooks/useAiSong';
import {StackScreenProps} from '@react-navigation/stack';

type RcdRecommendationScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.AI_RECOMMENDATION
>;

function RcdRecommendationScreen(props: RcdRecommendationScreenProps) {
  const songHandler = useAiSong();

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
    logButtonClick('ai_recommendation_song_button_click');
    amplitude.track('ai_recommendation_song_button_click');
    props.navigation.push(homeStackNavigations.SONG_DETAIL, {
      songId,
      songNumber,
      songName,
      singerName,
      album,
      melonLink,
      isMr,
      isLive,
    });
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

export default RcdRecommendationScreen;
