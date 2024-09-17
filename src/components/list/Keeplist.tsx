import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import tw from 'twrnc';
import {KeeplistItem} from '..';
import {KeepSong} from '../../types';
import CustomText from '../text/CustomText';

interface KeeplistProps {
  keeplistData: {[key: number]: KeepSong} | null;
  onPress: () => void;
}

const Keeplist: React.FC<KeeplistProps> = ({keeplistData, onPress}) => {
  return (
    <>
      {keeplistData && Object.keys(keeplistData).length > 0 ? (
        <ScrollView
          contentContainerStyle={tw`flex-wrap flex-row`}
          style={tw`w-full h-full`}>
          {Object.keys(keeplistData).map(key => {
            const song = keeplistData ? keeplistData[Number(key)] : null;
            return (
              song && (
                <KeeplistItem
                  key={Number(key)}
                  songNumber={song.songNumber}
                  songName={song.songName}
                  singerName={song.singerName}
                  onPress={onPress}
                />
              )
            );
          })}
        </ScrollView>
      ) : (
        <View style={tw`w-full h-full justify-center items-center`}>
          <CustomText style={tw`text-white`}>저장한 노래가 없어요</CustomText>
        </View>
      )}
    </>
  );
};

export {Keeplist};
