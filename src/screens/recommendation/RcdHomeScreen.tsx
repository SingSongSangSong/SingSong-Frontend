import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import rcdNavigations from '../../constants/RcdConstants';
import tw from 'twrnc';
import getSongs from '../../api/getSongs';
import {Song} from '../../types/songs';
import CustomRemovableTag from '../../components/CustomRemovableTag';
import CustomTag from '../../components/CustomTag';
import CustomButton from '../../components/CustomButton';
import getInitSongs from '../../api/getInitSongs';
import useRecommendStore from '../../store/useRecommendStore';

type RcdHomeScreenProps = StackScreenProps<
  rcdStackParamList,
  typeof rcdNavigations.RCD_HOME
>;

function RcdHomeScreen({route, navigation}: RcdHomeScreenProps) {
  const tag = route.params; //초기 태그 (ex. 고음지르기)
  const [songLst, setSongLst] = useState<Song[]>([]);
  const [tags, setTags] = useState<string[]>([tag.tag]); //tagLst 초기화
  const [loading, setLoading] = useState(true);
  // const [draggedSong, setDraggedSong] = useState<Song | null>(null);
  const {selectedSong, setSelectedSong, reset} = useRecommendStore();
  // const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchInitData(tags);
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      reset();
    });

    return unsubscribe;
  }, [navigation, tags, reset]);

  const fetchInitData = async (tags: string[]) => {
    //tagLst를 이용해서 노래 받아오기
    try {
      setLoading(true);
      const [songData] = await Promise.all([getInitSongs({tags})]);
      setSongLst(songData.songs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const fetchUpdatedData = async (songNumber: number, tags: string[]) => {
    try {
      setLoading(true);
      const [songData] = await Promise.all([getSongs({songNumber, tags})]);
      setSongLst(songData.songs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const handleSongPress = (item: Song) => {
    setSelectedSong(item);
  };

  const handleTagRemove = (index: number) => {
    if (selectedSong) {
      const updatedTags = selectedSong.tags.filter((_, i) => i !== index);
      setSelectedSong({...selectedSong, tags: updatedTags});
    }
  };

  const handleApplyTag = () => {
    // fetchUpdatedData(draggedSong.song_number, tags);
    if (selectedSong) {
      fetchUpdatedData(selectedSong.song_number, selectedSong.tags);
    } else {
      // setShowPopup(true); // 노래가 선택되지 않은 경우 팝업 메시지 표시
      // setTimeout(() => setShowPopup(false), 3000); // 3초 후 팝업 메시지 숨기기
      console.log('error...rr..');
    }
  };

  const renderItem = ({item}: {item: Song}) => (
    <TouchableOpacity onPress={() => handleSongPress(item)}>
      <View style={tw`bg-gray-800 m-2 border rounded-lg`}>
        <Text style={tw`text-white`}>{item.song_name}</Text>
        <Text style={tw`text-white`}>{item.singer_name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <View style={tw`flex-row flex-wrap mt-2 justify-center items-center`}>
          {tags.map((tg, index) => (
            <CustomTag key={index} tag={tg} index={index} />
          ))}
        </View>

        <View style={tw`flex-1 h-[50%]`}>
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <FlatList
              data={songLst}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              style={tw`h-[50%]`}
              contentContainerStyle={tw`flex-grow`}
            />
          )}
        </View>
        <View style={tw`w-full p-4 bg-gray-100 h-[50%]`}>
          <Text style={tw`text-center`}>Drag Here</Text>
          {selectedSong ? (
            <View style={tw`w-full bg-pink-200 p-4 mt-4 rounded-lg`}>
              <Text style={tw`text-lg font-bold`}>
                {selectedSong.song_name}
              </Text>
              <Text style={tw`text-base mb-2`}>{selectedSong.singer_name}</Text>
              <View style={tw`flex-row flex-wrap`}>
                {selectedSong.tags.map((tg, index) => (
                  <View key={index} style={tw`mb-1`}>
                    <CustomRemovableTag
                      tag={tg}
                      index={index}
                      onRemove={handleTagRemove}
                    />
                  </View>
                ))}
              </View>
              <CustomButton title="적용" onPress={handleApplyTag} width={200} />
            </View>
          ) : (
            <View style={tw`w-full mt-4`}>
              <Text style={tw`text-center text-gray-500`}>
                노래를 클릭해보세요
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
// container: {
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: 'white',
// },
// buttonsContainer: {
//   flexDirection: 'row',
//   flexWrap: 'wrap',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width: '100%',
//   marginVertical: 20,
// },
// header: {
//   fontSize: 24,
//   fontWeight: 'bold',
//   marginBottom: 16,
// },
// item: {
//   backgroundColor: 'white',
//   padding: 15,
//   marginVertical: 8,
//   marginHorizontal: 16,
//   borderRadius: 10,
//   borderColor: 'black',
//   borderWidth: 1,
// },
// title: {
//   fontSize: 14,
//   fontWeight: 'bold',
// },
// subtitle: {
//   fontSize: 10,
//   color: '#555',
// },
// listContainer: {
//   flex: 1,
// },
// headerText: {
//   fontWeight: 'bold',
//   fontSize: 16,
//   textAlign: 'center',
//   marginVertical: 10,
// },
// dragZone: {
//   height: 100,
//   backgroundColor: 'lightgrey',
//   justifyContent: 'center',
//   alignItems: 'center',
// },
// dragZoneText: {
//   fontSize: 20,
//   fontWeight: 'bold',
// },
// draggedSongInfo: {
//   marginTop: 10,
//   alignItems: 'center',
// },
// });

export default RcdHomeScreen;

// import {
//   SafeAreaView,
//   Text,
//   StyleSheet,
//   View,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {rcdStackParamList} from '../../navigation/RcdStackNavigator';
// import {StackScreenProps} from '@react-navigation/stack';
// import rcdNavigations from '../../constants/RcdConstants';
// // import tw from 'twrnc';
// import getSongs from '../../api/getSong';
// import {Song} from '../../types/songs';
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
// } from 'react-native-reanimated';

// type RcdHomeScreenProps = StackScreenProps<
//   rcdStackParamList,
//   typeof rcdNavigations.RCD_HOME
// >;

// function RcdHomeScreen({route, navigation}: RcdHomeScreenProps) {
//   const tag = route.params;
//   const [songLst, setSongLst] = useState<Song[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [draggedSong, setDraggedSong] = useState<Song | null>(null); // 드래그된 곡 상태
//   const translateY = useSharedValue(0);
//   const translateX = useSharedValue(0);
//   const previousY = useSharedValue(0);
//   const previousX = useSharedValue(0);
//   const dragZoneActive = useSharedValue(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [songData] = await Promise.all([getSongs(tag)]);
//         setSongLst(songData.songs);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching songs:', error);
//         setLoading(false);
//       }
//     };

//     setLoading(true);
//     fetchData();
//   }, [navigation, tag]);

//   const gestureHandler = (item: Song) =>
//     Gesture.Pan()
//       .onBegin(() => {
//         previousY.value = translateY.value;
//         previousX.value = translateX.value;
//         runOnJS(setDraggedSong)(item); // 드래그 시작 시 곡 설정
//       })
//       .onChange(event => {
//         translateY.value = previousY.value + event.translationY;
//         translateX.value = previousX.value + event.translationX;
//       })
//       .onEnd(() => {
//         if (translateY.value > dragZoneActive.value) {
//           runOnJS(setDraggedSong)(item);
//         }
//         translateY.value = withSpring(0);
//         translateX.value = withSpring(0);
//       });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{translateY: translateY.value}, {translateX: translateX.value}],
//   }));

//   const renderItem = ({item}: {item: Song}) => (
//     <GestureDetector gesture={gestureHandler(item)}>
//       <Animated.View style={[styles.item, animatedStyle]}>
//         <Text style={styles.title}>{item.song_name}</Text>
//         <Text style={styles.subtitle}>{item.singer_name}</Text>
//       </Animated.View>
//     </GestureDetector>
//   );

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <SafeAreaView style={styles.container}>
//         <View
//           style={styles.dragZone}
//           onLayout={e => {
//             const layout = e.nativeEvent.layout;
//             dragZoneActive.value = layout.y;
//           }}>
//           <Text style={styles.dragZoneText}>Drag Here</Text>
//           {draggedSong && (
//             <View style={styles.draggedSongInfo}>
//               <Text>{draggedSong.song_name}</Text>
//               <Text>{draggedSong.singer_name}</Text>
//             </View>
//           )}
//         </View>
//         <View style={styles.listContainer}>
//           <Text style={styles.headerText}>Finding songs for tag</Text>
//           {loading ? (
//             <ActivityIndicator size="small" color="black" />
//           ) : (
//             <FlatList
//               data={songLst}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={renderItem}
//             />
//           )}
//         </View>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     marginVertical: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   item: {
//     backgroundColor: 'white',
//     padding: 15,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     borderRadius: 10,
//     borderColor: 'black',
//     borderWidth: 1,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   subtitle: {
//     fontSize: 10,
//     color: '#555',
//   },
//   listContainer: {
//     flex: 1,
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   dragZone: {
//     height: 100,
//     backgroundColor: 'lightgrey',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dragZoneText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   draggedSongInfo: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
// });

// export default RcdHomeScreen;
