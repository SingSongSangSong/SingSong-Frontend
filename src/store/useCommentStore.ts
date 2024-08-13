import {create} from 'zustand';
import {Comment} from '../types';

// CommentState 인터페이스 정의
interface CommentState {
  comments: {[commentId: number]: Comment}; // commentId를 키로 사용하는 댓글 객체
  recomments: {[commentId: number]: {[recommentId: number]: Comment}}; // commentId와 recommentId를 키로 사용하는 답글 객체
  setComments: (comments: Comment[]) => void; // 댓글 배열을 설정
  addComment: (comment: Comment) => void; // 댓글 추가
  updateIsLikedComment: (commentId: number, isLiked: boolean) => void;
  updateLikesComment: (commentId: number) => void;
  updateIsLikedRecomment: (
    commentId: number,
    recommentId: number,
    isLiked: boolean,
  ) => void;
  updateLikesRecomment: (commentId: number, recommentId: number) => void;
  addRecommentComment: (commentId: number, recomment: Comment) => void; // recomment 더하기
  getRecommentCount: (commentId: number) => number;
}

const useCommentStore = create<CommentState>((set, get) => ({
  comments: {},
  recomments: {},

  // 댓글 배열을 설정하는 함수
  setComments: (comments: Comment[]) => {
    const commentsMap = comments.reduce((acc, comment) => {
      acc[comment.commentId] = comment;
      return acc;
    }, {} as {[commentId: number]: Comment});

    const recommentsMap = comments.reduce((acc, comment) => {
      if (comment.recomments.length > 0) {
        acc[comment.commentId] = comment.recomments.reduce(
          (reAcc, recomment) => {
            reAcc[recomment.commentId] = recomment;
            return reAcc;
          },
          {} as {[recommentId: number]: Comment},
        );
      }
      return acc;
    }, {} as {[commentId: number]: {[recommentId: number]: Comment}});

    set({
      comments: commentsMap,
      recomments: recommentsMap,
    });
  },

  // 새로운 댓글을 추가하는 함수
  addComment: (comment: Comment) => {
    set(state => ({
      comments: {
        ...state.comments,
        [comment.commentId]: comment,
      },
    }));
  },

  // 특정 댓글 ID의 좋아요 상태를 업데이트하는 함수
  updateIsLikedComment: (commentId: number, isLiked: boolean) => {
    set(state => ({
      comments: {
        ...state.comments,
        [commentId]: {
          ...state.comments[commentId],
          isLiked,
        },
      },
    }));
  },

  // 특정 댓글 ID의 좋아요 개수를 1 증가시키는 함수
  updateLikesComment: (commentId: number) => {
    set(state => ({
      comments: {
        ...state.comments,
        [commentId]: {
          ...state.comments[commentId],
          likes: state.comments[commentId].likes + 1,
        },
      },
    }));
  },

  // 특정 답글의 좋아요 상태를 업데이트하는 함수
  updateIsLikedRecomment: (
    commentId: number,
    recommentId: number,
    isLiked: boolean,
  ) => {
    set(state => ({
      recomments: {
        ...state.recomments,
        [commentId]: {
          ...state.recomments[commentId],
          [recommentId]: {
            ...state.recomments[commentId][recommentId],
            isLiked,
          },
        },
      },
    }));
  },

  // 특정 답글의 좋아요 개수를 1 증가시키는 함수
  updateLikesRecomment: (commentId: number, recommentId: number) => {
    set(state => ({
      recomments: {
        ...state.recomments,
        [commentId]: {
          ...state.recomments[commentId],
          [recommentId]: {
            ...state.recomments[commentId][recommentId],
            likes: state.recomments[commentId][recommentId].likes + 1,
          },
        },
      },
    }));
  },

  // 특정 댓글에 답글을 추가하는 함수
  addRecommentComment: (commentId: number, recomment: Comment) => {
    set(state => ({
      recomments: {
        ...state.recomments,
        [commentId]: {
          ...state.recomments[commentId],
          [recomment.commentId]: recomment,
        },
      },
    }));
  },
  getRecommentCount: (commentId: number) => {
    const state = get();
    const recommentsForComment = state.recomments[commentId];
    return recommentsForComment ? Object.keys(recommentsForComment).length : 0;
  },
}));

export default useCommentStore;
