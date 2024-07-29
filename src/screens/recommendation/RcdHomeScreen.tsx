import {SafeAreaView, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import useSong from '../../hooks/useSong';
import {AddTextButton} from '../../components';
import {RouteProp} from '@react-navigation/native';
import {homeStackNavigations} from '../../constants';

type RcdHomeScreenProps = {
  route: RouteProp<HomeStackParamList, typeof homeStackNavigations.RCD_DETAIL>;
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.RCD_DETAIL
  >;
};

function RcdHomeScreen({route, navigation}: RcdHomeScreenProps) {
  const initTag = route.params.tag; //초기 카테고리
  const songHandler = useSong([initTag]);

  const unsubscribe = navigation.addListener('beforeRemove', () => {
    songHandler.resetIndexLst(initTag);
    songHandler.reset();
  });

  useEffect(() => {
    if (songHandler.songLst.length == 0) {
      // songHandler.fetchInitData(); //초기 카테고리에 대한 노래 리스트
      songHandler.handlePressButton();
    }
    return unsubscribe;
  }, [songHandler, unsubscribe]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#151515]`}>
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
          {!songHandler.loading && (
            <>
              <FlatList
                data={songHandler.showData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={songHandler.handleSonglist}
                style={tw`h-[50%]`}
                contentContainerStyle={tw`flex-grow`}
              />
              <AddTextButton
                title="새로고침"
                onPress={songHandler.handlePressButton}
                isCenter={true}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default RcdHomeScreen;
