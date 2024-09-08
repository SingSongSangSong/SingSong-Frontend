import {useEffect, useState} from 'react';
import getComment from '../api/comment/getComment';
// import {useKeyboard} from '@react-native-community/hooks';
import postComment from '../api/comment/postComment';
import postCommentLike from '../api/comment/postCommentLike';
import useCommentStore from '../store/useCommentStore';
import postBlacklist from '../api/comment/postBlacklist';
import Toast from 'react-native-toast-message';

const useComment = (songNumber: number, songId: number) => {
  // const [comments, setComments] = useState<Comment[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<number>(0);
  const [reportSubjectMemberId, setReportSubjectMemberId] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlacklist, setIsBlacklist] = useState(false);
  // const {
  //   comments,
  //   setComments,
  //   addComment,
  //   updateIsLikedComment,
  //   updateLikesComment,
  //   getRecommentCount,
  //   getOrderedComments,
  // } = useCommentStore();
  const comments = useCommentStore(state => state.comments);
  const setComments = useCommentStore(state => state.setComments);
  const addComment = useCommentStore(state => state.addComment);
  const updateIsLikedComment = useCommentStore(
    state => state.updateIsLikedComment,
  );
  const updateLikesComment = useCommentStore(state => state.updateLikesComment);
  const getRecommentCount = useCommentStore(state => state.getRecommentCount);
  const getOrderedComments = useCommentStore(state => state.getOrderedComments);

  const orderedComments = getOrderedComments();

  // const keyboard = useKeyboard();

  useEffect(() => {
    setInitComments();
  }, []);

  const setInitComments = async () => {
    setIsLoading(true);
    const tempComments = await getComment(String(songId));

    setComments(tempComments.data); //Comment[], comment 데이터 설정

    setIsLoading(false);
  };

  //like 버튼 눌렀을 때
  const handleOnPressLikeButton = async (commentId: number) => {
    await postCommentLike(String(commentId));
    updateLikesComment(commentId); //like 수 업데이트
    updateIsLikedComment(commentId, true); //like 상태 업데이트
  };

  //send 버튼 눌렀을 때
  const handleOnPressSendButton = async (content: string) => {
    const tempComment = await postComment(content, false, 0, songId);
    addComment(tempComment.data); // 댓글 추가
  };

  //더보기 버튼 눌렀을 때
  const handleOnPressMoreInfo = (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => {
    setIsModalVisible(true);
    // setIsKeyboardVisible(false);
    setReportCommentId(reportCommentId);
    setReportSubjectMemberId(reportSubjectMemberId);
  };

  const handleOnPressBlacklistForIOS = () => {
    _handleOnPressBlacklist(reportSubjectMemberId);
    setIsModalVisible(false);
    // setIsKeyboardVisible(true);
    // setIsBlacklist(false);
    Toast.show({
      type: 'selectedToast',
      text1: '차단되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const handleOnPressBlacklist = () => {
    _handleOnPressBlacklist(reportSubjectMemberId);
    setIsModalVisible(false);
    setIsKeyboardVisible(true);
    setIsBlacklist(false);
    Toast.show({
      type: 'selectedToast',
      text1: '차단되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
    // Alert.alert(
    //   '차단',
    //   '사용자를 차단하면 이 사용자의 댓글과 활동이 숨겨집니다. 차단하시겠습니까?',
    //   [
    //     {text: '취소', onPress: () => {}, style: 'cancel'},
    //     {
    //       text: '확인',
    //       onPress: () => {

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

  const _handleOnPressBlacklist = async (reportSubjectMemberId: number) => {
    await postBlacklist(reportSubjectMemberId);
    await setInitComments();
  };

  return {
    isBlacklist,
    setIsBlacklist,
    isLoading,
    comments,
    reportCommentId,
    reportSubjectMemberId,
    isModalVisible,
    setIsModalVisible,
    isKeyboardVisible,
    setIsKeyboardVisible,
    handleOnPressSendButton,
    handleOnPressMoreInfo,
    handleOnPressLikeButton,
    getRecommentCount,
    handleOnPressBlacklist,
    orderedComments,
    handleOnPressBlacklistForIOS,
  };
};

export default useComment;
