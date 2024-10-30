interface Post {
  commentCount: number;
  content: string;
  createdAt: string;
  likes: number;
  memberId: number;
  nickname: string;
  postId: number;
  title: string;
}

interface PostDetailed {
  content: string;
  createdAt: string;
  isLiked: boolean;
  isWriter: boolean;
  likes: number;
  memberId: number;
  nickname: string;
  postId: number;
  songs: SongOnPostComment[];
  title: string;
}
interface GetPostsResponse {
  data: {
    lastCursor: number;
    posts: Post[];
  };
  message: string;
}

interface SongOnPostComment {
  album: string;
  isLive: boolean;
  isMr: boolean;
  melonLink: string;
  singerName: string;
  songId: number;
  songName: string;
  songNumber: number;
}

interface PostComments {
  content: string;
  createdAt: string;
  isLiked: boolean;
  isRecomment: boolean;
  isWriter: boolean;
  likes: number;
  memberId: number;
  nickname: string;
  parentPostCommentId: number;
  postCommentId: number;
  postId: number;
  postRecommentsCount: number;
  songOnPostComment: SongOnPostComment[];
}

interface GetPostsCommentsResponse {
  data: {
    lastCursor: number;
    postComments: PostComments[];
    totalPostCommentCount: number;
  };
  message: string;
}

interface GetPostsCommentsRecommentsResponse {
  data: {
    lastCursor: number;
    postReComments: PostComments[];
  };
  message: string;
}

interface GetPostsDetailedResponse {
  data: PostDetailed;
  message: string;
}

interface PostPostsResponse {
  data: {
    postId: number;
  };
  message: string;
}

interface PostPostsCommentsResponse {
  data: PostComments;
  message: string;
}

export type {
  Post,
  PostDetailed,
  GetPostsResponse,
  SongOnPostComment,
  PostComments,
  GetPostsCommentsResponse,
  GetPostsCommentsRecommentsResponse,
  GetPostsDetailedResponse,
  PostPostsResponse,
  PostPostsCommentsResponse,
};
