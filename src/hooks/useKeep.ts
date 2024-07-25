import {useState} from 'react';
// import usePlaylistStore from '../store/usePlaylistStore';
import {buttonItem} from '../types';
import {Alert} from 'react-native';
import useKeepListStore from '../store/useKeepStore';

const useKeep = () => {
  // const playlists = usePlaylistStore(state => state.playlists);
  // const {playlists, getPlaylistInfo} = usePlaylistStore();
  const {keepList, removeSongFromKeep} = useKeepListStore();
  const [removedSong, setRemovedSong] = useState<number[]>([]);
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
            setRemovedSong([]);
            removedSong.map(song => {
              removeSongFromKeep(song);
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

  // const getPlaylistSongCount = (playlistId: string) => {
  //   return playlists[playlistId].length;
  // }

  return {
    keepList,
    removedSong,
    buttonItems,
    handleFolderPress,
    handleRemoveButton,
    handleInCircleButton,
    handleOutCircleButton,
    // getSonglist,
    // getPlaylistInfo,
  };
};

export default useKeep;
