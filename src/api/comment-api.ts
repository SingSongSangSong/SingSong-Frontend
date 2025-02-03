import {API_COMMENT} from '../constants/api';
import axiosInstance from './axiosIns';

export async function getComment(songId: string) {
  const res = await axiosInstance.get(API_COMMENT.SONG_COMMENT(Number(songId)));
  return res.data;
}

export async function postComment(
  content: string,
  isRecomment: boolean,
  parentCommentId: number,
  songId: number,
) {
  const res = await axiosInstance.post(API_COMMENT.COMMENT, {
    content,
    isRecomment,
    parentCommentId,
    songId,
  });
  return res.data;
}

export async function deleteComment(commentId: number) {
  const res = await axiosInstance.delete(
    API_COMMENT.COMMENT_COMMENT(commentId),
  );
  return res.data;
}

export async function getCommentLatest(size: number) {
  const res = await axiosInstance.get(API_COMMENT.COMMENT_LATEST, {
    params: {
      size,
    },
  });
  return res.data;
}

export async function postCommentLike(commentId: string) {
  const res = await axiosInstance.post(
    API_COMMENT.COMMENT_LIKE(Number(commentId)),
  );
  return res.data;
}

export async function postCommentReport(
  commentId: number,
  reason: string,
  subjectMemberId: number,
) {
  const res = await axiosInstance.post(API_COMMENT.COMMENT_REPORT, {
    commentId,
    reason,
    subjectMemberId,
  });
  return res.data;
}

export async function getRecentComment(size: number) {
  const res = await axiosInstance.get(API_COMMENT.COMMENT_RECENT, {
    params: {size},
  });
  return res.data;
}
