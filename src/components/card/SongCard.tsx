import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import MusicIcon from '../../assets/svg/music.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

type SongCardProps = {
  songName: string;
  singerName: string;
  songNumber: number;
  onSongPress: () => void;
};

const SongCard = ({
  songName,
  singerName,
  songNumber,
  onSongPress,
}: SongCardProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const cardWidth = deviceWidth * 0.4;

  return (
    <TouchableOpacity style={tw`mx-1`} onPress={onSongPress}>
      <View
        style={[
          {
            backgroundColor: 'rgba(0, 0, 0, 1)',
            width: cardWidth,
            height: cardWidth,
          },
          tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY4}]`,
        ]}>
        <MusicIcon width={40} height={40} />
      </View>
      <View style={tw`flex-row m-1`}>
        <View
          style={tw`px-3 py-0.5 border border-[${designatedColor.PINK2}] rounded-full`}>
          <Text style={tw`text-[${designatedColor.PINK2}] text-center text-3`}>
            {songNumber}
          </Text>
        </View>
      </View>
      <View style={tw`m-1 ml-2`}>
        <Text
          style={[
            tw`text-white text-3`,
            {width: cardWidth}, // 카드의 너비에 맞추어 텍스트 너비 설정
          ]}
          numberOfLines={1} // 최대 한 줄로 표시되도록 설정
          ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
        >
          {songName}
        </Text>
        <Text
          style={[
            tw`text-[${designatedColor.GRAY3}] text-3`,
            {width: cardWidth}, // 카드의 너비에 맞추어 텍스트 너비 설정
          ]}
          numberOfLines={1} // 최대 한 줄로 표시되도록 설정
          ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
        >
          {singerName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export {SongCard};
