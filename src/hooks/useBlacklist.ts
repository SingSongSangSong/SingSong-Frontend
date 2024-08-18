import {useEffect, useState} from 'react';
import getBlacklist from '../api/comment/getBlacklist';
import {Blacklist} from '../types';
import deleteBlacklist from '../api/comment/deleteBlacklist';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';

const useBlacklist = () => {
  const [blacklist, setBlacklist] = useState<Blacklist[]>();

  useEffect(() => {
    setInitBlacklist();
  }, []);

  const setInitBlacklist = async () => {
    const tempBlacklist = await getBlacklist();
    setBlacklist(tempBlacklist.data);
  };

  const _handleOnPress = async (memberId: number) => {
    await deleteBlacklist([memberId]);
    await setInitBlacklist();
    Toast.show({
      type: 'selectedToast',
      text1: '차단이 해제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const handleOnPressDelete = async (memberId: number) => {
    await deleteBlacklist([memberId]);
    await setInitBlacklist();
    Toast.show({
      type: 'selectedToast',
      text1: '차단이 해제되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
    // Alert.alert(
    //   '댓글 차단 해제',
    //   '댓글 차단을 해제하시겠습니까? 차단을 해제하면 댓글 및 답글을 확인 할 수 있습니다.',
    //   [
    //     {text: '취소', onPress: () => {}, style: 'cancel'},
    //     {
    //       text: '차단 해제',
    //       onPress: async () => {

    //       },
    //       style: 'destructive',
    //     },
    //   ],
    //   {
    //     cancelable: true,
    //     onDismiss: () => {},
    //   },
    // );
  };

  return {blacklist, handleOnPressDelete, _handleOnPress};
};

export default useBlacklist;
