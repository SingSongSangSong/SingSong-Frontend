import React from 'react';
import {useState} from 'react';
import useRecommendStore from '../store/useRecommendStore';
import {Song} from '../types';
import Toast from 'react-native-toast-message';
import {SonglistItem} from '../components';
import getInitSongs from '../api/getInitSongs';
import getSongs from '../api/getSongs';

const useSong = () => {
  const [songLst, setSongLst] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    selectedSong,
    setSelectedSong,
    selectedSongTag,
    setSelectedSongTag,
    selectedAdditionTag,
    storedSong,
    setStoredSong,
    reset,
  } = useRecommendStore();

  const toggleStored = (songId: number, song: Song) => {
    const isStored = storedSong && songId in storedSong ? false : true; // 있으면 false, 삭제하자. 없으면 true, 추가하자.
    setStoredSong(songId, song, isStored);
  };

  const fetchInitData = async (tags: string[]) => {
    try {
      setLoading(true);
      const [songData] = await Promise.all([getInitSongs({tags})]);
      setSongLst(songData.songs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const fetchUpdatedData = async (
    songNumber: number,
    songTags: string[],
    additionTags: string[],
  ) => {
    try {
      setLoading(true);
      const [songData] = await Promise.all([
        getSongs({songNumber, songTags, additionTags}),
      ]);
      setSongLst(songData.songs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const handleSongPress = (item: Song) => {
    setSelectedSong(item); //노래가 없다가 생기거나, 노래가 바뀌었음
    const updatedTags = [...item.tags]; //노래가 다른게 선택되면, 태그는 더해짐 -> song 태그는 초기화
    setSelectedSongTag(updatedTags); //노래 태그 바꾸기
    console.log(selectedSongTag);
  };

  const handleApplyTag = () => {
    if (selectedSong) {
      fetchUpdatedData(
        selectedSong.song_number,
        selectedSongTag,
        selectedAdditionTag,
      ); //현재 태그 보내기
    } else {
      Toast.show({
        type: 'info',
        position: 'bottom',
        text1: '노래가 선택되지 않았습니다.',
        text2: '노래를 선택한 후 다시 시도해주세요.',
        visibilityTime: 1000,
        bottomOffset: 100,
      });
    }
  };

  const handleSonglist = ({item}: {item: Song}) => (
    <SonglistItem
      songNumber={item.song_number}
      songName={item.song_name}
      singerName={item.singer_name}
      onPress={() => handleSongPress(item)}
      showKeepIcon={true}
      onToggleStored={() => toggleStored(item.song_number, item)}
      keepColor={decideColor(item.song_number)}
    />
  );

  const decideColor = (song_number: number) => {
    if (storedSong && song_number in storedSong) {
      return '#FFD700';
    } else {
      return '#D3D3D3';
    }
  };

  return {
    loading,
    songLst,
    selectedSong,
    fetchInitData,
    handleApplyTag,
    handleSonglist,
    reset,
  };
};

export default useSong;
