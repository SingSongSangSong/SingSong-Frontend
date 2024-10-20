import {useState} from 'react';
// import {useKeyboard} from '@react-native-community/hooks';
import postComment from '../api/comment/postComment';
import postCommentLike from '../api/comment/postCommentLike';
import useCommentStore from '../store/useCommentStore';
import postBlacklist from '../api/comment/postBlacklist';
import getComment from '../api/comment/getComment';
import Toast from 'react-native-toast-message';
import {Alert} from 'react-native';
import {logTrack} from '../utils';

const useRecomment = (commentId: number) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBlacklist, setIsBlacklist] = useState(false);
  const [reportCommentId, setReportCommentId] = useState<number>(0);
  const [reportSubjectMemberId, setReportSubjectMemberId] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);

  // const {
  //   comments,
  //   recomments,
  //   setComments,
  //   updateIsLikedComment,
  //   updateLikesComment,
  //   addRecommentComment,
  //   updateIsLikedRecomment,
  //   updateLikesRecomment,
  //   getOrderedRecomments,
  // } = useCommentStore();

  const comments = useCommentStore(state => state.comments);
  const recomments = useCommentStore(state => state.recomments);
  const setComments = useCommentStore(state => state.setComments);
  const updateIsLikedComment = useCommentStore(
    state => state.updateIsLikedComment,
  );
  const updateLikesComment = useCommentStore(state => state.updateLikesComment);
  const addRecommentComment = useCommentStore(
    state => state.addRecommentComment,
  );
  const updateIsLikedRecomment = useCommentStore(
    state => state.updateIsLikedRecomment,
  );
  const updateLikesRecomment = useCommentStore(
    state => state.updateLikesRecomment,
  );
  const getOrderedRecomments = useCommentStore(
    state => state.getOrderedRecomments,
  );

  const orderedRecomments = getOrderedRecomments(commentId);
  // const keyboard = useKeyboard();ㄴ

  // 특정 댓글(commentId)의 답글 가져오기
  // const currentRecomments = recomments[commentId] || {};

  // 새 답글을 추가하는 함수
  const handleOnPressSendButton = async (content: string) => {
    logTrack('song_recomment_send_button_click');
    if (content.trim() == '') {
      Toast.show({
        type: 'selectedToast',
        text1: '답글을 입력해주세요.',
        position: 'bottom',
      });
    } else {
      const parentComment = comments.get(commentId);
      if (!parentComment) {
        return;
      }

      const tempRecomment = await postComment(
        content,
        true,
        parentComment.commentId,
        parentComment.songId,
      );

      // 답글을 스토어에 추가
      addRecommentComment(commentId, tempRecomment.data);
    }
  };

  const setInitRecomments = async () => {
    const tempComments = await getComment(
      String(comments.get(commentId)?.songId),
    );
    setComments(tempComments.data); //Comment[], comment 데이터 설정
  };

  const handleOnPressMoreInfo = (
    reportCommentId: number,
    reportSubjectMemberId: number,
  ) => {
    setIsModalVisible(true);
    // setIsKeyboardVisible(false);
    setReportCommentId(reportCommentId);
    setReportSubjectMemberId(reportSubjectMemberId);
  };

  const handleOnPressRecommentLikeButton = async (
    commentId: number,
    recommentId: number,
  ) => {
    //좋아요가 눌린 commentId 이용하여 업데이트
    await postCommentLike(String(recommentId));

    // 해당 댓글이 답글인지, 원 댓글인지 확인하고 상태 업데이트
    updateIsLikedRecomment(commentId, recommentId, true); // 좋아요 상태를 true로 설정
    updateLikesRecomment(commentId, recommentId); // 좋아요 개수를 증가
  };

  const handleOnPressCommentLikeButton = async (commentId: number) => {
    //좋아요가 눌린 commentId 이용하여 업데이트
    await postCommentLike(String(commentId));
    logTrack('song_recomment_like_button_click');
    // 해당 댓글이 답글인지, 원 댓글인지 확인하고 상태 업데이트
    updateIsLikedComment(commentId, true); // 좋아요 상태를 true로 설정
    updateLikesComment(commentId); // 좋아요 개수를 증가
  };

  const handleOnPressBlacklistForIOS = () => {
    _handleOnPressBlacklist(reportSubjectMemberId);
    setIsModalVisible(false);
    setIsKeyboardVisible(true);
    // setIsBlacklist(false);
    Toast.show({
      type: 'selectedToast',
      text1: '차단되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
  };

  const _handleOnPressBlacklist = async (reportSubjectMemberId: number) => {
    await postBlacklist(reportSubjectMemberId);
    await setInitRecomments();
  };

  const handleOnPressBlacklist = () => {
    _handleOnPressBlacklist(reportSubjectMemberId);
    setIsBlacklist(false);
    setIsModalVisible(false);
    setIsKeyboardVisible(true);
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
    //       onPress: () => {},
    //       style: 'destructive',
    //     },
    //   ],
    //   {
    //     cancelable: true,
    //     onDismiss: () => {},
    //   },
    // );
  };

  return {
    recomments: recomments[commentId], // 특정 댓글의 답글들을 반환
    reportCommentId,
    reportSubjectMemberId,
    isModalVisible,
    isKeyboardVisible,
    setIsModalVisible,
    setIsKeyboardVisible,
    parentComment: comments.get(commentId), // 해당 댓글 정보를 반환
    handleOnPressSendButton,
    handleOnPressMoreInfo,
    handleOnPressCommentLikeButton,
    handleOnPressRecommentLikeButton,
    handleOnPressBlacklist,
    orderedRecomments,
    isBlacklist,
    setIsBlacklist,
    handleOnPressBlacklistForIOS,
  };
};

export default useRecomment;
