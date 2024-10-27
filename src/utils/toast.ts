import Toast from 'react-native-toast-message';

const showToast = (message: string) => {
  Toast.show({
    type: 'selectedToast',
    text1: message,
    position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
    visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
  });
};

export {showToast};
