const playlistNavigations = {
  PLAYLIST: 'Playlist',
  SONGLIST: 'Songlist',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const;

const mainTabNavigations = {
  HOME: 'Home',
  PLAYGROUND: 'Playground',
  KEEP: 'Keep',
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
  SEARCH: '_Search',
  AI_RECOMMENDATION: '_AiRecommendation',
  NICKNAME_CHANGE: '_NicknameChange',
} as const;

const keepStackNavigations = {
  KEEP: '_Keep',
  KEEP_EDIT: '_KeepEdit',
  KEEP_SONG_DETAIL: '_KeepSongDetail',
  KEEP_COMMENT: '_KeepComment',
  KEEP_RECOMMENT: '_KeepRecomment',
  KEEP_REPORT: '_KeepReport',
} as const;

export {
  authNavigations,
  playlistNavigations,
  mainTabNavigations,
  appStackNavigations,
  homeStackNavigations,
  keepStackNavigations,
};
