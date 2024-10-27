import {create} from 'zustand';
import {Comment} from '../types';

interface CommentState {
  comments: Map<number, Comment>;
  recomments: {[commentId: number]: Map<number, Comment>};
  commentCount: number;
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  updateIsLikedComment: (commentId: number, isLiked: boolean) => void;
  updateLikesComment: (commentId: number) => void;
  updateIsLikedRecomment: (
    commentId: number,
    recommentId: number,
    isLiked: boolean,
  ) => void;
  updateLikesRecomment: (commentId: number, recommentId: number) => void;
  addRecommentComment: (commentId: number, recomment: Comment) => void;
  getRecommentCount: (commentId: number) => number;
  getOrderedComments: () => Comment[];
  getOrderedRecomments: (commentId: number) => Comment[];
  setCommentCount: (count: number) => void;
  deleteComment: (commentId: number) => void;
  deleteRecomment: (commentId: number, recommentId: number) => void;
}

const useCommentStore = create<CommentState>((set, get) => ({
  comments: new Map(),
  recomments: {},
  commentCount: 0,

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
      const newComments = new Map([[comment.commentId, comment]]); // 새 댓글을 먼저 추가
      state.comments.forEach((value, key) => {
        newComments.set(key, value); // 기존 댓글을 뒤에 추가
      });
      return {
        comments: newComments,
        commentCount: state.commentCount + 1,
      };
    });
  },

  setCommentCount: (count: number) => {
    set({commentCount: count});
  },

  getOrderedComments: () => {
    return Array.from(get().comments.values());
  },

  getOrderedRecomments: (commentId: number) => {
    const recommentsMap = get().recomments[commentId];
    return recommentsMap ? Array.from(recommentsMap.values()) : [];
  },

  updateIsLikedComment: (commentId: number, isLiked: boolean) => {
    set(state => {
      const newComments = new Map(state.comments);
      const comment = newComments.get(commentId);
      if (comment) {
        comment.isLiked = isLiked;
      }
      return {comments: new Map(newComments)};
    });
  },

  updateLikesComment: (commentId: number) => {
    set(state => {
      const newComments = new Map(state.comments);
      const comment = newComments.get(commentId);
      if (comment) {
        comment.likes += 1;
      }
      return {comments: new Map(newComments)};
    });
  },

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
      const newRecomments = new Map(state.recomments[commentId]);
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

  deleteComment: (commentId: number) => {
    set(state => {
      const newComments = new Map(state.comments);
      const newRecomments = {...state.recomments};

      newComments.delete(commentId);
      delete newRecomments[commentId]; // 해당 댓글의 답글도 함께 삭제

      return {
        comments: newComments,
        recomments: newRecomments,
        commentCount: state.commentCount - 1,
      };
    });
  },

  deleteRecomment: (commentId: number, recommentId: number) => {
    set(state => {
      const newRecomments = new Map(state.recomments[commentId]);
      newRecomments.delete(recommentId);

      return {
        recomments: {
          ...state.recomments,
          [commentId]: newRecomments,
        },
      };
    });
  },
}));

export default useCommentStore;
