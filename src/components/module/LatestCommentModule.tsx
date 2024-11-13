import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import tw from 'twrnc';
import getCommentLatest from '../../api/comment/getCommentLatest';
import {CommentLatest} from '../../types';
import {CommentInfoItem} from '..';

interface LatestCommentModuleProps {
  onPressCommentButton: (
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

const LatestCommentModule = ({
  onPressCommentButton,
  refreshing,
}: LatestCommentModuleProps) => {
  // const [latestComments, setLatestComments] = useState<CommentLatest[]>([]);
  // const {
  //   data: tempLatestComments,
  //   error: latestCommentsError,
  //   isFetching: isFetchingLatestComments,
  // } = useQuery({
  //   queryKey: ['comments'],
  //   queryFn: () => getCommentLatest(5),
  //   staleTime: 3600000, // 1시간 동안 캐시 유지
  //   select: data => data.data,
  // });
  const [latestComments, setLatestComments] = useState<CommentLatest[]>([]);
  const {
    data: tempLatestComments,
    error: latestCommentsError,
    isFetching: isFetchingLatestComments,
    refetch,
  } = useQuery({
    queryKey: ['comments'],
    queryFn: () => getCommentLatest(5),
    staleTime: 3600000, // 1시간 동안 캐시 유지
    select: data => data.data,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  useEffect(() => {
    if (tempLatestComments) {
      setLatestComments(tempLatestComments);
    }
  }, [tempLatestComments]);

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemHeight = 100; // CommentInfoItem의 높이를 설정하세요

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;

          if (nextIndex < latestComments.length) {
            // 마지막 항목이 아닐 때
            scrollViewRef.current.scrollTo({
              y: itemHeight * nextIndex,
              animated: true,
            });
          } else {
            // 마지막 항목에서 첫 번째로 부드럽게 이동
            scrollViewRef.current.scrollTo({
              y: 0,
              animated: false,
            });
            return 0; // 인덱스를 처음으로 리셋
          }

          return nextIndex;
        });
      }
    }, 3500); // 4초 간격으로 스크롤

    return () => clearInterval(interval);
  }, [latestComments]);

  useEffect(() => {
    if (tempLatestComments) {
      setLatestComments([...tempLatestComments, ...tempLatestComments]); // 리스트를 두 번 반복
    }
  }, [tempLatestComments]);

  return (
    <View style={tw`w-full mx-1`}>
      {/* <CustomText
        style={tw`text-[${designatedColor.VIOLET3}] text-[16px] mr-2 items-center`}>
        최신 댓글이 달린 노래
      </CustomText> */}
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-1`}
        snapToInterval={itemHeight}
        decelerationRate="normal"
        style={{height: itemHeight}} // ScrollView 높이를 CommentInfoItem 높이와 동일하게 설정
      >
        {latestComments &&
          latestComments.map((comment, index) => (
            <View key={index} style={{height: itemHeight}}>
              <CommentInfoItem
                songName={comment.song.songName}
                singerName={comment.song.singerName}
                songNumber={comment.song.songNumber}
                onCommentPress={() => {
                  onPressCommentButton(
                    comment.song.songId,
                    comment.song.songNumber,
                    comment.song.songName,
                    comment.song.singerName,
                    comment.song.album,
                    comment.song.melonLink || '',
                    comment.song.isMr,
                    comment.song.isLive || false,
                    comment.song.lyricsVideoId || '',
                  );
                }}
                nickname={comment.nickname}
                content={comment.content}
                createdAt={comment.createdAt}
                likes={comment.likes}
                isLiked={comment.isLiked}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export {LatestCommentModule};
