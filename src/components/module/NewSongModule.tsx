import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import useSongStore from '../../store/useSongStore';
import {designatedColor} from '../../constants';
import getSongsNew from '../../api/newSong/getSongsNew';
import CustomText from '../text/CustomText';
import {NewSongCardList} from '..';
// import {NewSongCardList} from '../list/NewSongCardList';

interface NewSongModuleProps {
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
  ) => void;
}

const NewSongModule = ({
  onPressTotalButton,
  onPressSongButton,
}: NewSongModuleProps) => {
  const [isTimeoutReached, setIsTimeoutReached] = useState<boolean>(false);
  const setLoadingVisible = useSongStore(state => state.setLoadingVisible);
  const {
    data: tempNewSongs,
    error: rcdRecommendationError,
    isFetching: isFetchingRcdRecommendationSongs,
  } = useQuery({
    queryKey: ['newSongs'],
    queryFn: () => getSongsNew(-1, 10),
    staleTime: 3600000,
    select: data => data.data.songs,
  });

  useEffect(() => {
    // 5초 타이머 설정
    const timer = setTimeout(() => {
      setIsTimeoutReached(true); // 5초 후 타임아웃 도달을 표시
      setLoadingVisible(false); // 로딩 false로 변경
    }, 5000);

    if (tempNewSongs || rcdRecommendationError) {
      clearTimeout(timer); // 타이머가 실행되기 전에 응답이 도착하면 타이머 정리
      setLoadingVisible(false); // 데이터가 오면 로딩 false로 변경
    }

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [tempNewSongs, rcdRecommendationError, isFetchingRcdRecommendationSongs]);

  // 5초 후에도 데이터가 없고 에러가 없다면 로딩을 false로 설정
  useEffect(() => {
    if (isTimeoutReached && !tempNewSongs && !rcdRecommendationError) {
      setLoadingVisible(false);
    }
  }, [isTimeoutReached, tempNewSongs, rcdRecommendationError]);

  return (
    <View>
      {tempNewSongs ? (
        <View
          style={tw`w-full flex-wrap flex-row justify-center items-center border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
          <View key="newSong">
            <View style={tw`px-2 px-8 mt-2 mb-2 my-4 py-2`}>
              <View style={tw`flex-row justify-between items-center`}>
                <CustomText
                  style={tw`text-[${designatedColor.VIOLET3}] text-lg`}>
                  이달의 노래방 신곡
                </CustomText>
                <TouchableOpacity
                  onPress={onPressTotalButton}
                  activeOpacity={0.8}
                  style={tw`p-2`}>
                  <CustomText
                    style={tw`text-[${designatedColor.GRAY3}] text-[3]`}>
                    전체보기
                  </CustomText>
                </TouchableOpacity>
              </View>
              <CustomText style={tw`text-[${designatedColor.GRAY1}]`}>
                가장 최신에 발매된 노래부터 확인할 수 있어요
              </CustomText>
            </View>
            <NewSongCardList
              //   tag="이달의 노래방 신곡"
              //   onPress={onPressTotalButton}
              data={tempNewSongs}
              onSongPress={onPressSongButton}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export {NewSongModule};
