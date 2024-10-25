import {useState} from 'react';
import {Alert} from 'react-native';
import deleteKeep from '../api/keep/deleteKeep';
import Toast from 'react-native-toast-message';
import useKeepV2Store from '../store/useKeepV2Store';
import getKeepV2 from '../api/keep/getKeepV2';

const useKeepEdit = () => {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isAllDeleted, setIsAllDeleted] = useState(false);
  const [removedSong, setRemovedSong] = useState<number[]>([]);
  //   const [isKeepLoading, setIsKeepLoading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const keepList = useKeepV2Store(state => state.keepList);
  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const size = 20;

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

  //   useEffect(() => {
  //     setInitKeep();
  //   }, []);

  // const handleOnPressSonglist = (songNumber: number) => {
  //   navigation.navigate(keepStackNavigations.KEEP_SONG_DETAIL, {songNumber});
  // };

  const handleIsAllSelected = () => {
    setIsAllDeleted(false);
    setIsAllSelected(true);
  };

  const handleIsAllDeleted = () => {
    setIsAllSelected(false);
    setIsAllDeleted(true);
  };

  //   const setInitKeep = async () => {
  //     setIsKeepLoading(true);
  //     const tempKeepList = await getKeep();
  //     setKeepList(tempKeepList.data);
  //     setIsKeepLoading(false);
  //   };

  const handleDeleteKeep = async (songNumbers: number[]) => {
    // console.log(songNumbers);
    await deleteKeep(songNumbers); //플리 삭제
    const updatedSongs = await getKeepV2(selectedFilter, -1, size); //업데이트된 플리 가져오기
    setKeepList(updatedSongs.data.songs); //keepList 업데이트
    setLastCursor(updatedSongs.data.lastCursor); //lastCursor 업데이트
    setIsEnded(false);
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
            // console.log('삭제');
            handleDeleteKeep(removedSong);
            setRemovedSong([]);
            Toast.show({
              type: 'selectedToast',
              text1: '보관함에서 삭제되었습니다.',
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
      text1: '보관함에서 삭제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  return {
    isRemoved,
    setIsRemoved,
    // isKeepLoading,
    isAllSelected,
    isAllDeleted,
    keepList,
    removedSong,
    handleIsAllSelected,
    handleIsAllDeleted,
    handleRemoveButton,
    handleInCircleButton,
    handleOutCircleButton,
    handleConfirmRemove,
    // handleOnPressSonglist,
  };
};

export default useKeepEdit;
