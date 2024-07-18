import {useState} from 'react';
import uuid from 'react-native-uuid';
import useRecommendStore from '../store/useRecommendStore';
import usePlaylistStore from '../store/usePlaylistStore';
import useSonglistStore from '../store/useSonglistStore';
import {buttonItem} from '../types';

const useKeep = () => {
  const {storedSong, setStoredSong} = useRecommendStore();
  const {playlist, setPlaylist} = usePlaylistStore();
  const {songlist, setSonglist} = useSonglistStore();
  const [modalVisible, setModalVisible] = useState(false);

  const buttonNames = ['전체', '최근', '인기', '신나는', '재밌는'];

  const buttonItems: buttonItem[] = buttonNames.map(name => ({
    name,
    onPress: () => {
      console.log(`${name} 버튼이 눌렸습니다.`);
    },
  }));

  const handleStoredPlaylist = () => {
    const id = String(uuid.v4());
    const shortId = id.slice(-7);
    const songCount = String(storedSong ? Object.keys(storedSong).length : 0);
    setPlaylist(id, `recommendation_result_${shortId}`, songCount);
    if (storedSong) {
      setSonglist(id, storedSong); //songid와 song객체 묶음
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleFolderPress = (id: string) => {
    console.log('폴더 클릭', id);
  }; //폴더 로직 추가 구현 필요

  return {
    storedSong,
    buttonItems,
    modalVisible,
    handleStoredPlaylist,
    handleCloseModal,
    handleFolderPress,
  };
};

export default useKeep;
