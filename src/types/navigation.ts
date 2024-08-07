import {
  appStackNavigations,
  authNavigations,
  homeStackNavigations,
  keepStackNavigations,
  mainTabNavigations,
} from '../constants';

type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
};

type MainTabParamList = {
  [mainTabNavigations.PLAYGROUND]: undefined;
  [mainTabNavigations.HOME]: undefined;
  [mainTabNavigations.KEEP]: undefined;
};

type AppStackParamList = {
  [appStackNavigations.SPLASH]: undefined;
  [appStackNavigations.MAIN]: undefined;
  [appStackNavigations.LOGIN]: undefined;
};

type HomeStackParamList = {
  [homeStackNavigations.RCD_HOME]: undefined;
  [homeStackNavigations.RCD_DETAIL]: {tag: string};
  [homeStackNavigations.SETTING]: undefined;
  [homeStackNavigations.SONG_DETAIL]: {songNumber: number};
  [homeStackNavigations.COMMENT]: {songNumber: number};
};

type KeepStackParamList = {
  [keepStackNavigations.KEEP]: undefined;
  [keepStackNavigations.KEEP_EDIT]: undefined;
  [keepStackNavigations.KEEP_SONG_DETAIL]: {songNumber: number};
  [keepStackNavigations.KEEP_COMMENT]: {songNumber: number};
};
export type {
  AuthStackParamList,
  MainTabParamList,
  AppStackParamList,
  HomeStackParamList,
  KeepStackParamList,
};
