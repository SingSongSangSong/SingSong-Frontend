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
} as const;

const homeStackNavigations = {
  RCD_HOME: '_RcdHome',
  RCD_DETAIL: '_RcdDetail',
  SETTING: '_Setting',
  SONG_DETAIL: '_SongDetail',
  COMMENT: '_Comment',
  RECOMMENT: '_Recomment',
  REPORT: '_Report',
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
