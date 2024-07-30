// import {create} from 'zustand';
// import {Song} from '../types/songs';

// interface songlistState {
//   songlist: {[key: string]: {[key: number]: Song}} | null;
//   setSonglist: (
//     songlistId: string,
//     songlistContent: {[key: number]: Song},
//   ) => void;
// }

// const useSongStore = create<songlistState>(set => {
//   const initState = {
//     songlist: {},
//   };

//   return {
//     ...initState,
//     setSonglist: (songlistId: string, songlistContent: {[key: number]: Song}) =>
//       set(state => {
//         const updatedSonglist = {...state.songlist};
//         updatedSonglist[songlistId] = songlistContent;
//         return {...state, songlist: updatedSonglist};
//       }),
//   };
// });

// export default useSongStore;
