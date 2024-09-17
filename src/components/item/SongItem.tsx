import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';
import tw from 'twrnc';
import {useSharedValue} from 'react-native-reanimated';
import {designatedColor} from '../../constants';
import MusicIcon from '../../assets/svg/music.svg';
import {CommonTag} from '../tag/CommonTag';
import KeepFilledIcon from '../../assets/svg/keepFilledIcon.svg';
import KeepIcon from '../../assets/svg/keepIcon.svg';
import MoreVerticalIcon from '../../assets/svg/moreVertical.svg';
import CommentIcon from '../../assets/svg/commentGray.svg';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextButton} from '..';
import {useFocusEffect} from '@react-navigation/native';

interface SongItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  isKeep: boolean | undefined;
  isShowKeepIcon: boolean;
  isMr?: boolean;
  keepCount?: number;
  commentCount?: number;
  isShowInfo?: boolean;
  // setIsModalVisible?: (value: boolean) => void;
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
  keepCount = 0,
  commentCount = 0,
  isShowInfo = true,
  onSongPress,
  onKeepAddPress = () => {},
  onKeepRemovePress = () => {},
}: // setIsModalVisible,
SongItemProps) => {
  const [isKeepPressed, setIsKeepPressed] = useState(isKeep);
  const [isPressed, setIsPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [keepCounts, setKeepCounts] = useState<number>(keepCount);

  const dragX = useSharedValue(0);
  useFocusEffect(
    useCallback(() => {
      setIsPressed(false);
    }, []),
  );

  const handleOnKeepPress = () => {
    if (isKeepPressed) {
      onKeepRemovePress();
      setIsKeepPressed(!isKeepPressed);
      setKeepCounts(keepCounts - 1);
    } else {
      onKeepAddPress();
      setIsKeepPressed(!isKeepPressed);
      setKeepCounts(keepCounts + 1);
    }
  };

  const handleOnPress = () => {
    if (!isPressed) {
      setIsPressed(true);
      onSongPress();
    }
  };

  const insets = useSafeAreaInsets();

  return (
    <>
      <TouchableOpacity onPress={handleOnPress} activeOpacity={0.9}>
        <View
          style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`items-center justify-center w-[16] h-[16]`}>
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
              <View style={tw`flex-row items-center mt-2 justify-between`}>
                <View style={tw`flex-row items-center flex-1`}>
                  <View
                    style={tw`px-2 py-0.3 rounded-full items-center justify-center bg-[${designatedColor.GRAY5}]`}>
                    <Text style={tw`text-white text-[3] text-white`}>
                      {songNumber}
                    </Text>
                  </View>
                  {isShowKeepIcon && (
                    <TouchableOpacity
                      onPress={handleOnKeepPress}
                      activeOpacity={0.8}
                      style={tw`px-2`}>
                      {isKeepPressed ? (
                        <KeepFilledIcon width={14} height={14} />
                      ) : (
                        <KeepIcon width={14} height={14} />
                      )}
                    </TouchableOpacity>
                  )}
                  {isMr ? (
                    <CommonTag name="MR" color={designatedColor.PURPLE} />
                  ) : (
                    <View />
                  )}
                  <Text
                    style={tw`text-white text-sm flex-1`}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {songName}
                  </Text>
                </View>

                {/* <TouchableOpacity
                  style={tw`p-3 w-[6]`}
                  onPress={() => {
                    setIsModalVisible(true);
                  }}>
                  <MoreVerticalIcon width={16} height={16} />
                </TouchableOpacity> */}
              </View>
              <View style={tw`flex-row items-center mt-1 ml-1`}>
                <Text
                  style={tw`text-white text-sm flex-1 text-[${designatedColor.GRAY2}]`}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {singerName}
                </Text>
                {isShowInfo && (
                  <>
                    {isShowKeepIcon && (
                      <TouchableOpacity
                        onPress={handleOnKeepPress}
                        activeOpacity={0.8}
                        style={tw`p-2`}>
                        {isKeepPressed ? (
                          <View style={tw`flex-row items-center`}>
                            <KeepFilledIcon width={12} height={12} />
                            <Text
                              style={tw`text-white text-[3] text-[${designatedColor.PINK}] ml-1`}>
                              {keepCounts}
                            </Text>
                          </View>
                        ) : (
                          <View style={tw`flex-row items-center`}>
                            <KeepIcon width={12} height={12} />
                            <Text
                              style={tw`text-white text-[3] text-[${designatedColor.GRAY3}] ml-1`}>
                              {keepCounts}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    )}

                    <View style={tw`flex-row items-center`}>
                      <CommentIcon width={12} height={12} />
                      <Text
                        style={tw`text-white text-[3] text-[${designatedColor.GRAY3}] ml-1`}>
                        {commentCount}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        style={[
          {
            justifyContent: 'flex-end',
            margin: 0,
          },
          Platform.OS == 'ios' && {paddingBottom: insets.bottom},
        ]}>
        <View style={tw`bg-black w-full px-4`}>
          <Text style={tw`text-white font-bold text-xl my-4`}>곡 정보</Text>
          <View
            style={tw`items-start border-b border-[${designatedColor.GRAY4}] py-4`}>
            <View style={tw`items-start mb-3`}>
              <TextButton
                title="KEEP에 추가"
                onPress={handleOnKeepPress}
                color="white"
                size={4}
              />
            </View>
          </View>
          <View style={tw`py-4`}>
            <TextButton
              title="닫기"
              onPress={() => {
                setIsModalVisible(false);
              }}
              color="white"
              size={4}
            />
          </View>
        </View>
      </Modal> */}
    </>
  );
};

export {SongItem};

// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, Image} from 'react-native';
// import tw from 'twrnc';
// // import Animated, {
// //   useAnimatedStyle,
// //   interpolate,
// //   Extrapolation,
// // } from 'react-native-reanimated';
// import {useSharedValue} from 'react-native-reanimated';
// import {designatedColor} from '../../constants';
// import MusicIcon from '../../assets/svg/music.svg';
// // import KeepIcon from '../../assets/svg/keepIcon.svg';
// // import KeepFilledWhiteIcon from '../../assets/svg/keepFilledWhite.svg';
// import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
// import {CommonTag} from '../tag/CommonTag';
// import LeftActionItem from './LeftActionItem';

// interface SongItemProps {
//   songId: number;
//   songNumber: number;
//   songName: string;
//   singerName: string;
//   album: string | undefined;
//   isKeep: boolean | undefined;
//   isShowKeepIcon: boolean;
//   isMr?: boolean;
//   onSongPress: () => void;
//   onKeepAddPress?: () => void | undefined;
//   onKeepRemovePress?: () => void | undefined;
// }

// const SongItem = ({
//   songId,
//   songNumber,
//   songName,
//   singerName,
//   album = '',
//   isKeep = true,
//   isShowKeepIcon,
//   isMr = false,
//   onSongPress,
//   onKeepAddPress = () => {},
//   onKeepRemovePress = () => {},
// }: SongItemProps) => {
//   const [isKeepPressed, setIsKeepPressed] = useState(isKeep);
//   const [isPressed, setIsPressed] = useState(false);

//   const dragX = useSharedValue(0);

//   const handleOnKeepPress = () => {
//     if (isKeepPressed) {
//       onKeepRemovePress();
//       setIsKeepPressed(!isKeepPressed);
//     } else {
//       onKeepAddPress();
//       setIsKeepPressed(!isKeepPressed);
//     }
//   };

//   const handleOnPress = () => {
//     if (!isPressed) {
//       setIsPressed(true);
//       onSongPress();
//     }
//   };

//   // const renderLeftActions = (progress, dragX) => {
//   //   const animatedStyle = useAnimatedStyle(() => {
//   //     // Interpolating opacity to hide the action initially
//   //     const opacity = interpolate(
//   //       dragX.value,
//   //       [0, 50], // Opacity will be 0 initially and start increasing
//   //       [0, 1],
//   //       Extrapolation.CLAMP,
//   //     );
//   //     return {
//   //       opacity, // Dynamically changing opacity
//   //     };
//   //   });

//   //   return (
//   //     <Animated.View
//   //       style={[
//   //         tw`flex-row items-center bg-[${designatedColor.PINK}] justify-center w-16`,
//   //         animatedStyle, // Apply animated style
//   //       ]}>
//   //       <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
//   //         {isKeepPressed ? (
//   //           <KeepFilledWhiteIcon width={24} height={24} />
//   //         ) : (
//   //           <KeepIcon width={24} height={24} />
//   //         )}
//   //       </TouchableOpacity>
//   //     </Animated.View>
//   //   );
//   // };

//   return isShowKeepIcon ? (
//     <Swipeable
//       friction={2}
//       leftThreshold={60}
//       overshootLeft={false}
//       onSwipeableWillOpen={() => (dragX.value = 1)}
//       onSwipeableClose={() => (dragX.value = 0)}
//       renderLeftActions={(progress, dragX) => (
//         <LeftActionItem
//           dragX={dragX}
//           handleOnKeepPress={handleOnKeepPress}
//           isKeepPressed={isKeepPressed}
//         />
//       )}>
//       <TouchableOpacity onPress={handleOnPress} activeOpacity={0.9}>
//         <View
//           style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
//           <View style={tw`flex-row flex-1`}>
//             <View style={tw`items-center justify-center w-[12] h-[12]`}>
//               {album === '' ? (
//                 <View
//                   style={[
//                     {
//                       backgroundColor: 'rgba(0, 0, 0, 1)',
//                       width: 54,
//                       height: 54,
//                     },
//                     tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY3}]`,
//                   ]}>
//                   <MusicIcon width={16} height={16} />
//                 </View>
//               ) : (
//                 <Image
//                   source={{uri: album}}
//                   style={tw`w-full h-full rounded-sm`}
//                 />
//               )}
//             </View>

//             <View style={tw`flex-1 h-full ml-4 mr-2`}>
//               <View style={tw`flex-row items-center`}>
//                 <Text
//                   style={tw`text-white text-sm text-[${designatedColor.PINK2}]`}>
//                   {songNumber}
//                 </Text>
//                 {isMr ? (
//                   <CommonTag name="MR" color={designatedColor.PURPLE} />
//                 ) : (
//                   <View style={tw`mx-1`} />
//                 )}
//                 <Text
//                   style={tw`text-white text-sm flex-1`}
//                   numberOfLines={1}
//                   ellipsizeMode="tail">
//                   {songName}
//                 </Text>
//               </View>
//               <Text
//                 style={tw`text-white text-sm mt-1 flex-1 text-[${designatedColor.GRAY2}]`}
//                 numberOfLines={1}
//                 ellipsizeMode="tail">
//                 {singerName}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </Swipeable>
//   ) : (
//     <TouchableOpacity onPress={handleOnPress} activeOpacity={0.9}>
//       <View
//         style={tw`flex-row items-center justify-between border-b-[0.5px] border-[${designatedColor.GRAY5}] py-4 px-2 mx-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
//         <View style={tw`flex-row flex-1`}>
//           <View style={tw`items-center justify-center w-[12] h-[12]`}>
//             {album === '' ? (
//               <View
//                 style={[
//                   {
//                     backgroundColor: 'rgba(0, 0, 0, 1)',
//                     width: 54,
//                     height: 54,
//                   },
//                   tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY3}]`,
//                 ]}>
//                 <MusicIcon width={16} height={16} />
//               </View>
//             ) : (
//               <Image
//                 source={{uri: album}}
//                 style={tw`w-full h-full rounded-sm`}
//               />
//             )}
//           </View>

//           <View style={tw`flex-1 h-full ml-4 mr-2`}>
//             <View style={tw`flex-row items-center`}>
//               <Text
//                 style={tw`text-white text-sm text-[${designatedColor.PINK2}]`}>
//                 {songNumber}
//               </Text>
//               {isMr ? (
//                 <CommonTag name="MR" color={designatedColor.PURPLE} />
//               ) : (
//                 <View style={tw`mx-1`} />
//               )}
//               <Text
//                 style={tw`text-white text-sm flex-1`}
//                 numberOfLines={1}
//                 ellipsizeMode="tail">
//                 {songName}
//               </Text>
//             </View>
//             <Text
//               style={tw`text-white text-sm mt-1 flex-1 text-[${designatedColor.GRAY2}]`}
//               numberOfLines={1}
//               ellipsizeMode="tail">
//               {singerName}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export {SongItem};
