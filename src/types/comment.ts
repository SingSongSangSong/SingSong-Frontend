interface Comment {
  commentId: number;
  content: string;
  createdAt: string;
  isRecomment: boolean;
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

export type {
  Comment,
  PostCommentResponse,
  GetCommentResponse,
  CommentReport,
  PostCommentReportResponse,
};
