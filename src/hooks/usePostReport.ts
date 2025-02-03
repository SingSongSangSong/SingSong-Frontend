import {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import {StackNavigationProp} from '@react-navigation/stack';
import {PlaygroundStackParamList} from '../types';
import {playgroundStackNavigations} from '../constants';
import {postPostsReport} from '../api/post-api';

type UsePostReportProps = {
  navigation: StackNavigationProp<
    PlaygroundStackParamList,
    typeof playgroundStackNavigations.PLAYGROUND_POST_REPORT
  >;
  postId: number;
  subjectMemberId: number;
};

const usePostReport = ({
  navigation,
  postId,
  subjectMemberId,
}: UsePostReportProps) => {
  const [text, setText] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [reportReason, setReportReason] = useState<string>('');
  const textInputRef = useRef<TextInput>(null);
  const [placeholder, setPlaceholder] =
    useState<string>('기타를 선택한 후 입력해주세요');

  useEffect(() => {
    if (isEditable && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [isEditable]);

  const handleOnPressRadioButton = (reportReason: string) => {
    if (reportReason === '기타') {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
    setReportReason(reportReason);
    // console.log(reportReason);
  };

  const handleOnPressSubmit = async () => {
    // console.log(commentId, reportReason, subjectMemberId);
    if (reportReason == '기타') {
      if (text.trim() === '') {
        Toast.show({
          type: 'selectedToast',
          text1: '신고 사유를 입력해주세요.',
          position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
          visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
        });
        return;
      } else {
        await postPostsReport(postId, text, subjectMemberId); //react query로 변경하긴 해야함
      }
    } else {
      if (reportReason.trim() === '') {
        Toast.show({
          type: 'selectedToast',
          text1: '신고 사유를 선택해주세요.',
          position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
          visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
        });
        return;
      } else {
        await postPostsReport(postId, reportReason, subjectMemberId);
      }
    }
    Toast.show({
      type: 'selectedToast',
      text1: '신고가 완료되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
    navigation.goBack();
  };

  const handleOnFocus = () => {
    setPlaceholder('');
  };

  const handleOnBlur = () => {
    setPlaceholder('기타를 선택한 후 입력해주세요');
  };

  return {
    isEditable,
    textInputRef,
    placeholder,
    text,
    setText,
    handleOnPressRadioButton,
    handleOnPressSubmit,
    handleOnFocus,
    handleOnBlur,
  };
};

export default usePostReport;
