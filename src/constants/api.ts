export const API_MEMBER = Object.freeze({
  MEMBER: '/v1/member',
  NICKNAME: 'v1/member/nickname',
  LOGIN: '/v2/member/login',
  LOGIN_EXTRA: '/v2/member/login/extra',
  LOGOUT: 'v1/member/logout',
  REISSUE: 'v1/member/reissue',
  WITHDRAW: 'v1/member/withdraw',
  BLACKLIST: 'v1/blacklist',
});

export const API_COMMENT = Object.freeze({
  COMMENT: '/v1/comment',
  COMMENT_COMMENT: (commentId: number) => `/v1/comment/${commentId}`,
  SONG_COMMENT: (songId: number) => `/v1/comment/${songId}`,
  COMMENT_LATEST: '/v1/comment/latest',
  COMMENT_LIKE: (commentId: number) => `/v1/comment/${commentId}/like`,
  COMMENT_REPORT: 'v1/comment/report',
  COMMENT_RECENT: 'v1/recent/comment',
});

export const API_KEEP = Object.freeze({
  KEEP_V1: '/v1/keep',
  KEEP_V2: '/v2/keep',
  KEEP_RECENT: 'v1/recent/keep',
});

export const API_SONG = Object.freeze({
  SONG_NEW: 'v1/songs/new',
  SONG_REVIEW: (songNumber: string) => `v1/songs/${songNumber}/reviews`,
  SONG_CHART: 'v2/chart',
  SONG_REVIEW_OPTIONS: 'v1/song-review-options',
  SONG_DETAIL: (songNumber: string) => `v1/songs/${songNumber}`,
  SONG_RELATED: (songNumber: string) => `v1/songs/${songNumber}/related`,
  SONG_RECOMMEND_HOME: 'v1/recommend/home',
  SONG_RECOMMEND_REFRESH: 'v2/recommend/refresh',
  SONG_TAG: 'v4/tags',
});

export const API_POST = Object.freeze({
  POST_RECOMMENT: (postCommentId: number) =>
    `/v1/post/comments/${postCommentId}`,
  POST_POST: (postId: number) => `/v1/posts/${postId}`,
  POST: '/v1/posts',
  POST_COMMENTS: (postId: number) => `/v1/posts/${postId}/comments`,
  POST_COMMENTS_RECOMMENTS: (postCommentId: number) =>
    `/v1/posts/comments/${postCommentId}/recomments`,
  POST_COMMENT: '/v1/posts/comments',
  POST_COMMENT_LIKE: (postCommentId: number) =>
    `/v1/posts/comments/${postCommentId}/like`,
  POST_COMMENT_REPORT: '/v1/posts/comments/report',
  POST_LIKE: (postId: number) => `/v1/posts/${postId}/likes`,
  POST_REPORT: (postId: number) => `/v1/posts/${postId}/reports`,
});

export const API_SEARCH = Object.freeze({
  SEARCH_KEYWORD: (searchKeyword: string) => `v2/search/${searchKeyword}`,
  SEARCH_ARTIST: 'v2/search/artist-name',
  SEARCH_SONG_NAME: 'v2/search/song-name',
  SEARCH_SONG_NUMBER: 'v2/search/song-number',
  SEARCH_RECENT: 'v1/recent/search',
});
