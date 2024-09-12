import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import KeepIcon from '../../assets/svg/keepIcon.svg';
import KeepFilledIcon from '../../assets/svg/keepFilledIcon.svg';
import MusicIcon from '../../assets/svg/music.svg';
import {useFocusEffect} from '@react-navigation/native';
import {CommonTag} from '../tag/CommonTag';
// import {Swipeable} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
// import Swipeable from 'react-native-gesture-handler/Swipeable';

interface SongItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  isKeep: boolean | undefined;
  isShowKeepIcon: boolean;
  isMr?: boolean;
  onSongPress: () => void;
  onKeepAddPress?: () => void | undefined;
  onKeepRemovePress?: () => void | undefined;
}

const SongItem = ({
  songId,
  songNumber,
  songName,
  singerName,
  album = '',
  isKeep = true,
  isShowKeepIcon,
  isMr = false,
  onSongPress,
  onKeepAddPress = () => {},
  onKeepRemovePress = () => {},
}: SongItemProps) => {
  const [isKeepPressed, setIsKeepPressed] = useState(isKeep);
  const [isPressed, setIsPressed] = useState(false);

  // 포커스가 돌아올 때마다 isPressed 초기화
  useFocusEffect(
    useCallback(() => {
      setIsPressed(false);
    }, []),
  );

  const handleOnKeepPress = () => {
    if (isKeepPressed) {
      onKeepRemovePress();
      setIsKeepPressed(!isKeepPressed);
    } else {
      onKeepAddPress();
      setIsKeepPressed(!isKeepPressed);
    }
  };

  const handleOnPress = () => {
    if (!isPressed) {
      setIsPressed(true);
      onSongPress();
    }
  };

  const renderLeftActions = () => (
    <View
      style={tw`flex-row items-center bg-[${designatedColor.BACKGROUND_BLACK}] justify-center w-16`}>
      <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
        {isKeepPressed ? (
          <KeepFilledIcon width={24} height={24} />
        ) : (
          <KeepIcon width={24} height={24} />
        )}
      </TouchableOpacity>
    </View>
  );

  // const renderLeftActions = (progress, dragX) => {
  //   const scale = dragX.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: [0, 1],
  //     extrapolate: 'clamp',
  //   });

  //   return (
  //     <Animated.View
  //       style={[
  //         tw`flex-row items-center justify-center bg-[${designatedColor.PINK}]`,
  //         {transform: [{scale}]},
  //       ]}>
  //       <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
  //         {isKeepPressed ? (
  //           <KeepFilledIcon width={24} height={24} />
  //         ) : (
  //           <KeepIcon width={24} height={24} />
  //         )}
  //       </TouchableOpacity>
  //     </Animated.View>
  //   );
  // };

  return (
    // <Swipeable renderLeftActions={renderLeftActions}>
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      overshootLeft={false}
      renderLeftActions={renderLeftActions}>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.9}>
        <View
          style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
          <View style={tw`flex-row flex-1`}>
            <View style={tw`items-center justify-center w-[12] h-[12]`}>
              {album == '' ? (
                <View
                  style={[
                    {
                      backgroundColor: 'rgba(0, 0, 0, 1)',
                      width: 54,
                      height: 54,
                    },
                    tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY3}]`,
                  ]}>
                  <MusicIcon width={16} height={16} />
                </View>
              ) : (
                <Image
                  source={{uri: album}}
                  style={tw`w-full h-full rounded-sm`}
                />
              )}
            </View>

            <View style={tw`flex-1 h-full ml-4 mr-2`}>
              <View style={tw`flex-row items-center`}>
                <Text
                  style={tw`text-white text-sm text-[${designatedColor.PINK2}]`}>
                  {songNumber}
                </Text>
                {isMr ? (
                  <CommonTag name="MR" color={designatedColor.PURPLE} />
                ) : (
                  <View style={tw`mx-1`} />
                )}
                <Text
                  style={tw`text-white text-sm flex-1`}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {songName}
                </Text>
              </View>
              <Text
                style={tw`text-white text-sm mt-1 flex-1 text-[${designatedColor.GRAY2}]`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {singerName}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export {SongItem};
