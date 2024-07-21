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
} as const;

const homeStackNavigations = {
  RCD_HOME: 'RcdHome',
  RCD_DETAIL: 'RcdDetail',
} as const;

const keepStackNavigations = {
  PLAYLIST: 'Playlist',
  SONGLIST: 'Songlist',
} as const;

export {
  authNavigations,
  playlistNavigations,
  mainTabNavigations,
  appStackNavigations,
  homeStackNavigations,
  keepStackNavigations,
};
