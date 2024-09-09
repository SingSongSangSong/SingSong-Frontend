import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {ActivityIndicator, Text, View, Platform} from 'react-native';
import {SongsList} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
import {designatedColor, keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';
import {logButtonClick} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type KeepScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP
>;

function KeepScreen({navigation}: KeepScreenProps) {
  const keepHandler = useKeep();

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    logButtonClick('keep_song_button_click');
    amplitude.track('keep_song_button_click');
    navigation.push(keepStackNavigations.KEEP_SONG_DETAIL, {
      songId,
      songNumber,
      songName,
      singerName,
      album,
    });
  };

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        Platform.OS === 'ios' && {
          paddingBottom: 80,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={tw`w-full h-full pt-6`}>
        {keepHandler.isKeepLoading ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <ActivityIndicator size="small" color={designatedColor.PINK2} />
          </View>
        ) : (
          <View>
            {keepHandler.keepList.length > 0 ? (
              <SongsList
                songlistData={keepHandler.keepList}
                isShowKeepIcon={false}
                onSongPress={_onSongPress}
              />
            ) : (
              <View style={tw`h-full w-full justify-center items-center`}>
                <Text style={tw`text-[${designatedColor.PINK2}] font-bold`}>
                  Memo가 비어있어요
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

export default KeepScreen;
