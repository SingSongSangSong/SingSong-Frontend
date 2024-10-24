import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Platform} from 'react-native';
import {KeepSongsV2List} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
import {designatedColor, keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from '../../components/text/CustomText';

type KeepScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP
>;

function KeepScreen(props: KeepScreenProps) {
  const keepHandler = useKeep();

  useEffect(() => {
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
    logButtonClick('keep_song_button_click');
    amplitude.track('keep_song_button_click');
    props.navigation.push(keepStackNavigations.KEEP_SONG_DETAIL, {
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

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        Platform.OS === 'ios' && {
          // paddingBottom: 80,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={tw`w-full h-full pt-6`}>
        {keepHandler.isFetchingKeep ? (
          <View style={tw`flex-1 justify-center items-center`}>
            {/* <ActivityIndicator size="small" color={designatedColor.VIOLET} /> */}
          </View>
        ) : keepHandler.keepError ? (
          <View style={tw`h-full w-full justify-center items-center`}>
            <CustomText style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
              KEEP을 불러오는 중 에러가 발생했어요
            </CustomText>
          </View>
        ) : keepHandler.keepList && keepHandler.keepList.length > 0 ? (
          //KEEP이 에러가 발생하지 않은 경우
          // <View>
          //   {keepHandler.keepList && keepHandler.keepList.length > 0 ? (
          <KeepSongsV2List
            songs={keepHandler.keepList}
            handleRefreshKeep={keepHandler.handleDownRefreshKeep}
            onRefresh={keepHandler.onRefresh}
            isLoading={keepHandler.isLoading}
            refreshing={keepHandler.refreshing}
            onSongPress={_onSongPress}
          />
        ) : keepHandler.isLengthZero ? (
          //   ) : (
          //     <View style={tw`h-full w-full justify-center items-center`}>
          //       <CustomText
          //         style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
          //         KEEP이 비어있어요
          //       </CustomText>
          //     </View>
          //   )}
          // </View>
          <View style={tw`h-full w-full justify-center items-center`}>
            <CustomText style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
              KEEP이 비어있어요
            </CustomText>
          </View>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

export default KeepScreen;
