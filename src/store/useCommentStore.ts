import {create} from 'zustand';
import {Comment} from '../types';

interface CommentState {
  comments: Map<number, Comment>; // Map으로 변경
  recomments: {[commentId: number]: Map<number, Comment>};
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
  getOrderedComments: () => Comment[];
  getOrderedRecomments: (commentId: number) => Comment[];
}

const useCommentStore = create<CommentState>((set, get) => ({
  comments: new Map(),
  recomments: {},

  // 댓글 배열을 설정하는 함수
  setComments: (comments: Comment[]) => {
    const commentsMap = new Map(
      comments.map(comment => [comment.commentId, comment]),
    );

    const recommentsMap = comments.reduce((acc, comment) => {
      if (comment.recomments.length > 0) {
        acc[comment.commentId] = new Map(
          comment.recomments.map(recomment => [recomment.commentId, recomment]),
        );
      }
      return acc;
    }, {} as {[commentId: number]: Map<number, Comment>});

    set({
      comments: commentsMap,
      recomments: recommentsMap,
    });
  },

  addComment: (comment: Comment) => {
    set(state => {
      const newComments = new Map();
      newComments.set(comment.commentId, comment); // 새 댓글을 먼저 추가
      state.comments.forEach((value, key) => {
        newComments.set(key, value); // 기존 댓글을 뒤에 추가
      });
      return {
        comments: newComments,
      };
    });
  },

  getOrderedComments: () => {
    return Array.from(get().comments.values());
  },

  getOrderedRecomments: (commentId: number) => {
    const recommentsMap = get().recomments[commentId];
    return recommentsMap ? Array.from(recommentsMap.values()) : [];
  },

  // 특정 댓글 ID의 좋아요 상태를 업데이트하는 함수
  updateIsLikedComment: (commentId: number, isLiked: boolean) => {
    set(state => {
      const newComments = new Map(state.comments);
      const comment = newComments.get(commentId);
      if (comment) {
        comment.isLiked = isLiked;
      }
      return {
        comments: new Map(newComments),
      };
    });
  },

  // 특정 댓글 ID의 좋아요 개수를 1 증가시키는 함수
  updateLikesComment: (commentId: number) => {
    set(state => {
      const newComments = new Map(state.comments);
      const comment = newComments.get(commentId);
      if (comment) {
        comment.likes += 1;
      }
      return {
        comments: new Map(newComments),
      };
    });
  },

  // 특정 답글의 좋아요 상태를 업데이트하는 함수
  updateIsLikedRecomment: (
    commentId: number,
    recommentId: number,
    isLiked: boolean,
  ) => {
    set(state => {
      const newRecomments = new Map(state.recomments[commentId]);
      const recomment = newRecomments.get(recommentId);
      if (recomment) {
        recomment.isLiked = isLiked;
      }
      return {
        recomments: {
          ...state.recomments,
          [commentId]: newRecomments,
        },
      };
    });
  },

  // 특정 답글의 좋아요 개수를 1 증가시키는 함수
  updateLikesRecomment: (commentId: number, recommentId: number) => {
    set(state => {
      const newRecomments = new Map(state.recomments[commentId]);
      const recomment = newRecomments.get(recommentId);
      if (recomment) {
        recomment.likes += 1;
      }
      return {
        recomments: {
          ...state.recomments,
          [commentId]: newRecomments,
        },
      };
    });
  },

  addRecommentComment: (commentId: number, recomment: Comment) => {
    set(state => {
      const newRecomments = new Map(state.recomments[commentId]); // 기존 답글을 먼저 복사

      // 새 답글을 뒤에 추가
      newRecomments.set(recomment.commentId, recomment);

      return {
        recomments: {
          ...state.recomments,
          [commentId]: newRecomments,
        },
      };
    });
  },

  getRecommentCount: (commentId: number) => {
    const state = get();
    const recommentsForComment = state.recomments[commentId];
    return recommentsForComment ? recommentsForComment.size : 0;
  },
}));

export default useCommentStore;
