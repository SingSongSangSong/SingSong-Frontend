import {SafeAreaView, View, Text, TouchableOpacity, Image} from 'react-native';
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
import {IconButton, Relatedlist, Reviewlist} from '../../components';
import LikeIcon from '../../assets/svg/like.svg';
import FilledLikeIcon from '../../assets/svg/filledLike.svg';
import DislikeIcon from '../../assets/svg/dislike.svg';
import FilledDislikeIcon from '../../assets/svg/filledDislike.svg';
import {LikeButton} from '../../components/button/LikeButton';
import KeepIcon from '../../assets/svg/keepIcon.svg';
import KeepFilledIcon from '../../assets/svg/keepFilledIcon.svg';

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
  const {songNumber, songId, songName, singerName, album} =
    props.route?.params || {};
  // const songId = props.route?.params?.songId;
  const songDetailHandler = useSongDetail({
    songId,
    songNumber,
    songName,
    singerName,
    album,
  });

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
  ) => {
    console.log(songName, singerName, album);
    if ('navigate' in props.navigation) {
      if (props.route.name === keepStackNavigations.KEEP_SONG_DETAIL) {
        // KeepStack에서 왔을 때
        (
          props.navigation as StackScreenProps<KeepStackParamList>['navigation']
        ).push(keepStackNavigations.KEEP_SONG_DETAIL, {
          songId,
          songNumber,
          songName,
          singerName,
          album,
        });
      } else if (props.route.name === homeStackNavigations.SONG_DETAIL) {
        // HomeStack에서 왔을 때 처리
        (
          props.navigation as StackScreenProps<HomeStackParamList>['navigation']
        ).push(homeStackNavigations.SONG_DETAIL, {
          songId,
          songNumber,
          songName,
          singerName,
          album,
        });
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
        <View style={tw`border-b border-[${designatedColor.GRAY4}]`}>
          <View style={tw`justify-center items-center overflow-hidden`}>
            <View style={tw`w-full h-30 bg-[${designatedColor.GRAY}]`} />
            <View style={tw`w-full h-30 bg-black`} />

            {album == '' ? (
              <View
                style={tw`absolute top-5 w-50 h-50 bg-[${designatedColor.GRAY4}] rounded-lg justify-center items-center`}>
                <MusicIcon width={64} height={64} />
              </View>
            ) : (
              <View
                style={tw`absolute top-5 w-50 h-50 rounded-lg justify-center items-center`}>
                <Image
                  source={{uri: album}}
                  style={tw`w-50 h-50 rounded-md`}
                  resizeMode="cover" // 이미지가 크기에 맞게 잘리도록 조정
                />
              </View>
            )}
          </View>
          <View style={tw`pt-6 px-3 `}>
            <View style={tw`flex-row items-center mt-3`}>
              <Text
                style={tw`flex-1 text-white text-2xl font-bold`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {songName}
              </Text>
            </View>

            <View style={tw`flex-row items-center mt-2`}>
              <View style={tw`items-center justify-center`}>
                <Text style={tw`text-white text-[${designatedColor.PINK2}]`}>
                  {songNumber}
                </Text>
              </View>

              <Text
                style={tw`text-white mx-2`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {singerName}
              </Text>
            </View>

            {/* {songDetailHandler.songInfo ? ( */}
            <View style={tw`flex-row items-center mt-4`}>
              <Text style={tw`text-white mr-2`}>최고 음역대 </Text>
              {songDetailHandler.songInfo?.octave == '' ? (
                <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>
                  없음
                </Text>
              ) : (
                <Text style={tw`text-[${designatedColor.GREEN}]`}>
                  {songDetailHandler.songInfo?.octave}
                </Text>
              )}
            </View>
            {/* ) : (
              <View
                style={tw`bg-[${designatedColor.GRAY4}] w-[28] mt-4 h-6 rounded-lg`}
              />
            )} */}
          </View>
          <View
            style={tw`flex-row justify-between mt-6 items-center py-2 px-3`}>
            <View style={tw`flex-row items-center`}>
              {songDetailHandler.keepColor == designatedColor.KEEP_FILLED ? (
                <>
                  <TouchableOpacity
                    onPress={songDetailHandler.handleOnPressKeep}
                    style={tw`mr-4`}>
                    {/* <Icon
                  name="star"
                  size={24}
                  color={songDetailHandler.keepColor}
                /> */}
                    <KeepFilledIcon width={24} height={24} />
                  </TouchableOpacity>
                  <IconButton
                    Icon={CommentIcon}
                    onPress={() => {
                      handleOnPressComment(songNumber, songId);
                    }}
                    size={28}
                  />
                </>
              ) : (
                // <View style={tw`flex-row items-center`}>
                //   <View
                //     style={tw`w-10 h-10 bg-[${designatedColor.GRAY4}] rounded-xl mr-2`}
                //   />
                //   <View
                //     style={tw`w-10 h-10 bg-[${designatedColor.GRAY4}] rounded-xl`}
                //   />
                // </View>
                <>
                  <TouchableOpacity
                    onPress={songDetailHandler.handleOnPressKeep}
                    style={tw`mr-4`}>
                    {/* <Icon
                  name="star"
                  size={24}
                  color={songDetailHandler.keepColor}
                /> */}
                    <KeepIcon width={24} height={24} />
                  </TouchableOpacity>
                  <IconButton
                    Icon={CommentIcon}
                    onPress={() => {
                      handleOnPressComment(songNumber, songId);
                    }}
                    size={28}
                  />
                </>
              )}
            </View>
          </View>
        </View>

        <View style={tw`px-3`}>
          <View>
            <Text style={tw`text-white font-bold text-xl my-4`}>
              이 노래는 어떻송
            </Text>
            {songDetailHandler.songReviews ? (
              <Reviewlist
                reviewlistData={songDetailHandler.songReviews}
                // isLikePressed={songDetailHandler.isLikePressed}
                // isDislikePressed={songDetailHandler.isDislikePressed}
                // onAddPress={songDetailHandler.handleOnAddPressReviewlist}
                // onRemovePress={songDetailHandler.handleOnRemovePressReviewlist}
              />
            ) : (
              <View style={tw`my-2`}>
                <View
                  style={tw`w-full px-4 rounded-xl h-10 bg-[${designatedColor.GRAY4}] my-2`}
                />
                <View
                  style={tw`w-full px-4 rounded-xl h-10 bg-[${designatedColor.GRAY4}] my-2`}
                />
              </View>
            )}

            <View style={tw`flex-row items-center justify-between mx-2`}>
              <View style={tw`flex-row items-center`}>
                <MusicIcon width={18} height={18} />
                <Text style={tw`text-[${designatedColor.GRAY1}] ml-2 text-sm`}>
                  나의 평가는?
                </Text>
              </View>
              <View style={tw`flex-row`}>
                <LikeButton
                  title="쉬워요"
                  color={designatedColor.PINK}
                  onPress={() => {
                    songDetailHandler.handleOnAddPressReviewlist(1);
                  }}
                  Icon={LikeIcon}
                  PressIcon={FilledLikeIcon}
                  isPressed={songDetailHandler.isLikePressed}
                />
                <LikeButton
                  title="어려워요"
                  color={designatedColor.PINK}
                  onPress={() => {
                    songDetailHandler.handleOnAddPressReviewlist(2);
                  }}
                  Icon={DislikeIcon}
                  PressIcon={FilledDislikeIcon}
                  isPressed={songDetailHandler.isDislikePressed}
                />
              </View>
            </View>
            <View
              style={tw`mt-10 mb-4 border-t border-[${designatedColor.GRAY4}] py-4`}>
              <Text style={tw`text-white font-bold text-xl`}>
                다른 노래는 어떻송
              </Text>
            </View>
          </View>
          {/* ) : (
            <View>
              <View
                style={tw`w-20 h-7 bg-[${designatedColor.GRAY4}] rounded-xl mt-4 mb-2`}
              />
              <View
                style={tw`w-full px-4 rounded-xl h-10 bg-[${designatedColor.GRAY4}] mb-2`}
              />
              <View
                style={tw`w-full px-4 rounded-xl h-10 bg-[${designatedColor.GRAY4}]`}
              />

              <View
                style={tw`w-20 h-7 bg-[${designatedColor.GRAY4}] rounded-xl mt-4 mb-2`}
              />
            </View>
          )} */}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {/* {songDetailHandler.songRelated && ( */}
      <View style={tw`h-full w-full`}>
        {/* {songDetailHandler.songRelated && ( */}
        <Relatedlist
          isLoading={songDetailHandler.isLoading}
          relatedlistData={songDetailHandler.songRelated}
          isShowKeepIcon={false}
          onSongPress={_onSongPress}
          // handleOnPressRelated
          renderHeader={renderHeader}
          handleRefreshRelatedSongs={
            songDetailHandler.handleRefreshRelatedSongs
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default SongScreen;
