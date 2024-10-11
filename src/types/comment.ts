import {Song} from '.';

interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  isRecomment: boolean;
  isLiked: boolean;
  likes: number;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  recomments: Comment[];
  songId: number;
}

interface PostCommentResponse {
  data: Comment;
  message: string;
}

interface GetCommentResponse {
  data: Comment[];
  message: string;
}

interface CommentReport {
  commentId: number;
  reason: string;
  reportId: number;
  reporterId: number;
  subjectMemberId: number;
}
interface PostCommentReportResponse {
  data: CommentReport;
  message: string;
}

interface PostCommentLikeResponse {
  data: string;
  message: string;
}

interface Blacklist {
  blockDate: string;
  memberId: number;
  nickname: string;
}

interface GetBlacklistResponse {
  data: Blacklist[];
  message: string;
}

interface CommentLatest {
  commentId: number;
  content: string;
  createdAt: string;
  isLiked: boolean;
  isRecomment: boolean;
  likes: number;
  memberId: number;
  nickname: string;
  parentCommentId: number;
  song: Song;
}

interface GetCommentLatestResponse {
  data: CommentLatest[];
  message: string;
}

export type {
  Comment,
  PostCommentResponse,
  GetCommentResponse,
  CommentReport,
  PostCommentReportResponse,
  PostCommentLikeResponse,
  Blacklist,
  GetBlacklistResponse,
  GetCommentLatestResponse,
  CommentLatest,
};
