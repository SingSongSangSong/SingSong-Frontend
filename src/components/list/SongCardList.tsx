// import React from 'react';
// import {ScrollView, Text, View} from 'react-native';
// import tw from 'twrnc';
// import {SongCard} from '..';
// import { KeepSong } from '../../types';

// type SongCardListProps = {
//   storedSong: {[key: number]: KeepSong} | null;
// };

// const SongCardList: React.FC<SongCardListProps> = ({storedSong}) => (
//   <View style={tw`h-[80%] p-1`}>
//     {/* s<Text style={tw`text-white text-lg pb-2 font-bold`}>2024년 7월 11일</Text> */}
//     {storedSong && Object.keys(storedSong).length > 0 ? (
//       <ScrollView
//         contentContainerStyle={tw`flex-wrap flex-row`}
//         style={tw`w-full h-full`}>
//         {Object.keys(storedSong).map(key => {
//           const song = storedSong ? storedSong[Number(key)] : null;
//           return (
//             song && (
//               <SongCard
//                 key={Number(key)}
//                 songName={song.songerName}
//                 singerName={song.singer_name}
//                 tags={song.tags}
//               />
//             )
//           );
//         })}
//       </ScrollView>
//     ) : (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <Text style={tw`text-white`}>저장한 노래가 없어요</Text>
//       </View>
//     )}
//   </View>
// );

// export {SongCardList};
