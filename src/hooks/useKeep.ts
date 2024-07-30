import {useEffect, useState} from 'react';
import {buttonItem} from '../types';
import {Alert} from 'react-native';
import useKeepListStore from '../store/useKeepStore';
import getKeep from '../api/keep/getKeep';
import deleteKeep from '../api/keep/deleteKeep';

const useKeep = () => {
  const {keepList, setKeepList} = useKeepListStore();
  const [removedSong, setRemovedSong] = useState<number[]>([]);

  useEffect(() => {
    if (keepList.length == 0) {
      setInitKeep();
    }
  }, []);

  const setInitKeep = async () => {
    const tempKeepList = await getKeep();
    setKeepList(tempKeepList.data);
  };

  const handleDeleteKeep = async (songNumbers: number[]) => {
    const updatedSongs = await deleteKeep({songNumbers: songNumbers});
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
            handleDeleteKeep(removedSong);
            setRemovedSong([]);
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

  return {
    keepList,
    removedSong,
    buttonItems,
    handleFolderPress,
    handleRemoveButton,
    handleInCircleButton,
    handleOutCircleButton,
  };
};

export default useKeep;
