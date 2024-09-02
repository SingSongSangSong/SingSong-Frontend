import {useEffect, useRef, useState} from 'react';
import postCommentReport from '../api/comment/postCommentReport';
import {TextInput} from 'react-native';
import Toast from 'react-native-toast-message';

const useReport = (commentId: number, subjectMemberId: number) => {
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
      await postCommentReport(commentId, text, subjectMemberId);
    } else {
      await postCommentReport(commentId, reportReason, subjectMemberId);
    }
    Toast.show({
      type: 'selectedToast',
      text1: '신고가 완료되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
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

export default useReport;
