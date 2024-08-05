import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
// import {RouteProp} from '@react-navigation/native';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
} from '../../constants';
import useSongDetail from '../../hooks/useSongDetail';
import MusicIcon from '../../assets/svg/music.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {OutlineButton} from '../../components';

type SongScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_SONG_DETAIL
    >
  | StackScreenProps<
      HomeStackParamList,
      typeof homeStackNavigations.SONG_DETAIL
    >;

function SongScreen({route, navigation}: SongScreenProps) {
  const songNumber = route?.params?.songNumber; //초기 카테고리
  const songDetailHandler = useSongDetail(songNumber);

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {songDetailHandler.songInfo && (
        <View>
          <View style={tw`justify-center items-center overflow-hidden`}>
            <View style={tw`w-full h-30 bg-[${designatedColor.GRAY}]`} />
            <View style={tw`w-full h-30 bg-black`} />
            <View
              style={tw`absolute top-5 w-50 h-50 bg-[${designatedColor.GRAY4}] rounded-lg justify-center items-center`}>
              <MusicIcon width={64} height={64} />
            </View>
          </View>
          <View style={tw`mx-4`}>
            <View style={tw`flex-row items-center mt-3`}>
              <Text
                style={tw`text-white text-2xl text-[${designatedColor.GREEN}] font-bold`}>
                {songDetailHandler.songInfo.songNumber}
              </Text>
              <Text style={tw`text-white text-3xl ml-4`}>
                {songDetailHandler.songInfo.songName}
              </Text>
            </View>

            <Text style={tw`text-white mt-4`}>
              {songDetailHandler.songInfo.singerName}
            </Text>
            <View style={tw`flex-row items-center mt-4`}>
              <Text style={tw`text-white mr-2`}>최고 음역대 </Text>
              {songDetailHandler.songInfo.octave == '' ? (
                <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>
                  없음
                </Text>
              ) : (
                <Text style={tw`text-[${designatedColor.GREEN}]`}>
                  {songDetailHandler.songInfo.octave}
                </Text>
              )}
            </View>
            <Text style={tw`text-[${designatedColor.GREEN}] mt-2`}>
              {songDetailHandler.songInfo.description}
            </Text>
            <View style={tw`flex-row justify-between mt-6 items-center`}>
              <TouchableOpacity onPress={songDetailHandler.handleOnPressKeep}>
                <Icon
                  name="star"
                  size={24}
                  color={songDetailHandler.keepColor}
                />
              </TouchableOpacity>
              <OutlineButton
                title="미리듣기"
                onPress={() => {}}
                color={designatedColor.GREEN}
              />
            </View>

            {/* <View style={tw`flex-row justify-around w-full mt-4 px-6`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-white`}>⭐ 62</Text>
              </View>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-white`}>💬 2</Text>
              </View>
            </View> */}
            {/*
            <View style={tw`flex-row mt-4`}>
              <TouchableOpacity style={tw`bg-gray-700 p-2 rounded-full mx-2`}>
                <Text style={tw`text-white`}>⭐</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-gray-700 p-2 rounded-full mx-2`}>
                <Text style={tw`text-white`}>🔗</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-green-500 p-2 rounded-full mx-2`}>
                <Text style={tw`text-white`}>미리듣기</Text>
              </TouchableOpacity>
            </View> */}

            {/* <View style={tw`mt-8 p-4`}>
            <Text style={tw`text-white text-lg mb-4`}>이 노래는 어땡송</Text>
            <View style={tw`bg-gray-800 p-4 rounded-lg mb-4`}>
              <Text style={tw`text-white`}>노래가 너무 높아요.</Text>
              <Text style={tw`text-white text-right`}>999</Text>
            </View>
            <View style={tw`bg-gray-800 p-4 rounded-lg mb-4`}>
              <Text style={tw`text-white`}>쉬운 줄 알았지만 어려워요.</Text>
              <Text style={tw`text-white text-right`}>35</Text>
            </View>
            <View style={tw`bg-gray-800 p-4 rounded-lg mb-4`}>
              <Text style={tw`text-white`}>부를만 해요.</Text>
              <Text style={tw`text-white text-right`}>2</Text>
            </View>
          </View> */}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default SongScreen;
