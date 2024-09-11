import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {designatedColor} from '../../../constants';
import tw from 'twrnc';
import {Relatedlist} from '../../list/Relatedlist';
import {Song} from '../../../types';
import getSongsRelated from '../../../api/songs/getSongsRelated';
import {logRefresh} from '../../../utils';

type SongRelatedProps = {
  songId: number;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    isMr: boolean,
  ) => void;
};
const SongRelated = ({songId, onSongPress}: SongRelatedProps) => {
  // console.log('songRelated');
  const [songRelated, setSongRelated] = useState<Song[]>();
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const size = 10;

  const setInitSongReview = () => {
    getSongsRelated(String(songId), page, size).then(tempSongRelated => {
      setSongRelated(tempSongRelated.data.songs);
      setPage(tempSongRelated.data.nextPage);
    });
  };

  useEffect(() => {
    setInitSongReview();
  }, []);

  const handleRefreshRelatedSongs = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (songRelated) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        logRefresh('song_related_songs');
        getSongsRelated(String(songId), page, size)
          .then(response => {
            const newSongRelated = response.data.songs;
            setPage(response.data.nextPage);
            setSongRelated(prev => [...(prev || []), ...newSongRelated]); //새로운 노래 리스트로 업데이트
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error refreshing data:', error);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching new related songs:', error);
      setIsLoading(false);
    }
  };

  return (
    <View
      style={tw`mt-10 mb-4 border-t-[0.5px] border-[${designatedColor.GRAY5}] py-4 mx-2`}>
      {songRelated && songRelated.length > 0 && (
        <>
          <Text style={tw`text-white font-bold text-xl my-2`}>
            다른 노래는 어떻송
          </Text>
          <View style={tw`h-full w-full`}>
            {/* {songDetailHandler.songRelated && ( */}
            <Relatedlist
              isLoading={isLoading}
              relatedlistData={songRelated}
              isShowKeepIcon={false}
              onSongPress={onSongPress}
              handleRefreshRelatedSongs={handleRefreshRelatedSongs}
            />
          </View>
        </>
      )}
    </View>
  );
};

export {SongRelated};
