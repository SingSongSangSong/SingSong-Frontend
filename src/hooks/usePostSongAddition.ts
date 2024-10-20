import {logButtonClick, logTrack} from '../utils';
import {PlaygroundStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {playgroundStackNavigations} from '../constants';
import {Keyboard} from 'react-native';
import usePostSongStore from '../store/usePostSongStore';

type UsePostSongAdditionProps = {
  navigation: StackNavigationProp<
    PlaygroundStackParamList,
    typeof playgroundStackNavigations.PLAYGROUND_POST_SONG_ADDITION
  >;
};

const usePostSongAddition = ({navigation}: UsePostSongAdditionProps) => {
  const setPostSong = usePostSongStore(state => state.setPostSong);
  const postSongIds = usePostSongStore(state =>
    state.postSong.map(song => song.songId),
  );

  const handleOnPressComplete = () => {
    try {
      Keyboard.dismiss();
      logTrack('post_write_complete_button_click');
      navigation.goBack();
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const handleOnPressCancel = () => {
    logButtonClick('post_write_cancel_button_click');
    setPostSong([]); // reset하기
    navigation.goBack();
  };

  return {
    postSongIds,
    handleOnPressComplete,
    handleOnPressCancel,
  };
};

export default usePostSongAddition;
