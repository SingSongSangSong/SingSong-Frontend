import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import useRecommendStore from '../store/useRecommendStore';
import {Song} from '../types';
import {RcdSonglistItem} from '../components';
import usePlaylistStore from '../store/usePlaylistStore';
import useDataStore from '../store/useDataStore';
import postRecommend from '../api/postReccomend';

const useSong = (initTag: string[]) => {
  const [tags] = initTag; //태그를 렌더링하기 위함
  const [showData, setShowData] = useState<Song[]>([]);
  const [buttonTitle, setButtonTitle] = useState<string>('새로고침');
  const [songLst, setSongLst] = useState<Song[]>([]); //songlist를 렌더링하기 위함
  const [songNumberLst, setSongNumberLst] = useState<number[]>([]); //노래 선택시 추가, 노래 버튼 해제시 삭제
  const [loading, setLoading] = useState(true); //노래가 안왔을 때의 로딩, 아니면 토스처럼 컴포넌트를 흐릿하게 보여줄까?
  const {setRecommendSongResults, getSliceSongs, resetIndexLst} =
    useDataStore();

  const {reset} = useRecommendStore();
  const {addSongToPlaylist, removeSongFromPlaylist} = usePlaylistStore();

  const [isEnabled, setIsEnabled] = useState(false);
  const previousIsEnabled = useRef(isEnabled);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const handleModeChange = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    if (previousIsEnabled.current && !isEnabled) {
      setShowData(songLst);
    }
    previousIsEnabled.current = isEnabled;
  }, [isEnabled]);

  const toggleAddStored = (songId: number, song: Song) => {
    addSongToPlaylist('최근 추가한 노래', song);
  };

  const toggleRemoveStored = (songId: number) => {
    removeSongFromPlaylist('최근 추가한 노래', songId);
  };

  //처음 노래 받아오는 함수
  const fetchInitData = async () => {
    try {
      setLoading(true);
      const tempData = getSliceSongs(tags);
      setSongLst(tempData); //songLst 설정
      setShowData(tempData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching songs:', error);
      setLoading(false);
    }
  };

  const fetchRefreshData = () => {
    fetchInitData(); //새로 고침시 다시 똑같이 반복
  };

  const fetchApplyNewData = async () => {
    try {
      console.log(songNumberLst);
      setLoading(true);
      const [songData] = await Promise.all([postRecommend(songNumberLst)]);
      const tempData = songData.data;
      setRecommendSongResults(tempData);
      setShowData(tempData);
      setLoading(false);
      setSongNumberLst([]);
    } catch (error) {
      console.error('Error fetching songs:', error);
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
    if (songNumberLst.length == 0 && !isEnabled) {
      handleModeChange();
    }
    setSongNumberLst(prevList => {
      const updatedList = [...prevList, songNumber];
      changeButtonTitle(updatedList); // 상태가 업데이트된 후의 값으로 changeButtonTitle 호출
      return updatedList;
    });
  };

  const handleRemovePressSong = (songNumber: number) => {
    // if (songNumberLst.length == 1) {
    //   handleModeChange();
    // }
    setSongNumberLst(prevList => {
      const updatedList = prevList.filter(num => num !== songNumber);
      changeButtonTitle(updatedList); // 상태가 업데이트된 후의 값으로 changeButtonTitle 호출

      return updatedList;
    });
  };

  const handleSonglist = ({item}: {item: Song}) => (
    <RcdSonglistItem
      key={item.songNumber}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      onAddPress={() => handleAddPressSong(item.songNumber)}
      onRemovePress={() => handleRemovePressSong(item.songNumber)}
      showKeepIcon={true}
      onToggleAddStored={() => toggleAddStored(item.songNumber, item)}
      onToggleRemoveStored={() => toggleRemoveStored(item.songNumber)}
    />
  );

  return {
    loading,
    songLst,
    showData,
    buttonTitle,
    fetchInitData,
    handleSonglist,
    handlePressButton,
    reset,
    resetIndexLst,
    isEnabled,
    toggleSwitch,
  };
};

export default useSong;
