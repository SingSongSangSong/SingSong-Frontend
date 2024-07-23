import {SafeAreaView, Text, View, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import useSong from '../../hooks/useSong';
import {AddTextButton} from '../../components';
import {RouteProp} from '@react-navigation/native';
import {homeStackNavigations} from '../../constants';
import {ToggleButton} from '../../components/button/ToggleButton';

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
      songHandler.fetchInitData(); //초기 카테고리에 대한 노래 리스트
    }
    return unsubscribe;
  }, [songHandler, unsubscribe]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#151515]`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row items-center m-4`}>
          <ToggleButton
            isEnabled={songHandler.isEnabled}
            toggleSwitch={songHandler.toggleSwitch}
          />
          <Text style={tw`text-white ml-2 font-bold`}>
            {songHandler.isEnabled ? '탐색' : `${initTag}`}
          </Text>
        </View>

        <View style={tw`flex-1 h-[50%]`}>
          {!songHandler.loading && (
            <>
              {/* <View
                style={tw`flex-row flex-wrap m-2 justify-center items-center`}>
                <CustomTag tag={initTag} index={0} />
                <Text style={tw`text-white ml-2 font-bold text-sm`}>
                  와 관련된 노래 리스트에요
                </Text>
              </View> */}
              <FlatList
                data={songHandler.showData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={songHandler.handleSonglist}
                style={tw`h-[50%]`}
                contentContainerStyle={tw`flex-grow`}
              />
              <AddTextButton
                title={songHandler.isEnabled ? '탐색하기' : '새로고침'}
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
