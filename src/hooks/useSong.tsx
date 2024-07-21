import React from 'react';
import {useState} from 'react';
import useRecommendStore from '../store/useRecommendStore';
import {Song} from '../types';
import {RcdSonglistItem} from '../components';
import getInitSongs from '../api/getInitSongs';
import getSongs from '../api/getSongs';
import usePlaylistStore from '../store/usePlaylistStore';

const useSong = (initTag: string[]) => {
  //song number를 선택을 하는데, 만약에 선
  const [tags, setTags] = useState<string[]>(initTag); //태그를 렌더링하기 위함
  const [buttonTitle, setButtonTitle] = useState<string>('새로고침');
  const [songLst, setSongLst] = useState<Song[]>([]); //songlist를 렌더링하기 위함
  const [songNumberLst, setSongNumberLst] = useState<number[]>([]); //노래 선택시 추가, 노래 버튼 해제시 삭제
  const [loading, setLoading] = useState(true); //노래가 안왔을 때의 로딩, 아니면 토스처럼 컴포넌트를 흐릿하게 보여줄까?

  const {reset} = useRecommendStore();
  const {addSongToPlaylist, removeSongFromPlaylist} = usePlaylistStore();

  const toggleAddStored = (songId: number, song: Song) => {
    // const isStored = storedSong && songId in storedSong ? false : true; // 있으면 false, 삭제하자. 없으면 true, 추가하자.
    // setStoredSong(songId, song, isStored); //keep할 데이터 저장
    addSongToPlaylist('최근 추가한 노래', song);
  };

  const toggleRemoveStored = (songId: number, song: Song) => {
    removeSongFromPlaylist('최근 추가한 노래', songId);
  };

  //처음 노래 받아오는 함수
  const fetchInitData = async () => {
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

  const fetchRefreshData = () => {
    fetchInitData(); //다시 똑같이 반복
  };

  const fetchApplyNewData = async () => {
    //얘는 fetchupdateddata??
    try {
      setLoading(true);
      const songNumber = songNumberLst[0];
      const songTags = ['헤어졌을때'];
      const additionTags = ['신나는'];

      const [songData] = await Promise.all([
        getSongs({songNumber, songTags, additionTags}),
      ]);

      setSongLst(songData.songs); //songLst 세팅
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const handlePressButton = () => {
    if (songNumberLst.length == 0) {
      //없을 경우
      return fetchRefreshData();
    } else {
      //노래가 있을 경우
      return fetchApplyNewData();
    }
  };
  const changeButtonTitle = (updatedList: number[]) => {
    if (updatedList.length == 0) {
      setButtonTitle('새로고침');
    } else {
      setButtonTitle('탐색하기');
    }
  };

  const handleAddPressSong = (songNumber: number) => {
    setSongNumberLst(prevList => {
      const updatedList = [...prevList, songNumber];
      changeButtonTitle(updatedList); // 상태가 업데이트된 후의 값으로 changeButtonTitle 호출
      return updatedList;
    });
  };

  const handleRemovePressSong = (songNumber: number) => {
    setSongNumberLst(prevList => {
      const updatedList = prevList.filter(num => num !== songNumber);
      changeButtonTitle(updatedList); // 상태가 업데이트된 후의 값으로 changeButtonTitle 호출
      return updatedList;
    });
  };

  const handleSonglist = ({item}: {item: Song}) => (
    <RcdSonglistItem
      songNumber={item.song_number}
      songName={item.song_name}
      singerName={item.singer_name}
      onAddPress={() => handleAddPressSong(item.song_number)}
      onRemovePress={() => handleRemovePressSong(item.song_number)}
      showKeepIcon={true}
      onToggleAddStored={() => toggleAddStored(item.song_number, item)}
      onToggleRemoveStored={() => toggleRemoveStored(item.song_number, item)}
      // keepColor={decideColor(item.song_number)}
    />
  );

  return {
    loading,
    songLst,
    buttonTitle,
    fetchInitData,
    handleSonglist,
    handlePressButton,
    reset,
  };
};

export default useSong;
