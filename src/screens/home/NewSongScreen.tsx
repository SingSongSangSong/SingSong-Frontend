import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {RefreshSongsList} from '../../components';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {StackScreenProps} from '@react-navigation/stack';
import useNewSong from '../../hooks/useNewSong';

type NewSongScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.NEW_SONG
>;

function NewSongScreen(props: NewSongScreenProps) {
  const newSongHandler = useNewSong();

  useEffect(() => {
    if (!newSongHandler.newSongsLst) {
      newSongHandler.setInitSongs(); //처음에 불러온 노래 세팅
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
    logButtonClick('new_song_button_click');
    amplitude.track('new_song_button_click');
    props.navigation.push(homeStackNavigations.SONG_DETAIL, {
      songId: songId,
      songNumber: songNumber,
      songName: songName,
      singerName: singerName,
      album: album || '',
      melonLink: melonLink,
      isMr: isMr,
      isLive: isLive,
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-1 h-[50%]`}>
          {newSongHandler.newSongsLst && (
            <RefreshSongsList
              songlistData={newSongHandler.newSongsLst}
              isShowKeepIcon={true}
              onSongPress={_onSongPress} //노래 눌렀을 경우 song_detail로 이동
              onKeepAddPress={newSongHandler._onKeepAddPress} //keep에 추가하는 함수
              onKeepRemovePress={newSongHandler._onKeepRemovePress} //keep에서 삭제하는 함수
              handleRefreshSongs={newSongHandler.handleRefreshSongs}
              onRefresh={newSongHandler.onRefresh}
              isLoading={newSongHandler.isLoading}
              refreshing={newSongHandler.refreshing}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default NewSongScreen;
