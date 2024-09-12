import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import tw from 'twrnc';
// import Animated, {
//   useAnimatedStyle,
//   interpolate,
//   Extrapolation,
// } from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';
import {designatedColor} from '../../constants';
import MusicIcon from '../../assets/svg/music.svg';
// import KeepIcon from '../../assets/svg/keepIcon.svg';
// import KeepFilledWhiteIcon from '../../assets/svg/keepFilledWhite.svg';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {CommonTag} from '../tag/CommonTag';
import LeftActionItem from './LeftActionItem';

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

  const dragX = useSharedValue(0);

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

  // const renderLeftActions = (progress, dragX) => {
  //   const animatedStyle = useAnimatedStyle(() => {
  //     // Interpolating opacity to hide the action initially
  //     const opacity = interpolate(
  //       dragX.value,
  //       [0, 50], // Opacity will be 0 initially and start increasing
  //       [0, 1],
  //       Extrapolation.CLAMP,
  //     );
  //     return {
  //       opacity, // Dynamically changing opacity
  //     };
  //   });

  //   return (
  //     <Animated.View
  //       style={[
  //         tw`flex-row items-center bg-[${designatedColor.PINK}] justify-center w-16`,
  //         animatedStyle, // Apply animated style
  //       ]}>
  //       <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
  //         {isKeepPressed ? (
  //           <KeepFilledWhiteIcon width={24} height={24} />
  //         ) : (
  //           <KeepIcon width={24} height={24} />
  //         )}
  //       </TouchableOpacity>
  //     </Animated.View>
  //   );
  // };

  return (
    <Swipeable
      friction={2}
      leftThreshold={30}
      overshootLeft={false}
      onSwipeableWillOpen={() => (dragX.value = 1)}
      onSwipeableClose={() => (dragX.value = 0)}
      // renderLeftActions={renderLeftActions}
      renderLeftActions={(progress, dragX) => (
        <LeftActionItem
          dragX={dragX}
          handleOnKeepPress={handleOnKeepPress}
          isKeepPressed={isKeepPressed}
        />
      )}>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.9}>
        <View
          style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
          <View style={tw`flex-row flex-1`}>
            <View style={tw`items-center justify-center w-[12] h-[12]`}>
              {album === '' ? (
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
