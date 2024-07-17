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

const mainTabNavigations = {
  HOME: 'Home',
  COMMUNITY: 'Community',
  KEEP: 'Keep',
} as const;

const appStackNavigations = {
  MAIN: 'Main',
  SPLASH: 'Splash',
} as const;

const homeStackNavigations = {
  RCD_HOME: 'RcdHome',
  RCD_DETAIL: 'RcdDetail',
} as const;

export {
  authNavigations,
  rcdNavigations,
  playlistNavigations,
  mainNavigations,
  mainTabNavigations,
  appStackNavigations,
  homeStackNavigations,
};
