import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';
import {Song} from '../../types';
import {RecentKeepSongCardList} from '..';
import {getRecentKeep} from '../../api/keep-api';

interface RecentKeepModuleProps {
  onPressRecentKeepSong: (
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
}

const RecentKeepModule = ({
  onPressRecentKeepSong,
  refreshing,
}: RecentKeepModuleProps) => {
  const [recentKeepSongsLst, setRecentKeepSongsLst] = useState<Song[]>();
  const {
    data: tempRecentKeepSongs,
    error: recentKeepSongsError,
    isFetching: isFetchingRecentKeepSongs,
    refetch,
  } = useQuery({
    queryKey: ['recentKeepSongs'],
    queryFn: () => getRecentKeep(10),
    staleTime: 3600000,
    select: data => data.data,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  // 5초 후에도 데이터가 없고 에러가 없다면 로딩을 false로 설정
  useEffect(() => {
    if (tempRecentKeepSongs && !isFetchingRecentKeepSongs) {
      setRecentKeepSongsLst(tempRecentKeepSongs);
    }
  }, [tempRecentKeepSongs]);

  return (
    <View>
      {recentKeepSongsLst ? (
        <View
          style={tw`w-full flex-wrap flex-row justify-center items-center border-t-[0.5px] border-[${designatedColor.GRAY5}] pb-2`}>
          <View key="newSong">
            <View style={tw`px-2 px-8 mb-4 pt-4`}>
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <CustomText
                    style={tw`text-[${designatedColor.VIOLET3}] text-lg mr-2 items-center`}>
                    최근 보관한 노래
                  </CustomText>
                </View>
              </View>
              <CustomText
                style={tw`text-[${designatedColor.GRAY1}] text-[13px] mt-1`}>
                다른 사람들이 보관한 노래들을 확인해보세요
              </CustomText>
            </View>
            <RecentKeepSongCardList
              data={recentKeepSongsLst}
              onSongPress={onPressRecentKeepSong}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export {RecentKeepModule};
