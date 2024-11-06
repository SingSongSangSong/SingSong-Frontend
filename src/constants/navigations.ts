const playlistNavigations = {
  PLAYLIST: 'Playlist',
  SONGLIST: 'Songlist',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const;

const mainTabNavigations = {
  HOME: '홈',
  PLAYGROUND: '게시판',
  KEEP: '보관함',
  SEARCH: '검색',
} as const;

const appStackNavigations = {
  MAIN: 'Main',
  SPLASH: 'Splash',
  LOGIN: 'Login',
  TERMS: 'Terms',
} as const;

const homeStackNavigations = {
  RCD_HOME: '_Home',
  RCD_DETAIL: '_RcdDetail',
  SETTING: '_Setting',
  SONG_DETAIL: '_SongDetail',
  COMMENT: '_Comment',
  RECOMMENT: '_Recomment',
  REPORT: '_Report',
  TAG_DETAIL: '_TagDetail',
  BLACKLIST: '_Blacklist',
  // SEARCH: '_Search',
  AI_RECOMMENDATION: '_AiRecommendation',
  NICKNAME_CHANGE: '_NicknameChange',
  AI_LLM: '_AiLlm',
  AI_LLM_RESULT: '_AiLlmResult',
  AI_LLM_INFO: '_AiLlmInfo',
  NEW_SONG: '_NewSong',
} as const;

const keepStackNavigations = {
  KEEP: '_Keep',
  KEEP_EDIT: '_KeepEdit',
  KEEP_SONG_DETAIL: '_KeepSongDetail',
  KEEP_COMMENT: '_KeepComment',
  KEEP_RECOMMENT: '_KeepRecomment',
  KEEP_REPORT: '_KeepReport',
  KEEP_AI_RECOMMENDATION: '_KeepAiRecommendation',
  KEEP_SONG_ADDITION: '_KeepSongAddition',
} as const;

const playgroundStackNavigations = {
  PLAYGROUND: '_Playground',
  PLAYGROUND_POST_WRITE: '_PlaygroundPostWrite',
  PLAYGROUND_POST_DETAIL: '_PlaygroundPostDetailed',
  PLAYGROUND_POST_REPORT: '_PlaygroundPostReport',
  PLAYGROUND_COMMENT_REPORT: '_PlaygroundCommentReport',
  PLAYGROUND_POST_SONG_ADDITION: '_PlaygroundPostSongAddition',
} as const;

const searchStackNavigations = {
  SEARCH: '_Search',
  SEARCH_SONG_DETAIL: '_SearchSongDetail',
  SEARCH_COMMENT: '_SearchComment',
  SEARCH_RECOMMENT: '_SearchRecomment',
  SEARCH_REPORT: '_SearchReport',
  SEARCH_FOCUSED: '_SearchFocused',
  SEARCH_AI_LLM: '_SearchAiLlm',
  SEARCH_AI_LLM_RESULT: '_SearchAiLlmResult',
  SEARCH_AI_LLM_INFO: '_SearchAiLlmInfo',
  SEARCH_RCD_DETAIL: '_SearchRcdDetail',
} as const;

const deepLinkNavigations = {
  HOME: 'home',
  PLAYGROUND: 'playground',
  SONG: 'song',
} as const;

export {
  authNavigations,
  playlistNavigations,
  mainTabNavigations,
  appStackNavigations,
  homeStackNavigations,
  keepStackNavigations,
  playgroundStackNavigations,
  searchStackNavigations,
  deepLinkNavigations,
};
