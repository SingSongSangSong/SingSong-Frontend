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
import CommentIcon from '../../assets/svg/comment.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  IconButton,
  OutlineButton,
  Relatedlist,
  Reviewlist,
} from '../../components';

type SongScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_SONG_DETAIL
    >
  | StackScreenProps<
      HomeStackParamList,
      typeof homeStackNavigations.SONG_DETAIL
    >;

function SongScreen(props: SongScreenProps) {
  const songNumber = props.route?.params?.songNumber; //초기 카테고리
  const songId = props.route?.params?.songId;
  const songDetailHandler = useSongDetail(songNumber, songId);

  const handleOnPressRelated = (songNumber: number, songId: number) => {
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_SONG_DETAIL, {songNumber, songId});
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.SONG_DETAIL, {songNumber, songId});
      }
    }
  };

  const handleOnPressComment = (songNumber: number, songId: number) => {
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_COMMENT, {songNumber, songId});
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.COMMENT, {songNumber, songId});
      }
    }
  };

  const renderHeader = () => {
    return (
      <View>
        {songDetailHandler.songInfo && songDetailHandler.songReviews && (
          <View>
            <View style={tw`justify-center items-center overflow-hidden`}>
              <View style={tw`w-full h-30 bg-[${designatedColor.GRAY}]`} />
              <View style={tw`w-full h-30 bg-black`} />
              <View
                style={tw`absolute top-5 w-50 h-50 bg-[${designatedColor.GRAY4}] rounded-lg justify-center items-center`}>
                <MusicIcon width={64} height={64} />
              </View>
            </View>
            <View style={tw`px-4`}>
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
                <View style={tw`flex-row items-center`}>
                  <TouchableOpacity
                    onPress={songDetailHandler.handleOnPressKeep}
                    style={tw`mr-2`}>
                    <Icon
                      name="star"
                      size={24}
                      color={songDetailHandler.keepColor}
                    />
                  </TouchableOpacity>
                  <IconButton
                    Icon={CommentIcon}
                    onPress={() => {
                      handleOnPressComment(songNumber, songId);
                    }}
                    size={28}
                  />
                </View>

                <OutlineButton
                  title="미리듣기"
                  onPress={() => {}}
                  color={designatedColor.GREEN}
                />
              </View>
              <View>
                <Text style={tw`text-white font-bold text-lg mt-4 mb-2`}>
                  이 노래는 어떻송
                </Text>
                <Reviewlist
                  reviewlistData={songDetailHandler.songReviews}
                  onAddPress={songDetailHandler.handleOnAddPressReviewlist}
                  onRemovePress={
                    songDetailHandler.handleOnRemovePressReviewlist
                  }
                />
              </View>
              <View>
                <Text style={tw`text-white font-bold text-lg mb-2`}>
                  관련 노래
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {songDetailHandler.songRelated && (
        <View style={tw`h-full w-full`}>
          <Relatedlist
            isLoading={songDetailHandler.isLoading}
            relatedlistData={songDetailHandler.songRelated}
            onPress={handleOnPressRelated}
            renderHeader={renderHeader}
            handleRefreshRelatedSongs={
              songDetailHandler.handleRefreshRelatedSongs
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default SongScreen;
