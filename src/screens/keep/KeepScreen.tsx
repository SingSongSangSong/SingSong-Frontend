// import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
// import React from 'react';
// import {SafeAreaView, Text} from 'react-native';
// import {MainTabParamList} from '../../types';
// import {mainTabNavigations} from '../../constants';
// import useKeep from '../../hooks/useKeep';
// import {ButtonBar, Keeplist, Playlist, PlaylistItem} from '../../components';
// import tw from 'twrnc';
// import usePlaylist from '../../hooks/usePlaylist';

// type KeepScreenProps = BottomTabScreenProps<
//   MainTabParamList,
//   typeof mainTabNavigations.KEEP
// >;

// function KeepScreen({navigation}: KeepScreenProps) {
//   const keepHandler = useKeep();
//   const playlistHandler = usePlaylist();

//   return (
//     <SafeAreaView style={tw`flex-1 bg-black`}>
//       <Text style={tw`text-white font-bold text-xl m-5`}>Keep 보관함</Text>
//       <ButtonBar buttonItems={keepHandler.buttonItems} />
//       <Keeplist keeplistData={keepHandler.storedSong} onPress={() => {}} />
//       <PlaylistItem
//         playlistName="최근 추가한 노래"
//         playlistLen={'5'}
//         onPress={() => {}}
//       />
//        <Playlist
//             playlistData={playlistHandler.playlistData}
//             onPlayPress={handlePlayPress}
//           />
//     </SafeAreaView>
//   );
// }

// export default KeepScreen;
