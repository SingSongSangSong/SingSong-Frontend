import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';
import {Song} from '../../types';
import {RecentKeepSongCardList} from '..';
import getRecentComment from '../../api/recent/getRecentComment';

interface RecentCommentSongModuleProps {
  onPressRecentCommentSong: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => void;
  refreshing: boolean;
}

const RecentCommentSongModule = ({
  onPressRecentCommentSong,
  refreshing,
}: RecentCommentSongModuleProps) => {
  const [recentCommentSongsLst, setRecentCommentSongsLst] = useState<Song[]>();
  const {
    data: tempRecentCommentSongs,
    error: recentCommentSongsError,
    isFetching: isFetchingRecentCommentSongs,
    refetch,
  } = useQuery({
    queryKey: ['recentCommentSongs'],
    queryFn: () => getRecentComment(10),
    staleTime: 3600000,
    select: data => data.data,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  useEffect(() => {
    if (tempRecentCommentSongs && !isFetchingRecentCommentSongs) {
      setRecentCommentSongsLst(tempRecentCommentSongs);
    }
  }, [tempRecentCommentSongs]);

  return (
    <View>
      {recentCommentSongsLst ? (
        <View
          style={tw`w-full flex-wrap flex-row justify-center items-center border-t-[0.5px] mb-15 border-[${designatedColor.GRAY5}] pb-2`}>
          <View key="newSong">
            <View style={tw`px-2 px-8 mb-4 pt-4`}>
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <CustomText
                    style={tw`text-[${designatedColor.VIOLET3}] text-lg mr-2 items-center`}>
                    최근 댓글이 달린 노래
                  </CustomText>
                </View>
              </View>
              <CustomText
                style={tw`text-[${designatedColor.GRAY1}] text-[12px]`}>
                다른 사람들이 댓글을 달은 노래를 확인해보세요
              </CustomText>
            </View>
            <RecentKeepSongCardList
              data={recentCommentSongsLst}
              onSongPress={onPressRecentCommentSong}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export {RecentCommentSongModule};
