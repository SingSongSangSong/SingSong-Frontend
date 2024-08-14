import {SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import useSong from '../../hooks/useSong';
import {RouteProp} from '@react-navigation/native';
import {designatedColor, homeStackNavigations} from '../../constants';
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
    navigation.navigate(homeStackNavigations.SONG_DETAIL, {
      songNumber,
      songId,
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
          {songHandler.songLst ? (
            // <RcdSonglist
            //   RcdSonglistData={songHandler.songLst}
            //   handleOnPressSong={songHandler.handleOnPressSong}
            //   toggleAddStored={songHandler.toggleAddStored}
            //   toggleRemoveStored={songHandler.toggleRemoveStored}
            //   handleRefreshSongs={songHandler.handleRefreshSongs}
            //   onRefresh={songHandler.onRefresh}
            //   isLoading={songHandler.isLoading}
            //   refreshing={songHandler.refreshing}
            // />
            // <SongsList
            //   songlistData={songHandler.songLst}
            //   isShowKeepIcon={true}
            //   onSongPress={_onSongPress} //노래 눌렀을 경우 song_detail로 이동
            //   onKeepAddPress={songHandler._onKeepAddPress} //keep에 추가하는 함수
            //   onKeepRemovePress={songHandler._onKeepRemovePress} //keep에서 삭제하는 함수
            // />
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
          ) : (
            // <SongsList
            //   songlistData={songHandler.songLst}
            //   isShowKeepIcon={true}
            //   onSongPress={songHandler.handleOnPressSong}
            //   onKeepAddPress={songHandler.toggleAddStored}
            //   onKeepRemovePress={songHandler.toggleRemoveStored}
            // />
            <View>
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
              <View
                style={tw`w-full px-4 rounded-xl bg-[${designatedColor.GRAY4}] my-2 h-15`}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RcdHomeScreen;
