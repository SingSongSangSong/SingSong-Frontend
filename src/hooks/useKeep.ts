import {useEffect, useState} from 'react';
import {buttonItem} from '../types';
import {Alert} from 'react-native';
import useKeepListStore from '../store/useKeepStore';
import getKeep from '../api/keep/getKeep';
import deleteKeep from '../api/keep/deleteKeep';
import Toast from 'react-native-toast-message';
import {useQuery} from '@tanstack/react-query';

const useKeep = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isAllDeleted, setIsAllDeleted] = useState(false);
  // const {keepList, setKeepList} = useKeepListStore();
  const keepList = useKeepListStore(state => state.keepList);
  const setKeepList = useKeepListStore(state => state.setKeepList);
  const [removedSong, setRemovedSong] = useState<number[]>([]);
  const [isKeepLoading, setIsKeepLoading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // const {
  //   data: tempKeepList,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   // 데이터를 가져오는 함수
  //   queryKey: ['keepList'],
  //   queryFn: getKeep,
  //   staleTime: 3600000, // 1시간 동안 캐시 유지
  //   select: data => data.data,
  // });

  useEffect(() => {
    if (keepList.length == 0) {
      setInitKeep();
    }
    // if (tempKeepList) {
    //   setKeepList(tempKeepList);
    //   setIsKeepLoading(false);
    // }
  }, [keepList]);

  // const handleOnPressSonglist = (songNumber: number) => {
  //   navigation.navigate(keepStackNavigations.KEEP_SONG_DETAIL, {songNumber});
  // };

  const handleIsAllSelected = () => {
    setIsAllDeleted(false);
    setIsAllSelected(true);
    // toggleIsAllSelected(!selectAll); // 모든 항목 선택 상태 업데이트
  };

  const handleIsAllDeleted = () => {
    setIsAllSelected(false);
    setIsAllDeleted(true);
  };

  const setInitKeep = async () => {
    setIsKeepLoading(true);
    const tempKeepList = await getKeep();
    setKeepList(tempKeepList.data);
    setIsKeepLoading(false);
  };

  const handleDeleteKeep = async (songNumbers: number[]) => {
    console.log(songNumbers);
    const updatedSongs = await deleteKeep(songNumbers);
    setKeepList(updatedSongs.data); //keepList 업데이트
    // console.log(updatedSongs);
  };

  // const playlists = usePlaylistStore(state => state.playlists);
  // const {playlists, getPlaylistInfo} = usePlaylistStore();

  // const {removeSongFromPlaylist} = usePlaylistStore();

  // const [modalVisible, setModalVisible] = useState(false);

  // const playlistData: string[] = Object.entries(playlists).map(
  //   ([id, value]) => ({
  //     id,
  //     name: value.playlistName,
  //   }),
  // );

  const buttonNames = ['전체', '최근', '인기', '신나는', '재밌는'];

  const buttonItems: buttonItem[] = buttonNames.map(name => ({
    name,
    onPress: () => {
      console.log(`${name} 버튼이 눌렸습니다.`);
    },
  }));

  const handleFolderPress = (id: string) => {
    console.log('폴더 클릭', id);
  }; //폴더 로직 추가 구현 필요

  // const getSonglist = (playlistName: string) => {
  //   return playlists[playlistName];
  // };

  const handleRemoveButton = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠습니까?',
      [
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            // removedSong.map(song => {
            //   removeSongFromKeep(song);
            // });
            console.log('삭제');
            handleDeleteKeep(removedSong);
            setRemovedSong([]);
            Toast.show({
              type: 'selectedToast',
              text1: 'Memo에서 삭제되었습니다.',
              position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
              visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
            });
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };

  const handleInCircleButton = (songNumber: number) => {
    setRemovedSong(prevState => {
      if (!prevState.includes(songNumber)) {
        return [...prevState, songNumber];
      }
      return prevState;
    });
  };

  const handleOutCircleButton = (songNumber: number) => {
    setRemovedSong(prevState => prevState.filter(num => num !== songNumber));
  };

  const handleConfirmRemove = () => {
    handleDeleteKeep(removedSong);
    setRemovedSong([]);
    setIsRemoved(false);
    Toast.show({
      type: 'selectedToast',
      text1: 'Memo에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  return {
    isRemoved,
    setIsRemoved,
    isKeepLoading,
    isAllSelected,
    isAllDeleted,
    keepList,
    removedSong,
    buttonItems,
    handleIsAllSelected,
    handleIsAllDeleted,
    handleFolderPress,
    handleRemoveButton,
    handleInCircleButton,
    handleOutCircleButton,
    handleConfirmRemove,
    // handleOnPressSonglist,
  };
};

export default useKeep;
