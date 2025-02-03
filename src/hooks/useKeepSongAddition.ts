import {logButtonClick, logTrack} from '../utils';
import {KeepStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {keepStackNavigations} from '../constants';
import {Keyboard} from 'react-native';
import useKeepAdditionSongStore from '../store/useKeepAdditionSongStore';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useKeepV2Store from '../store/useKeepV2Store';
import {getKeepV2, postKeep} from '../api/keep-api';

type UseKeepSongAdditionProps = {
  navigation: StackNavigationProp<
    KeepStackParamList,
    typeof keepStackNavigations.KEEP_SONG_ADDITION
  >;
};

const useKeepSongAddition = ({navigation}: UseKeepSongAdditionProps) => {
  const setKeepAdditionSong = useKeepAdditionSongStore(
    state => state.setKeepAdditionSong,
  );
  const keepAdditionSongIds = useKeepAdditionSongStore(state =>
    state.keepAdditionSong.map(song => song.songId),
  );
  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setGlobalLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);

  const {mutateAsync: mutatePostKeep} = useMutation({
    mutationFn: async (songIds: number[]) => {
      return postKeep(songIds);
    },

    onError: () => {
      Toast.show({
        type: 'selectedToast',
        text1: '에러가 발생하였습니다. 잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: () => {
      getKeepV2(selectedFilter, -1, 20)
        .then(tempData => {
          setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
          setGlobalLastCursor(tempData.data.lastCursor);
          setIsEnded(false);
        })
        .catch(error => {
          console.error('Error updating keep list:', error);
        });
      Toast.show({
        type: 'selectedToast',
        text1: '보관함에 추가되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      setKeepAdditionSong([]);
      navigation.goBack();
    },
  });

  const handleOnPressComplete = () => {
    try {
      Keyboard.dismiss();
      logTrack('keep_addition_song_complete_button_click');
      mutatePostKeep(keepAdditionSongIds);
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const handleOnPressCancel = () => {
    logButtonClick('keep_addition_song_cancel_button_click');
    setKeepAdditionSong([]); // reset하기
    navigation.goBack();
  };

  return {
    keepAdditionSongIds,
    handleOnPressComplete,
    handleOnPressCancel,
  };
};

export default useKeepSongAddition;
