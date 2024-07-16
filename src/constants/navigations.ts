const mainNavigations = {
  SPLASH: 'Splash',
  HOME: 'Home',
  RECOMMENDATION: 'Recommendation',
} as const;

const playlistNavigations = {
  PLAYLIST: 'Playlist',
  SONGLIST: 'Songlist',
} as const;

const rcdNavigations = {
  RCD_HOME: 'RcdHome',
  RCD_TAG: 'Tag',
  RCD_KEEP: 'Keep',
} as const;

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  LOGIN: 'Login',
} as const;

export {authNavigations, rcdNavigations, playlistNavigations, mainNavigations};
