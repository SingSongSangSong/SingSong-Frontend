import {
  appStackNavigations,
  authNavigations,
  homeStackNavigations,
  mainNavigations,
  mainTabNavigations,
  playlistNavigations,
  rcdNavigations,
} from '../constants';

type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
};

type MainStackParamList = {
  [mainNavigations.SPLASH]: undefined;
  [mainNavigations.HOME]: undefined;
  [mainNavigations.RECOMMENDATION]: {tag: string};
  [playlistNavigations.PLAYLIST]: undefined;
  [playlistNavigations.SONGLIST]: {playlistId: string};
};

type RcdTabParamList = {
  [rcdNavigations.RCD_TAG]: undefined;
  [rcdNavigations.RCD_HOME]: {tag: string};

  [rcdNavigations.RCD_KEEP]: undefined;
};

type MainTabParamList = {
  [mainTabNavigations.COMMUNITY]: undefined;
  [mainTabNavigations.HOME]: undefined;
  [mainTabNavigations.KEEP]: undefined;
};

type AppStackParamList = {
  [appStackNavigations.SPLASH]: undefined;
  [appStackNavigations.MAIN]: undefined;
};

type HomeStackParamList = {
  [homeStackNavigations.RCD_HOME]: undefined;
  [homeStackNavigations.RCD_DETAIL]: {tag: string};
};
export type {
  AuthStackParamList,
  MainStackParamList,
  RcdTabParamList,
  MainTabParamList,
  AppStackParamList,
  HomeStackParamList,
};
