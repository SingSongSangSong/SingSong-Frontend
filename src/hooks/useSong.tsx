import React from 'react';
import {useState} from 'react';
// import useRecommendStore from '../store/useRecommendStore';
import {RcdSonglistItem} from '../components';
import useSongStore from '../store/useSongStore';
import useKeepListStore from '../store/useKeepStore';
import postRcdRefresh from '../api/recommendation/postRcdRefresh';
import postKeep from '../api/keep/postKeep';
import deleteKeep from '../api/keep/deleteKeep';
import {HomeStackParamList, RcdRefreshSong} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {homeStackNavigations} from '../constants';
import Toast from 'react-native-toast-message';
// import {CustomToast} from '../components';

type UseSongProps = {
  initTag: string;
  navigation: StackNavigationProp<
    HomeStackParamList,
    typeof homeStackNavigations.RCD_DETAIL
  >;
};

const useSong = ({initTag, navigation}: UseSongProps) => {
  // const [tags] = initTag;
  const [refreshing, setRefreshing] = useState(false);
  const {setSelectedTag, refreshSongs, setRefreshSongs, updateRefreshSongs} =
    useSongStore();
  const [songLst, setSongLst] = useState<RcdRefreshSong[]>(
    refreshSongs[initTag],
  ); //songlist를 렌더링하기 위함

  // const {reset} = useRecommendStore();
  const {setKeepList} = useKeepListStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);

  // const [isEnabled, setIsEnabled] = useState(false);
  // const previousIsEnabled = useRef(isEnabled);
  // const [songNumberLst, setSongNumberLst] = useState<number[]>([]); //노래 선택시 추가, 노래 버튼 해제시 삭제
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // const handleModeChange = () => setIsEnabled(previousState => !previousState);

  // useEffect(() => {
  //   if (previousIsEnabled.current && !isEnabled) {
  //     setShowData(songLst);
  //   }
  //   previousIsEnabled.current = isEnabled;
  // }, [isEnabled, songLst]);

  //keep에 추가
  const toggleAddStored = async (songNumber: number) => {
    //addSongToKeep(song);
    console.log('toggle add');
    const updatedSongs = await postKeep([songNumber]);
    setKeepList(updatedSongs.data);
    Toast.show({
      type: 'selectedToast',
      text1: 'Keep에 추가되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  //keep에서 삭제
  const toggleRemoveStored = async (songNumber: number) => {
    // removeSongFromKeep(songId);
    console.log('toggle remove');
    const updatedSongs = await deleteKeep([songNumber]);
    setKeepList(updatedSongs.data);
    Toast.show({
      type: 'selectedToast',
      text1: 'Keep에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  //위로 당겨서 새로고침시 실행되는 함수
  const onRefresh = async () => {
    setRefreshing(true);
    await handleOnRefreshSongs(); //아예 데이터 리스트를 바꿔야 할듯?
    setRefreshing(false);
  };

  //위로 당길 시 노래 리스트 새로고침하는 함수
  const handleOnRefreshSongs = async () => {
    try {
      if (songLst && songLst.length >= 20) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        console.log('on refresh!!!!!!!!!!!!!!!!!!!');
        const songData = await postRcdRefresh(initTag);
        const newSongLst = setRefreshSongs(initTag, songData.data);
        setSongLst(newSongLst); //새로운 노래 리스트로 업데이트
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  //초기 노래 리스트 세팅하는 함수
  const setInitSongs = async () => {
    const initSongs = await postRcdRefresh(initTag);
    const songData = initSongs.data;
    const newSongLst = updateRefreshSongs(initTag, songData);
    setSongLst(newSongLst);
    setIsInit(true);
    setSelectedTag(initTag);
  };

  //밑으로 스크롤 시 데이터 추가로 불러오는 함수
  const handleRefreshSongs = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      //20개 이상일 경우에만 api 호출
      if (songLst && songLst.length >= 20) {
        // 새로운 API 호출을 비동기로 실행 (await 하지 않음)
        console.log('refresh!!!!!!!!!!!!!!!!!!!');
        console.log(initTag);
        postRcdRefresh(initTag)
          .then(response => {
            const songData = response.data;
            const newSongLst = updateRefreshSongs(initTag, songData);
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

  const handleOnPressSong = (songNumber: number, songId: number) => {
    navigation.navigate(homeStackNavigations.SONG_DETAIL, {songNumber, songId});
  };

  const handleSonglist = ({item}: {item: RcdRefreshSong}) => (
    <RcdSonglistItem
      key={item.songNumber}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      onPress={() => handleOnPressSong(item.songNumber, item.songId)}
      // onAddPress={() => handleAddPressSong(item.songNumber)}
      // onRemovePress={() => handleRemovePressSong(item.songNumber)}
      onAddPress={() => {}}
      onRemovePress={() => {}}
      showKeepIcon={true}
      onToggleAddStored={() => toggleAddStored(item.songId)}
      onToggleRemoveStored={() => toggleRemoveStored(item.songId)}
    />
  );

  return {
    isInit,
    isLoading,
    songLst,
    setSongLst,
    handleSonglist,
    handleRefreshSongs,
    handleOnPressSong,
    toggleAddStored,
    toggleRemoveStored,
    refreshing,
    onRefresh,
    setInitSongs,
  };
};

export default useSong;
