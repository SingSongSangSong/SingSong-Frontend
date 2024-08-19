// import postRcdHome from '../api/recommendation/postRcdHome';
// import getTags from '../api/tags/getTags';
// import useSongStore from '../store/useSongStore';
// import {RcdHomeSongWithTags} from '../types';
// import {useQuery} from '@tanstack/react-query';
// import {useEffect} from 'react';

// const useFetchData = () => {
//   // 태그 데이터를 가져오는 쿼리
//   const tags = useSongStore(state => state.tags);
//   const setTags = useSongStore(state => state.setTags);
//   const previewSongs = useSongStore(state => state.previewSongs);
//   const setPreviewSongs = useSongStore(state => state.setPreviewSongs);
//   const {
//     data: tempTags,
//     error: tagsError,
//     isFetching: isFetchingTags,
//   } = useQuery({
//     queryKey: ['tags'],
//     queryFn: getTags,
//     staleTime: 3600000, // 1시간 동안 캐시 유지
//     select: data => data.data,
//   });

//   // 추천 노래 데이터를 가져오는 쿼리
//   const {
//     data: tempRcdHomeSongs,
//     error: rcdHomeSongsError,
//     isFetching: isFetchingRcdHomeSongs,
//   } = useQuery({
//     queryKey: ['rcdHomeSongs'],
//     queryFn: () => postRcdHome({tags: tempTags || []}),
//     enabled: !!tempTags && tempTags.length > 0,
//     staleTime: 3600000,
//     select: data => data.data,
//   });

//   // 태그 데이터를 상태에 저장
//   useEffect(() => {
//     if (tempTags) {
//       setTags(tempTags);
//     }
//   }, [tempTags, setTags]);

//   // 추천 노래 데이터를 상태에 저장
//   useEffect(() => {
//     console.log('tempRcdHomeSongs', tempRcdHomeSongs);
//     if (tempRcdHomeSongs) {
//       tempRcdHomeSongs.forEach((songWithTags: RcdHomeSongWithTags) => {
//         setPreviewSongs(songWithTags.tag, songWithTags.songs);
//       });
//     }
//   }, [tempRcdHomeSongs, setPreviewSongs]);

//   return {
//     tags,
//     previewSongs,
//     isFetchingTags,
//     tagsError,
//     isFetchingRcdHomeSongs,
//     rcdHomeSongsError,
//   };
// };

// export default useFetchData;
