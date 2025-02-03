import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import getRcdRecommendation from '../../api/recommendation/getRcdRecommendation';
import {AiSongCardList} from '..';
import useSongStore from '../../store/useSongStore';
import {designatedColor} from '../../constants';
import {Song} from '../../types';

interface AiSongCardModuleProps {
  onPressTotalButton: () => void;
  onPressSongButton: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
    lyricsVideoId: string,
  ) => void;
  refreshing: boolean;
  isShowed: boolean;
}

const AiSongCardModule = ({
  onPressTotalButton,
  onPressSongButton,
  refreshing,
  isShowed,
}: AiSongCardModuleProps) => {
  const [isTimeoutReached, setIsTimeoutReached] = useState<boolean>(false);
  const setLoadingVisible = useSongStore(state => state.setLoadingVisible);
  const [rcdRecommendationSongs, setRcdRecommendationSongs] =
    useState<Song[]>();
  const {
    data: tempRcdRecommendationSongs,
    error: rcdRecommendationError,
    isFetching: isFetchingRcdRecommendationSongs,
    refetch,
  } = useQuery({
    queryKey: ['rcdRecommendationSongs'],
    queryFn: () => getRcdRecommendation(1),
    staleTime: 3600000,
    select: data => data.data.songs,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingVisible(false); // 로딩 false로 변경
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // 5초 타이머 설정
    const timer = setTimeout(() => {
      setIsTimeoutReached(true); // 5초 후 타임아웃 도달을 표시
      setLoadingVisible(false); // 로딩 false로 변경
    }, 5000);

    if (tempRcdRecommendationSongs || rcdRecommendationError) {
      setRcdRecommendationSongs(tempRcdRecommendationSongs);
      clearTimeout(timer); // 타이머가 실행되기 전에 응답이 도착하면 타이머 정리
      setLoadingVisible(false); // 데이터가 오면 로딩 false로 변경
    }

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [
    tempRcdRecommendationSongs,
    rcdRecommendationError,
    isFetchingRcdRecommendationSongs,
  ]);

  // 5초 후에도 데이터가 없고 에러가 없다면 로딩을 false로 설정
  useEffect(() => {
    if (
      isTimeoutReached &&
      !tempRcdRecommendationSongs &&
      !rcdRecommendationError
    ) {
      setLoadingVisible(false);
    }
  }, [isTimeoutReached, tempRcdRecommendationSongs, rcdRecommendationError]);

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  return (
    <View>
      {rcdRecommendationSongs && !rcdRecommendationError ? (
        <View
          style={tw`w-full flex-wrap flex-row justify-center items-center border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
          <View key="aiSong">
            <AiSongCardList
              tag="AI's PICK"
              onPress={onPressTotalButton}
              data={rcdRecommendationSongs}
              onSongPress={onPressSongButton}
              isShowed={isShowed}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export {AiSongCardModule};
