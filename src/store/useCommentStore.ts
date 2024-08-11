import {create} from 'zustand';
import {Comment} from '../types';

// CommentState 인터페이스 정의
interface CommentState {
  recommentCount: {[commentId: number]: number}; // 댓글 ID를 키로, 답글 개수를 값으로 가짐
  setRecommentCount: (comments: Comment[]) => void; // 댓글 배열을 받아 답글 개수를 설정
  addRecommentCount: (commentId: number) => void; // 특정 댓글 ID의 답글 개수를 증가
}

// zustand 스토어 생성
const useCommentStore = create<CommentState>((set, get) => {
  // 초기 상태
  const initState = {
    recommentCount: {},
  };

  return {
    ...initState,

    // 댓글 배열을 받아 답글 개수를 설정하는 함수
    setRecommentCount: (comments: Comment[]) => {
      const recommentCount = comments.reduce((acc, comment) => {
        acc[comment.commentId] = comment.recomments.length; // commentId를 키로, 답글 개수를 값으로 설정
        return acc;
      }, {} as {[commentId: number]: number});

      set({recommentCount}); // 상태 업데이트
    },

    // 특정 댓글 ID의 답글 개수를 증가시키는 함수
    addRecommentCount: (commentId: number) => {
      const {recommentCount} = get(); // 현재 상태 가져오기
      const updatedCount = recommentCount[commentId]
        ? recommentCount[commentId] + 1
        : 1;
      set({recommentCount: {...recommentCount, [commentId]: updatedCount}}); // 상태 업데이트
    },
  };
});

export default useCommentStore;
