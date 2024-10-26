import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import useSongStore from '../../store/useSongStore';
import {designatedColor} from '../../constants';
import getSongsNew from '../../api/newSong/getSongsNew';
import CustomText from '../text/CustomText';
import {NewSongCardList} from '..';
import {Tooltip} from 'react-native-elements';
import InfoIcon from '../../assets/svg/Info.svg';
import {NewSong} from '../../types';

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
  refreshing: boolean;
}

const NewSongModule = ({
  onPressTotalButton,
  onPressSongButton,
  refreshing,
}: NewSongModuleProps) => {
  const [isTimeoutReached, setIsTimeoutReached] = useState<boolean>(false);
  const [newSongsLst, setNewSongsLst] = useState<NewSong[]>();
  const setLoadingVisible = useSongStore(state => state.setLoadingVisible);
  const {
    data: tempNewSongs,
    error: newSongsError,
    isFetching: isFetchingNewSongs,
    refetch,
  } = useQuery({
    queryKey: ['newSongs'],
    queryFn: () => getSongsNew(-1, 10),
    staleTime: 3600000,
    select: data => data.data.songs,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  useEffect(() => {
    // 5초 타이머 설정
    const timer = setTimeout(() => {
      setIsTimeoutReached(true); // 5초 후 타임아웃 도달을 표시
      setLoadingVisible(false); // 로딩 false로 변경
    }, 5000);

    if (tempNewSongs) {
      clearTimeout(timer); // 타이머가 실행되기 전에 응답이 도착하면 타이머 정리
      setLoadingVisible(false); // 데이터가 오면 로딩 false로 변경
      setNewSongsLst(tempNewSongs);
    }

    if (newSongsError) {
      clearTimeout(timer); // 타이머가 실행되기 전에 응답이 도착하면 타이머 정리
      setLoadingVisible(false); // 데이터가 오면 로딩 false로 변경
    }

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [tempNewSongs, newSongsError, isFetchingNewSongs]);

  // 5초 후에도 데이터가 없고 에러가 없다면 로딩을 false로 설정
  useEffect(() => {
    if (isTimeoutReached && !tempNewSongs && !newSongsError) {
      setLoadingVisible(false);
    }
  }, [isTimeoutReached, tempNewSongs, newSongsError]);

  return (
    <View>
      {newSongsLst ? (
        <View
          style={tw`w-full flex-wrap flex-row justify-center items-center border-t-[0.5px] mb-15 border-[${designatedColor.GRAY5}] pb-2`}>
          <View key="newSong">
            <View style={tw`px-2 px-8 mb-4 pt-4`}>
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <CustomText
                    style={tw`text-[${designatedColor.VIOLET3}] text-lg mr-2 items-center`}>
                    이달의 노래방 신곡
                  </CustomText>
                  <Tooltip
                    popover={
                      <CustomText
                        style={[
                          tw`text-[10px] text-[${designatedColor.WHITE}]`,
                          {lineHeight: 18},
                        ]}>
                        노래방에 최신으로 발매된 순으로 확인 가능하며, 일주일
                        사이 발매된 노래는 NOW로 표시됩니다.
                      </CustomText>
                    } // 툴팁에 표시할 내용
                    backgroundColor={designatedColor.GRAY5} // 툴팁 배경 색상
                    height={90} // 툴팁 높이
                    width={200} // 툴팁 너비
                    containerStyle={{borderRadius: 10}} // 툴팁 컨테이너 스타일
                    withOverlay={false} // 배경이 흐려지는 효과를 없앰
                    skipAndroidStatusBar // 안드로이드 상태 표시줄을 피해서 위치가 밀리는 현상을 줄임
                  >
                    {/* <Icon name="info" type="material" color="purple" size={24} /> */}
                    <InfoIcon width={14} height={14} />
                  </Tooltip>
                </View>

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
              <CustomText
                style={tw`text-[${designatedColor.GRAY1}] text-[11px]`}>
                가장 최신에 발매된 노래부터 확인할 수 있어요
              </CustomText>
            </View>
            <NewSongCardList
              //   tag="이달의 노래방 신곡"
              //   onPress={onPressTotalButton}
              data={newSongsLst}
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
