import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, View, Platform} from 'react-native';
import {KeepSongsList} from '../../components';
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
        {keepHandler.isKeepLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="small" color={designatedColor.VIOLET} />
          </View>
        ) : (
          <View>
            {keepHandler.keepList.length > 0 ? (
              <KeepSongsList
                songlistData={keepHandler.keepList}
                isShowKeepIcon={false}
                onSongPress={_onSongPress}
              />
            ) : (
              <View style={tw`h-full w-full justify-center items-center`}>
                <CustomText
                  style={tw`text-[${designatedColor.PINK2}] font-bold`}>
                  KEEP이 비어있어요
                </CustomText>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default KeepScreen;
