import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import useSong from '../../hooks/useSong';
import {RouteProp} from '@react-navigation/native';
import {homeStackNavigations} from '../../constants';
import {RefreshSongsList} from '../../components';

type RcdHomeScreenProps = {
  route: RouteProp<HomeStackParamList, typeof homeStackNavigations.RCD_DETAIL>;
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.RCD_DETAIL
  >;
};

function RcdHomeScreen({route, navigation}: RcdHomeScreenProps) {
  const initTag = route.params.tag; //초기 카테고리
  const songHandler = useSong({initTag, navigation});
  // console.log('RcdHomeScreen');

  // const unsubscribe = navigation.addListener('beforeRemove', () => {
  //   songHandler.resetIndexLst(initTag);
  //   // songHandler.reset();
  // });

  useEffect(() => {
    if (!songHandler.songLst) {
      songHandler.setInitSongs(); //처음에 불러온 노래 세팅
    }
    // return unsubscribe;
  }, []);

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    navigation.push(homeStackNavigations.SONG_DETAIL, {
      songId,
      songNumber,
      songName,
      singerName,
      album,
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        {/* <View style={tw`flex-row items-center m-4`}>
          <ToggleButton
            isEnabled={songHandler.isEnabled}
            toggleSwitch={songHandler.toggleSwitch}
          />
          <Text style={tw`text-white ml-2 font-bold`}>
            {songHandler.isEnabled ? '탐색' : `${initTag}`}
          </Text>
        </View> */}

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
