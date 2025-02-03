import {API_POST} from '../constants/api';
import axiosInstance from './axiosIns';

export async function deletePostComment(postCommentId: number) {
  const res = await axiosInstance.get(API_POST.POST_RECOMMENT(postCommentId));
  return res.data;
}

export async function deletePosts(postId: number) {
  const res = await axiosInstance.delete(API_POST.POST_POST(postId));
  return res.data;
}

export async function getPosts(cursor: number, size: number) {
  const params: {cursor?: number; size: number} = {size: size};
  if (cursor !== -1) {
    params.cursor = cursor;
  }
  const res = await axiosInstance.get(API_POST.POST, {params});
  return res.data;
}

export async function getPostsComments(
  postId: number,
  cursor: number,
  size: number,
) {
  const params: {postId: number; cursor?: number; size: number} = {
    postId: postId,
    size: size,
  };
  if (cursor !== -1) {
    params.cursor = cursor;
  }
  const res = await axiosInstance.get(API_POST.POST_COMMENTS(postId), {params});
  return res.data;
}

export async function getPostsCommentsRecomments(
  postCommentId: number,
  cursor: number,
  size: number,
) {
  const params: {cursor?: number; size: number} = {size: size};
  if (cursor !== -1) {
    params.cursor = cursor;
  }
  const res = await axiosInstance.get(
    API_POST.POST_COMMENTS_RECOMMENTS(postCommentId),
    {
      params,
    },
  );
  return res.data;
}

export async function getPostsDetailed(postId: number) {
  const res = await axiosInstance.get(API_POST.POST_POST(postId));
  return res.data;
}

export async function postPosts(
  content: string,
  songIds: number[],
  title: string,
) {
  const res = await axiosInstance.post(API_POST.POST, {
    content,
    songIds,
    title,
  });
  return res.data;
}

export async function postPostsComments(
  content: string,
  isRecomment: boolean,
  parentCommentId: number,
  postId: number,
  songIds: number[],
) {
  const res = await axiosInstance.post(API_POST.POST_COMMENT, {
    content,
    isRecomment,
    parentCommentId,
    postId,
    songIds,
  });

  return res.data;
}

export async function postPostsCommentsLike(postCommentId: number) {
  const res = await axiosInstance.post(
    API_POST.POST_COMMENT_LIKE(postCommentId),
  );
  return res.data;
}

export async function postPostsCommentsReport(
  commentId: number,
  reason: string,
  subjectMemberId: number,
) {
  const res = await axiosInstance.post(API_POST.POST_COMMENT_REPORT, {
    commentId,
    reason,
    subjectMemberId,
  });

  return res.data;
}

export async function postPostsLike(postId: number) {
  const res = await axiosInstance.post(API_POST.POST_LIKE(postId));
  return res.data;
}

export async function postPostsReport(
  postId: number,
  reason: string,
  subjectMemberId: number,
) {
  const res = await axiosInstance.post(API_POST.POST_REPORT(postId), {
    reason,
    subjectMemberId,
  });
  return res.data;
}
