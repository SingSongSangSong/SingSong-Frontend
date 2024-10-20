import {useState} from 'react';
import {logButtonClick, logRefresh, logTrack} from '../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {PlaygroundStackParamList} from '../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {playgroundStackNavigations} from '../constants';
import Toast from 'react-native-toast-message';
import postPosts from '../api/post/postPosts';
import {useMutation} from '@tanstack/react-query';
import {Keyboard} from 'react-native';
import usePostSongStore from '../store/usePostSongStore';

type UsePostWriteProps = {
  navigation: StackNavigationProp<
    PlaygroundStackParamList,
    typeof playgroundStackNavigations.PLAYGROUND_POST_WRITE
  >;
};

const usePostWrite = ({navigation}: UsePostWriteProps) => {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const getPostSongId = usePostSongStore(state => state.getPostSongId);
  const removeAllPostSong = usePostSongStore(state => state.removeAllPostSong);
  // const [songIds, setSongIds] = useState<number[]>([]);

  const {mutateAsync, isLoading} = useMutation({
    mutationFn: async () => {
      if (!title || !contents || !title.trim() || !contents.trim()) {
        Toast.show({
          type: 'selectedToast',
          text1: '제목과 내용을 입력해주세요.',
          position: 'bottom',
          visibilityTime: 2000,
        });
        throw new Error('제목과 내용을 입력해주세요.'); // 오류 발생 시 예외 처리
      }
      const songIds = getPostSongId();
      return postPosts(contents, songIds, title);
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'selectedToast',
        // text1: '에러가 발생했습니다.',
        text1: error.message || '잠시 후 다시 시도해주세요.',
        position: 'bottom',
        visibilityTime: 2000,
      });
    },
    onSuccess: () => {
      removeAllPostSong();
      Toast.show({
        type: 'selectedToast',
        text1: '성공적으로 등록되었습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      navigation.goBack();
      // 성공 시 추가 로직 (예: navigation.pop())
    },
  });

  const handleOnPressComplete = async () => {
    // if (!title || !contents || !title.trim() || !contents.trim()) {
    //   Toast.show({
    //     type: 'selectedToast',
    //     text1: '제목과 내용을 입력해주세요.',
    //     position: 'bottom',
    //     visibilityTime: 2000,
    //   });
    //   return;
    // }
    try {
      Keyboard.dismiss();
      await mutateAsync(); // 인자 없이 호출 가능
      logTrack('post_write_complete_button_click');
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const handleOnPressSongAddition = () => {
    logButtonClick('post_write_song_addition_button_click');
    navigation.navigate(
      playgroundStackNavigations.PLAYGROUND_POST_SONG_ADDITION,
    );
  };

  const handleOnPressClose = () => {
    removeAllPostSong();
    navigation.goBack();
  };

  return {
    title,
    setTitle,
    contents,
    setContents,
    handleOnPressComplete,
    handleOnPressSongAddition,
    handleOnPressClose,
  };
};

export default usePostWrite;
