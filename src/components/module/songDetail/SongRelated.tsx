import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {designatedColor} from '../../../constants';
import tw from 'twrnc';
import {Relatedlist} from '../../list/Relatedlist';
import {Song} from '../../../types';
import getSongsRelated from '../../../api/songs/getSongsRelated';
import {logButtonClick, logRefresh} from '../../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import Toast from 'react-native-toast-message';
import postKeep from '../../../api/keep/postKeep';
import useKeepListStore from '../../../store/useKeepStore';
import deleteKeep from '../../../api/keep/deleteKeep';

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
  const setKeepList = useKeepListStore(state => state.setKeepList);

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

  const handleOnKeepAddPress = async (songId: number) => {
    amplitude.track('recommendation_keep_button_click');
    logButtonClick('recommendation_keep_button_click');
    const tempKeepList = await postKeep([songId]);
    setKeepList(tempKeepList.data);
    Toast.show({
      type: 'selectedToast',
      text1: 'KEEP에 추가되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const handleOnKeepRemovePress = async (songId: number) => {
    // await deleteKeep([songId]);
    const tempKeepList = await deleteKeep([songId]);
    setKeepList(tempKeepList.data);
    Toast.show({
      type: 'selectedToast',
      text1: 'KEEP에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  return (
    <View
      style={tw`mt-7 mb-4 border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
      {songRelated && songRelated.length > 0 && (
        <>
          <Text style={tw`text-white font-bold text-lg my-2`}>
            다른 노래는 어떻송
          </Text>
          <View style={tw`h-full w-full`}>
            {/* {songDetailHandler.songRelated && ( */}
            <Relatedlist
              isLoading={isLoading}
              relatedlistData={songRelated}
              isShowKeepIcon={true}
              onSongPress={onSongPress}
              handleRefreshRelatedSongs={handleRefreshRelatedSongs}
              onKeepAddPress={handleOnKeepAddPress}
              onKeepRemovePress={handleOnKeepRemovePress}
            />
          </View>
        </>
      )}
    </View>
  );
};

export {SongRelated};
