import React, {useEffect} from 'react';
import {useState} from 'react';
import useRecommendStore from '../store/useRecommendStore';
import {Song} from '../types';
import {RcdSonglistItem} from '../components';
import useDataStore from '../store/useDataStore';
import useKeepListStore from '../store/useKeepStore';
import postRcdRefresh from '../api/recommendation/postRcdRefresh';

const useSong = (initTag: string[]) => {
  const [tags] = initTag; //태그를 렌더링하기 위함
  // const [showData, setShowData] = useState<Song[]>([]);
  // const [buttonTitle, setButtonTitle] = useState<string>('새로고침');
  const [songLst, setSongLst] = useState<Song[]>([]); //songlist를 렌더링하기 위함
  // const [songNumberLst, setSongNumberLst] = useState<number[]>([]); //노래 선택시 추가, 노래 버튼 해제시 삭제
  const [refreshing, setRefreshing] = useState(false);
  const {tagWithSongs, resetIndexLst, updateRefreshData} = useDataStore();

  const {reset} = useRecommendStore();
  const {addSongToKeep, removeSongFromKeep} = useKeepListStore();
  const [isLoading, setIsLoading] = useState(false);

  // const [isEnabled, setIsEnabled] = useState(false);
  // const previousIsEnabled = useRef(isEnabled);

  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const handleModeChange = () => setIsEnabled(previousState => !previousState);

  // useEffect(() => {
  //   if (previousIsEnabled.current && !isEnabled) {
  //     setShowData(songLst);
  //   }
  //   previousIsEnabled.current = isEnabled;
  // }, [isEnabled, songLst]);

  useEffect(() => {
    console.log('isLoading 상태가 변경됨:', isLoading);
  }, [isLoading]);

  //keep에 추가
  const toggleAddStored = (songId: number, song: Song) => {
    addSongToKeep(song);
  };

  //keep에서 삭제
  const toggleRemoveStored = (songId: number) => {
    removeSongFromKeep(songId);
  };

  //위로 당겨서 새로고침시 실행되는 함수
  const onRefresh = async () => {
    setRefreshing(true);
    await handleRefreshSongs(); //아예 데이터 리스트를 바꿔야 할듯?
    setRefreshing(false);
  };

  //초기 노래 리스트 세팅하는 함수
  const setInitSongs = () => {
    setSongLst(tagWithSongs[tags]);
  };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleRefreshSongs = async () => {
    try {
      setIsLoading(true);
      console.log(isLoading);
      //20개 이상일 경우에만 api 호출
      if (songLst.length >= 20) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        postRcdRefresh(tags)
          .then(response => {
            const songData = response.data;
            const newSongLst = updateRefreshData(tags, songData);
            setSongLst(newSongLst); //새로운 노래 리스트로 업데이트
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
      console.error('Error fetching songs:', error);
      setIsLoading(false);
    }
  };

  // const handleAddPressSong = (songNumber: number) => {
  //   if (songNumberLst.length == 0 && !isEnabled) {
  //     handleModeChange();
  //   }
  //   setSongNumberLst(prevList => {
  //     const updatedList = [...prevList, songNumber];
  //     changeButtonTitle(updatedList); // 상태가 업데이트된 후의 값으로 changeButtonTitle 호출
  //     return updatedList;
  //   });
  // };

  // const handleRemovePressSong = (songNumber: number) => {
  //   setSongNumberLst(prevList => {
  //     const updatedList = prevList.filter(num => num !== songNumber);
  //     changeButtonTitle(updatedList); // 상태가 업데이트된 후의 값으로 changeButtonTitle 호출

  //     return updatedList;
  //   });
  // };

  const handleSonglist = ({item}: {item: Song}) => (
    <RcdSonglistItem
      key={item.songNumber}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      // onAddPress={() => handleAddPressSong(item.songNumber)}
      // onRemovePress={() => handleRemovePressSong(item.songNumber)}
      onAddPress={() => {}}
      onRemovePress={() => {}}
      showKeepIcon={true}
      onToggleAddStored={() => toggleAddStored(item.songNumber, item)}
      onToggleRemoveStored={() => toggleRemoveStored(item.songNumber)}
    />
  );

  return {
    isLoading,
    songLst,
    setSongLst,
    handleSonglist,
    handleRefreshSongs,
    reset,
    resetIndexLst,
    refreshing,
    onRefresh,
    setInitSongs,
  };
};

export default useSong;
